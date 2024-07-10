from fastapi import APIRouter, Depends, UploadFile, status
from src.services.predict import PredictService

router = APIRouter(
    prefix='/predict',
    tags=['predict'],
)


@router.post("/predict_all", status_code=status.HTTP_200_OK, name="Предсказать метки всех транзакций")
async def input_data(predict_service: PredictService = Depends()):
    return await predict_service.predict_all()


@router.post("/predict_null", status_code=status.HTTP_200_OK, name="Предсказать метки незаполненных транзакций")
async def input_data(predict_service: PredictService = Depends()):
    return await predict_service.predict_null()
