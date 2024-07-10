from fastapi import FastAPI

from src.api.base_router import router


tags_dict = [
    {
        'name': 'methods',
        'description': 'Методы для работы с данными',
    }
]

app = FastAPI(
    title="OmsTU_Practice",
    description="Практика",
    version="0.1.0",
    openapi_tags=tags_dict,
)

app.include_router(router)
