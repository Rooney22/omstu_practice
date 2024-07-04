from fastapi import FastAPI

from src.api.base_router import router

app = FastAPI(
    title="Знаев Алексей. Backend",
    description="Финальный проект",
    version="0.1.0",
    openapi_tags=tags_dict,
)

app.include_router(router)