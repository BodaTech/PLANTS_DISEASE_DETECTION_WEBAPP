from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import APIView
import tensorflow as tf 
import os
import numpy as np
import glob 
import matplotlib.pyplot as plt 
import tensorflow_hub as hub
from tensorflow_hub import KerasLayer
from rest_framework.parsers import MultiPartParser, FormParser
from tensorflow.keras.preprocessing import image
from django.conf import settings
from io import BytesIO
from user.serializers import DiagnosticSerializer, DiagnosticDetailSerializer
from plant.serializers import DiseaseSerializer
from django.shortcuts import get_object_or_404
from plant.models import Plant, Disease
from user.models import Diagnostic
from copy import deepcopy



class DiagnosticView(APIView):

    parser_classes = (MultiPartParser, FormParser)

    def get(self, request: Request):
        diagnostics = Diagnostic.objects.all()
        serializer = DiagnosticDetailSerializer(diagnostics, many=True)
        return Response(
            serializer.data
        , status=status.HTTP_200_OK)

    def post(self, request: Request):
        # loading model
        model = tf.keras.models.load_model('user\\ai\model')

        uploaded_image = request.FILES.get("image")

        image_data = BytesIO(uploaded_image.read())

        if not image_data:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        img = image.load_img(image_data, target_size=(224, 224))
        imageArray = image.img_to_array(img)
        imageArray = np.expand_dims(imageArray, axis=0)


        # Make a prediction
        prediction = model.predict(imageArray)

        # Print the predicted class
        categories = settings.CATEGORIES
        predicted_class = np.argmax(prediction)
        result: str = categories[predicted_class]

        # save the prediction
        is_infected = not "healthy" in result.lower()

        if is_infected:
            plant_name = result.split('___')[0]
            plant_obj = Plant.objects.filter(name__icontains=plant_name).first()
            print(plant_obj)
            disease = Disease.objects.filter(name=result).first()
            print(disease)
        else:
            result = 'healthy'

        if not plant_obj or not disease:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        diagnostic_data = deepcopy(request.data)
        diagnostic_data['plant'] = plant_obj.id
        diagnostic_data['plant_image'] = uploaded_image.name
        diagnostic_data['disease'] = disease.id
        diagnostic_data['is_infected'] = is_infected


        serializer = DiagnosticSerializer(data=diagnostic_data)

        if not serializer.is_valid():
            return Response(
                serializer.errors
                , status=status.HTTP_400_BAD_REQUEST
            )
        
        serializer.save()

        data = {
            'is_infected': is_infected,
            'plant': plant_name,
            'disease': DiseaseSerializer(disease).data,
        }

        return Response(data, status=status.HTTP_201_OK)

        