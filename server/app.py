from fastapi import FastAPI

from src.api.base_router import router


tags_dict = [
    {
        'name': 'data',
        'description': 'Работа с данными',
    },
    {
        'name': 'fraud',
        'description': 'Работа с фродами'
    }
]

app = FastAPI(
    title="OmSTU_Practice",
    description="Практика",
    version="0.1.0",
    openapi_tags=tags_dict,
)

app.include_router(router)
