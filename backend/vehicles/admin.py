from django.contrib import admin
from django.utils.html import format_html
from .models import Vehicle


# 💎 Custom Admin Branding
admin.site.site_header = "🚗 Smart Vehicle Management System"
admin.site.site_title = "Smart Vehicle Admin"
admin.site.index_title = "Welcome to the Vehicle Management Dashboard"


@admin.register(Vehicle)
class VehicleAdmin(admin.ModelAdmin):
    list_display = (
        'brand_name',
        'vehicle_name',
        'registration_number',
        'colored_vehicle_type',
        'colored_variant',
        'colored_transmission',
        'created_at',
    )
    list_filter = (
        'vehicle_type',
        'variant',
        'transmission',
        'created_at',
    )
    search_fields = (
        'brand_name',
        'vehicle_name',
        'registration_number',
        'chassis_number',
        'engine_number',
    )
    ordering = ('-created_at',)
    readonly_fields = ('created_at', 'updated_at')

    fieldsets = (
        ('🚘 Basic Information', {
            'fields': (
                'brand_name',
                'vehicle_name',
                'model_number',
                'registration_number',
            )
        }),
        ('⚙️ Specifications', {
            'fields': (
                'vehicle_type',
                'vehicle_subtype',
                'variant',
                'transmission',
            )
        }),
        ('🔢 Identification Numbers', {
            'fields': (
                'chassis_number',
                'engine_number',
            )
        }),
        ('📝 Additional Info', {
            'fields': (
                'description',
                'created_at',
                'updated_at',
            )
        }),
    )

    # 🌈 Custom colored display methods
    def colored_vehicle_type(self, obj):
        colors = {
            'car': '#007bff',  # Blue
            'bike': '#28a745',  # Green
            'truck': '#ffc107',  # Yellow
            'bus': '#17a2b8',  # Cyan
            'van': '#6f42c1',  # Purple
            'other': '#6c757d',  # Gray
        }
        color = colors.get(obj.vehicle_type, '#6c757d')
        return format_html(
            '<span style="background-color:{}; color:white; padding:3px 8px; border-radius:6px;">{}</span>',
            color, obj.get_vehicle_type_display()
        )
    colored_vehicle_type.short_description = "Vehicle Type"

    def colored_variant(self, obj):
        colors = {
            'base': '#6c757d',
            'standard': '#007bff',
            'deluxe': '#28a745',
            'sport': '#dc3545',
            'luxury': '#6610f2',
            'limited': '#fd7e14',
            'premium': '#20c997',
            'custom': '#17a2b8',
        }
        color = colors.get(obj.variant, '#6c757d')
        return format_html(
            '<span style="background-color:{}; color:white; padding:3px 8px; border-radius:6px;">{}</span>',
            color, obj.get_variant_display()
        )
    colored_variant.short_description = "Variant"

    def colored_transmission(self, obj):
        colors = {
            'manual': '#007bff',
            'automatic': '#28a745',
            'semi_automatic': '#ffc107',
        }
        color = colors.get(obj.transmission, '#6c757d')
        return format_html(
            '<span style="background-color:{}; color:white; padding:3px 8px; border-radius:6px;">{}</span>',
            color, obj.get_transmission_display()
        )
    colored_transmission.short_description = "Transmission"
