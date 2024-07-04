from fastapi import APIRouter, Depends, UploadFile, status
from fastapi.responses import Response
from typing import List
#from src.services.method import MethodsService

#from src.services.authorization import get_current_user_data


router = APIRouter(
    prefix='/methods',
    tags=['methods'],
    #dependencies=[Depends(get_current_user_data)]
)
