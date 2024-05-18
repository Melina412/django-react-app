from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView, get_user_list
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
# TokenObtainPairView & TokenRefreshView sind vorgefertige views die token abrufen und refreshen können

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/register/', CreateUserView.as_view(), name='register'),
    path('api/token/', TokenObtainPairView.as_view(), name='get_token'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='refresh_token'),
    path('api-auth/', include('rest_framework.urls')),
    path('api/users/', get_user_list, name='user-list'), #!
    path('api/', include('api.urls')),
]

#! nur um user in db schnell zu checken, weil es scheinbar in den django panel views zu verzögerungen kommt
