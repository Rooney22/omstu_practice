from fastapi import APIRouter

from src.api import method
from src.api import predict

router = APIRouter()

router.include_router(method.router)

router.include_router(predict.router)
