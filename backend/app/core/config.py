import os
from dotenv import load_dotenv

from pathlib import Path

# Carga el .env que está en /backend/
env_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(dotenv_path=env_path )


DATABASE_URL = os.getenv("DATABASE_URL")
