from typing import AsyncGenerator

import pytest
import pytest_asyncio
from fastapi import FastAPI
from httpx import AsyncClient


@pytest.fixture()
def app() -> FastAPI:
    from main import app
    return app


@pytest_asyncio.fixture()
async def client(app: FastAPI) -> AsyncGenerator:
    async with AsyncClient(app=app, base_url="http://test") as client:
        yield client

