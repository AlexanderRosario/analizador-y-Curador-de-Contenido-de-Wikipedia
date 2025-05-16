import asyncio
from backend.app.core.db_connection import engine, Base
from backend.app.models import article  # Asegura la importación del modelo

async def init_models():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

if __name__ == "__main__":
    asyncio.run(init_models())
