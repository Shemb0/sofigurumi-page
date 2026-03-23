# 2
from django.contrib import admin
from .models import Category

# aca se registran los modelos
#aca organizamos el modelo y decimos como se va a mostrar en el admin

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id','name','parent')
    list_display_links = ('id','name','parent')
    search_fields = ('name', 'parent')
    list_per_page = 25
    
admin.site.register(Category, CategoryAdmin)