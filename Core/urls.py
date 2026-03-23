# 3.1
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/', include('djoser.social.urls')),
    
     path('api/category/', include('apps.categories.urls')),
     path('api/product/', include('apps.products.urls')),
     path('api/cart/', include('apps.cart.urls')),
     path('api/orders/', include('apps.orders.urls')),
     path('api/payment/', include('apps.payment.urls')),
     path('api/profile/', include('apps.user_profile.urls')),
     path('api/wishlist/', include('apps.wishlist.urls')),
    #  path('api/reviews/', include('apps.reviews.urls')),

    
    path('admin/', admin.site.urls),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) #we add static to work 

urlpatterns += [re_path(r'^.*',
                        TemplateView.as_view(template_name='index.html'))]
#this is to make django can read all file the react