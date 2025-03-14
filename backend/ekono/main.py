import os
from datetime import datetime, UTC

from sanic import Sanic, json, Request, NotFound
from sanic_jwt import Initialize, protected
from sanic_ext import Extend
from sanic.exceptions import SanicException

from sqlalchemy import Column, String, Integer, ForeignKey, DateTime, JSON
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import declarative_base, sessionmaker, relationship
from sqlalchemy.exc import IntegrityError

from bcrypt import hashpw, gensalt, checkpw

import asyncio

app = Sanic("PipelineManager")
app.config.CORS_ORIGINS = "*"
Extend(app)

Base = declarative_base()

# Models (same as before)
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    username = Column(String(50), unique=True)
    email = Column(String(100), unique=True)
    password_hash = Column(String(60))
    created_at = Column(DateTime, default=lambda: datetime.now(UTC))
    pipelines = relationship("Pipeline", back_populates="owner")

def user_verify_password(user: User, password: str):
    return checkpw(password.encode(), user.password_hash.encode())

class Pipeline(Base):
    __tablename__ = "pipelines"
    id = Column(Integer, primary_key=True)
    name = Column(String(100))
    configuration = Column(JSON)
    permissions = Column(JSON)
    limitations = Column(JSON)
    billing_info = Column(JSON)
    created_at = Column(DateTime, default=lambda: datetime.now(UTC))
    owner_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="pipelines")

# Authentication functions
async def authenticate(request, *args, **kwargs):
    data = request.json
    engine = request.app.ctx.engine
    async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
    async with async_session() as session:
        result = await session.execute(User.__table__.select().where(User.username == data["username"]))
        user = result.first()
        if user and user_verify_password(user, data["password"]):
            return dict(user_id=user.id)
    raise SanicException("Invalid credentials", status_code=401)

async def retrieve_user(request, payload, *args, **kwargs):
    if payload:
        user_id = payload.get("user_id")
        engine = request.app.ctx.engine
        async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
        async with async_session() as session:
            user = await session.get(User, user_id)
            return user
    return None

# Single JWT initialization
Initialize(
    app,
    authenticate=authenticate,
    retrieve_user=retrieve_user,
    secret=os.getenv("JWT_SECRET", "super-secret-key"),
    expiration_delta=86400,
    add_scopes=False,
    store_refresh_token=True,
    refresh_token_enabled=True,
    refresh_token_delta=86400 * 7,  # 7 days
    retrieve_refresh_token=lambda *args, **kwargs: None,
    generate_refresh_token=lambda *args, **kwargs: "dummy_refresh_token",
)

# Middleware
@app.middleware("request")
async def inject_db(request):
    engine = request.app.ctx.engine
    async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
    request.ctx.db = async_session()

@app.middleware("response")
async def close_db(request, response):
    await request.ctx.db.close()

# Routes
@app.post("/register")
async def register(request):
    data = request.json
    hashed_pw = hashpw(data["password"].encode(), gensalt()).decode()
    engine = request.app.ctx.engine
    async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
    try:
        async with async_session() as session:
            user = User(username=data["username"], email=data["email"], password_hash=hashed_pw)
            session.add(user)
            await session.commit()
            return json({"message": "User created successfully"}, status=201)
    except IntegrityError:
        raise SanicException("Username or email already exists", status_code=400)

@app.get("/pipelines")
@protected()
async def list_pipelines(request: Request):
    user = request.ctx.user
    engine = request.app.ctx.engine
    async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
    async with async_session() as session:
        result = await session.execute(Pipeline.__table__.select().where(Pipeline.owner_id == user.id))
        pipelines = result.all()
        return json([{"id": p.id, "name": p.name, "created_at": p.created_at.isoformat()} for p in pipelines])

@app.post("/pipelines")
@protected()
async def create_pipeline(request: Request):
    user = request.ctx.user
    data = request.json
    engine = request.app.ctx.engine
    async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
    async with async_session() as session:
        pipeline = Pipeline(
            name=data["name"],
            configuration=data.get("configuration", {}),
            permissions=data.get("permissions", {}),
            limitations=data.get("limitations", {}),
            billing_info=data.get("billing_info", {}),
            owner_id=user.id,
        )
        session.add(pipeline)
        await session.commit()
        return json({"message": "Pipeline created", "id": pipeline.id}, status=201)

@app.get("/pipelines/<pipeline_id:int>")
@protected()
async def get_pipeline(request: Request, pipeline_id: int):
    user = request.ctx.user
    engine = request.app.ctx.engine
    async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
    async with async_session() as session:
        pipeline = await session.get(Pipeline, pipeline_id)
        if not pipeline or pipeline.owner_id != user.id:
            raise NotFound("Pipeline not found")
        return json(
            {
                "id": pipeline.id,
                "name": pipeline.name,
                "configuration": pipeline.configuration,
                "permissions": pipeline.permissions,
                "limitations": pipeline.limitations,
                "billing_info": pipeline.billing_info,
                "created_at": pipeline.created_at.isoformat(),
            }
        )

async def create_tables(engine):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

@app.listener('before_server_start')
async def setup_db(app, loop):
    app.ctx.engine = create_async_engine(app.config.DB_URL, connect_args={"check_same_thread": False})
    await create_tables(app.ctx.engine)
    print("✅ Database tables created")

if __name__ == "__main__":
    app.config.DB_URL = "sqlite+aiosqlite:///pipelines.db" #default production URL
    app.run(host="0.0.0.0", port=8000, auto_reload=True, debug=True)