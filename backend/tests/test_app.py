import sys

# setting path
sys.path.append("./ekono")

import nest_asyncio

nest_asyncio.apply()

import pytest
from sanic import Sanic

# Import your Sanic app; adjust the import path to your module name.
from main import app

# Use an in-memory SQLite DB for testing (overrides the production DB)
app.config.DB_URL = "sqlite+aiosqlite:///:memory:"


def unwrap_response(response):
    """Helper to extract the response from a tuple if necessary."""
    if isinstance(response, tuple):
        return response[1]
    return response


@pytest.fixture(scope="module")
def test_app():
    # Ensure the listeners (such as DB table creation) run
    return app


@pytest.fixture
async def client(test_app):
    return test_app.asgi_client


@pytest.mark.asyncio
async def test_register_and_login(client):
    # Register a new user
    register_data = {
        "username": "testuser",
        "email": "testuser@example.com",
        "password": "testpass"
    }
    response = await client.post("/register", json=register_data)
    response = unwrap_response(response)
    # Expect a 201 created response
    assert response.status == 201, f"Expected 201 but got {response.status}"
    # data = await 
    print(response.json)
    data = response.json
    assert data.get("message") == "User created successfully"

    # Authenticate using the new user (JWT default endpoint is /auth)
    login_data = {"email": "testuser@example.com", "password": "testpass"}
    response = await client.post("/auth", json=login_data)
    response = unwrap_response(response)
    assert response.status == 200, f"Expected 200 but got {response.status}"
    data = await response.json()
    token = data.get("access_token")
    assert token is not None, "Expected a valid JWT access token"


@pytest.mark.asyncio
async def test_pipeline_crud(client):
    # First, register and login a user dedicated for pipeline tests
    register_data = {
        "username": "pipelineuser",
        "email": "pipelineuser@example.com",
        "password": "pipelinepass"
    }
    response = await client.post("/register", json=register_data)
    response = unwrap_response(response)
    # The user might already exist if tests run multiple times so allow 201 or 400
    assert response.status in (201, 400)
    
    login_data = {"username": "pipelineuser", "password": "pipelinepass"}
    response = await client.post("/auth", json=login_data)
    response = unwrap_response(response)
    assert response.status == 200
    data = await response.json()
    token = data.get("access_token")
    assert token is not None, "Expected a valid JWT access token"
    headers = {"Authorization": f"Bearer {token}"}

    # Create a new pipeline
    pipeline_data = {
        "name": "Test Pipeline",
        "configuration": {"key": "value"},
        "permissions": {},
        "limitations": {},
        "billing_info": {}
    }
    response = await client.post("/pipelines", json=pipeline_data, headers=headers)
    response = unwrap_response(response)
    assert response.status == 201, f"Expected 201 but got {response.status}"
    data = await response.json()
    pipeline_id = data.get("id")
    assert pipeline_id is not None, "Pipeline id should be returned upon creation"

    # List all pipelines for the user
    response = await client.get("/pipelines", headers=headers)
    response = unwrap_response(response)
    assert response.status == 200
    pipelines = await response.json()
    # Check that the newly created pipeline is in the list
    assert any(p["id"] == pipeline_id for p in pipelines)

    # Retrieve the details of the newly created pipeline
    response = await client.get(f"/pipelines/{pipeline_id}", headers=headers)
    response = unwrap_response(response)
    assert response.status == 200, f"Expected 200 but got {response.status}"
    pipeline_detail = await response.json()
    assert pipeline_detail.get("name") == "Test Pipeline"
    assert pipeline_detail.get("configuration") == {"key": "value"}
