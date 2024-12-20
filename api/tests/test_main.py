import pytest
from httpx import AsyncClient
from datetime import datetime


@pytest.mark.asyncio
async def test_status__ok(client: AsyncClient):
    response = await client.get("/status")
    assert response.status_code == 200

    data = response.json()
    assert "info" in data
    assert all(key in data["info"] for key in ["total", "done", "remaining"])


@pytest.mark.asyncio
async def test_get_todos(client: AsyncClient):
    response = await client.get("/todos")
    assert response.status_code == 200

    todos = response.json()
    assert isinstance(todos, list)
    assert len(todos) > 0

    first_todo = todos[0]
    assert all(key in first_todo for key in ["id", "text", "done", "created"])

    dates = [datetime.fromisoformat(todo["created"]) for todo in todos]
    assert dates == sorted(dates, reverse=True)


@pytest.mark.asyncio
async def test_create_todo(client: AsyncClient):
    # Create new todo
    new_todo_text = "Test new todo"
    response = await client.post("/todos", json={"text": new_todo_text})
    assert response.status_code == 201
    created_todo = response.json()
    assert created_todo["text"] == new_todo_text
    assert created_todo["done"] is False

    # Verify it appears in the list
    response = await client.get("/todos")
    todos = response.json()
    assert any(todo["text"] == new_todo_text for todo in todos)
    # Should be first in the list (newest)
    assert todos[0]["text"] == new_todo_text


@pytest.mark.asyncio
async def test_mark_todo_done(client: AsyncClient):
    # Get first todo
    response = await client.get("/todos")
    todos = response.json()
    todo_id = todos[0]["id"]
    initial_done_state = todos[0]["done"]

    # Mark it as done
    response = await client.put(f"/todos/{todo_id}/done")
    assert response.status_code == 200
    updated_todo = response.json()
    assert updated_todo["done"] != initial_done_state

    # Toggle it back
    response = await client.put(f"/todos/{todo_id}/done")
    assert response.status_code == 200
    toggled_todo = response.json()
    assert toggled_todo["done"] == initial_done_state


@pytest.mark.asyncio
async def test_mark_nonexistent_todo(client: AsyncClient):
    response = await client.put("/todos/todo100/done")
    assert response.status_code == 404
