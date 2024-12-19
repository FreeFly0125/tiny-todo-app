import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_status__ok(client: AsyncClient):
    response = await client.get("/status")
    assert response.status_code == 200