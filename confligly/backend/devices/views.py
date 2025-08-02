from django.shortcuts import render

# Create your views here.
# backend/devices/views.py

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from rest_framework import generics, status
from rest_framework.response import Response
from .models import Laptop
from .serializers import LaptopSerializer
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
import joblib
import os
from django.conf import settings

from devices.ml_model.predict import predict_price


class PredictPriceView(generics.CreateAPIView):
    def post(self, request, *args, **kwargs):
        try:
            # Load pre-trained model
            model_path = os.path.join(settings.BASE_DIR, 'ml_models', 'laptop_price_predictor.pkl')
            model = joblib.load(model_path)
            
            # Prepare input data
            input_data = {
                'brand': request.data.get('brand'),
                'ram': int(request.data.get('ram')),
                'storage': int(request.data.get('memory')),
                'screen_size': float(request.data.get('screen_size')),
                'cpu': request.data.get('cpu'),
                'gpu': request.data.get('gpu', '')
            }
            
            # Convert to DataFrame (matching training data format)
            df = pd.DataFrame([input_data])
            
            # Predict price
            predicted_price = model.predict(df)[0]
            
            return Response({'predicted_price': round(predicted_price, 2)}, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class LaptopListView(generics.ListAPIView):
    serializer_class = LaptopSerializer
    
    def get_queryset(self):
        queryset = Laptop.objects.all()
        
        # Filter by predicted price range
        predicted_price = self.request.query_params.get('predicted_price')
        if predicted_price:
            price = float(predicted_price)
            lower_bound = price * 0.9  # 10% lower
            upper_bound = price * 1.1  # 10% higher
            queryset = queryset.filter(price__gte=lower_bound, price__lte=upper_bound)
        
        # Filter by brand if specified
        brand = self.request.query_params.get('brand')
        if brand:
            queryset = queryset.filter(brand=brand)
        
        # Filter by OS if specified
        os = self.request.query_params.get('os')
        if os:
            queryset = queryset.filter(os=os)
        
        return queryset.order_by('price')


@csrf_exempt
def predict_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        try:
            ram = int(data.get('ram', 0))
            memory = int(data.get('memory', 0))

            # Call the prediction function
            predicted_price = predict_price(ram, memory)

            return JsonResponse({'predicted_price': predicted_price}, status=200)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    return JsonResponse({'message': 'Only POST allowed'}, status=405)
