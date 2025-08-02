# from django.contrib import admin
# from import_export import resources
# from import_export.admin import ImportExportModelAdmin
# from .models import Laptop

# class LaptopResource(resources.ModelResource):
#     class Meta:
#         model = Laptop
#         skip_unchanged = True
#         report_skipped = False
#         import_id_fields = ('laptop_id',)

# @admin.register(Laptop)
# class LaptopAdmin(ImportExportModelAdmin):
#     resource_class = LaptopResource
#     list_display = ('company', 'product', 'cpu', 'ram', 'price_euros')
#     list_filter = ('company', 'opsys', 'ram_gb')
#     search_fields = ('product', 'cpu', 'gpu')

from django.contrib import admin
from import_export import resources
from import_export.admin import ImportExportModelAdmin
from .models import Laptop

class LaptopResource(resources.ModelResource):
    class Meta:
        model = Laptop
        import_id_fields = ('laptop_id',)
        fields = ('laptop_id', 'company', 'product', 'type_name', 'inches', 
                 'screen_resolution', 'cpu', 'ram', 'memory', 'gpu', 'opsys',
                 'weight', 'price_euros', 'ram_gb', 'storage_gb')
        skip_unchanged = True
        report_skipped = True

@admin.register(Laptop)
class LaptopAdmin(ImportExportModelAdmin):
    resource_class = LaptopResource
    list_display = ('laptop_id', 'company', 'product', 'ram_gb', 'storage_gb', 'price_euros')
    list_filter = ('company', 'opsys', 'ram_gb', 'storage_gb')
    search_fields = ('product', 'cpu', 'gpu')
    list_editable = ('price_euros',)
    list_per_page = 50
    
    fieldsets = (
        ('Basic Info', {
            'fields': ('laptop_id', 'company', 'product', 'type_name')
        }),
        ('Specifications', {
            'fields': ('inches', 'screen_resolution', 'cpu', 'ram', 'memory', 'gpu')
        }),
        ('Details', {
            'fields': ('opsys', 'weight', 'price_euros', 'ram_gb', 'storage_gb')
        }),
    )