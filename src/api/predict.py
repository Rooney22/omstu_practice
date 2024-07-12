from fastapi import APIRouter, Depends, status
from src.services.predict import PredictService

router = APIRouter(
    prefix='/predict',
    tags=['predict'],
)


@router.post("/predict", status_code=status.HTTP_200_OK, name="Предсказать метки транзакций")
async def input_data(null_flag: bool = True, predict_service: PredictService = Depends()):
    return await predict_service.predict(null_flag)
