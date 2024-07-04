from fastapi import APIRouter, Depends, UploadFile, status
from src.services.method import MethodsService

#from src.services.authorization import get_current_user_data


router = APIRouter(
    prefix='/methods',
    tags=['methods'],
    #dependencies=[Depends(get_current_user_data)]
)


@router.post("/inputData", status_code=status.HTTP_200_OK, name="Ввод данных")
def input_data(file: UploadFile, methods_service: MethodsService = Depends()):
    return methods_service.insert(file.file)
