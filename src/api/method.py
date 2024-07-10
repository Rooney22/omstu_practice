from fastapi import APIRouter, Depends, UploadFile, status
from src.services.method import MethodsService


router = APIRouter(
    prefix='/methods',
    tags=['methods'],
)


@router.post("/inputData", status_code=status.HTTP_200_OK, name="Ввод данных")
async def input_data(file: UploadFile, methods_service: MethodsService = Depends()):
    return await methods_service.insert(file.file)
