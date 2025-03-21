import sys

# setting path
sys.path.append("./ekono")

import nest_asyncio

nest_asyncio.apply()

# test_app.py
import pytest
import pytest_asyncio
import sanic
from sanic import Sanic
from sanic_jwt import exceptions
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy import select
from bcrypt import hashpw, gensalt
from sanic_testing.testing import SanicTestClient
from sanic_testing import TestManager
import json, uuid

from main import app as your_app_module, Base, User, Pipeline, authenticate, retrieve_user, create_tables  # Import create_tables

DATABASE_URL = "sqlite+aiosqlite:///:memory:"  # Use in-memory database for testing

@pytest.fixture
def app():
    unique_name = f"test_app_{uuid.uuid4()}" #create unique app name.
    sanic_app = Sanic(unique_name)
    sanic_app.config.DB_URL = DATABASE_URL
    sanic_app.ctx.engine = create_async_engine(DATABASE_URL, connect_args={"check_same_thread": False})

    @sanic_app.listener("before_server_start")
    async def setup_db(app, loop):
        async with sanic_app.ctx.engine.begin() as conn:
            await conn.run_sync(Base.metadata.drop_all)
            await conn.run_sync(Base.metadata.create_all)

    sanic_app.blueprint(your_app_module) # register all blueprints from your main app.
    return sanic_app

@pytest_asyncio.fixture
async def test_client(app):
    async with app.asgi_client() as client:
        yield client

@pytest_asyncio.fixture
async def db_session(app):
    async_session = sessionmaker(app.ctx.engine, class_=AsyncSession, expire_on_commit=False)
    async with async_session() as session:
        yield session

@pytest_asyncio.fixture
async def create_user(db_session):
    async def _create_user(username, email, password):
        hashed_pw = hashpw(password.encode(), gensalt()).decode()
        user = User(username=username, email=email, password_hash=hashed_pw)
        db_session.add(user)
        await db_session.commit()
        return user
    return _create_user

@pytest_asyncio.fixture
async def create_pipeline(db_session, create_user):
    async def _create_pipeline(name, owner_username, configuration=None, permissions=None, limitations=None, billing_info=None):
        owner = await db_session.execute(select(User).where(User.username == owner_username))
        owner = owner.scalar_one()
        pipeline = Pipeline(
            name=name,
            configuration=configuration or {},
            permissions=permissions or {},
            limitations=limitations or {},
            billing_info=billing_info or {},
            owner_id=owner.id,
        )
        db_session.add(pipeline)
        await db_session.commit()
        return pipeline
    return _create_pipeline

@pytest.mark.asyncio
async def test_register(test_client):
    data = {"username": "testuser", "email": "test@example.com", "password": "password123"}
    request, response = await test_client.asgi_client.post("/register", data=json.dumps(data))
    print(response.json)
    assert response.json == {"message": "User created successfully"}
    # assert response.status_code == 201

# @pytest.mark.asyncio
# async def test_register_duplicate(test_client, create_user):
#     await create_user("testuser", "test@example.com", "password123")
#     data = {"username": "testuser", "email": "test2@example.com", "password": "password123"}
#     response = await test_client.post("/register", data)
#     assert response.status_code == 400
#     assert response.json["description"] == "Username or email already exists"

@pytest.mark.asyncio
async def test_authenticate_success(create_user, app):
    user = await create_user("testuser", "test@example.com", "password123")
    request = type("Request", (object,), {"json": {"username": "testuser", "password": "password123"}, "app": app})
    result = await authenticate(request)
    assert result == {"user_id": user.id}

@pytest.mark.asyncio
async def test_authenticate_failure(app):
    request = type("Request", (object,), {"json": {"username": "testuser", "password": "wrongpassword"}, "app": app})
    with pytest.raises(exceptions.SanicJWTException) as excinfo:
        await authenticate(request)
    assert excinfo.value.status_code == 401
    assert excinfo.value.message == "Invalid credentials"

@pytest.mark.asyncio
async def test_retrieve_user_success(create_user, app):
    user = await create_user("testuser", "test@example.com", "password123")
    request = type("Request", (object,), {"app": app})
    payload = {"user_id": user.id}
    result = await retrieve_user(request, payload)
    assert result.id == user.id

@pytest.mark.asyncio
async def test_retrieve_user_failure(app):
    request = type("Request", (object,), {"app": app})
    payload = {"user_id": 999}
    result = await retrieve_user(request, payload)
    assert result is None

# @pytest.mark.asyncio
# async def test_list_pipelines_empty(test_client, create_user):
#     user = await create_user("testuser", "test@example.com", "password123")
#     token_response = await test_client.post("/auth", json={"username": "testuser", "password": "password123"})
#     token = token_response.json["token"]
#     response = await test_client.get("/pipelines", headers={"Authorization": f"Bearer {token}"})
#     assert response.status_code == 200
#     assert response.json == []

# @pytest.mark.asyncio
# async def test_list_pipelines_with_pipelines(test_client, create_user, create_pipeline):
#     user = await create_user("testuser", "test@example.com", "password123")
#     await create_pipeline("pipeline1", "testuser")
#     await create_pipeline("pipeline2", "testuser")
#     token_response = await test_client.post("/auth", json={"username": "testuser", "password": "password123"})
#     token = token_response.json["token"]
#     response = await test_client.get("/pipelines", headers={"Authorization": f"Bearer {token}"})
#     assert response.status_code == 200
#     assert len(response.json) == 2

# @pytest.mark.asyncio
# async def test_create_pipeline(test_client, create_user):
#     user = await create_user("testuser", "test@example.com", "password123")
#     token_response = await test_client.post("/auth", json={"username": "testuser", "password": "password123"})
#     token = token_response.json["token"]
#     data = {"name": "new_pipeline", "configuration": {"key": "value"}}
#     response = await test_client.post("/pipelines", json=data, headers={"Authorization": f"Bearer {token}"})
#     assert response.status_code == 201
#     assert response.json["message"] == "Pipeline created"

# @pytest.mark.asyncio
# async def test_get_pipeline_success(test_client, create_user, create_pipeline):
#     user = await create_user("testuser", "test@example.com", "password123")
#     pipeline = await create_pipeline("pipeline1", "testuser", configuration={"key": "value"})
#     token_response = await test_client.post("/auth", json={"username": "testuser", "password": "password123"})
#     token = token_response.json["token"]
#     response = await test_client.get(f"/pipelines/{pipeline.id}", headers={"Authorization": f"Bearer {token}"})
#     assert response.status_code == 200
#     assert response.json["id"] == pipeline.id
#     assert response.json["name"] == pipeline.name
#     assert response.json["configuration"] == {"key": "value"}
