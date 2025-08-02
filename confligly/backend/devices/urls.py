# backend/devices/urls.py

from django.urls import path
from .views import predict_view,PredictPriceView, LaptopListView

urlpatterns = [
    path('predict/', predict_view),
    path('predict/', PredictPriceView.as_view(), name='predict-price'),
    path('laptops/', LaptopListView.as_view(), name='laptop-list'),
]
