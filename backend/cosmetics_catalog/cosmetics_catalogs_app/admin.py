from django.contrib import admin
from . import models
from django.urls import reverse
from django.utils.html import format_html

class CategoryAdmin(admin.ModelAdmin):
    list_display=["name","date_added","delete_button"]
    search_fields=["name"]

    @admin.display(description="Delete", ordering=False)
    def delete_button(self, obj):
        url = reverse(
            f"admin:{obj._meta.app_label}_{obj._meta.model_name}_delete",
            args=[obj.pk],
        )
        style = (
            "display:inline-block; font-weight:400; color:#fff; text-align:center;"
            "vertical-align:middle; user-select:none; background-color:#dc3545;"
            "border:1px solid #dc3545; padding:.375rem .75rem; font-size:.9375rem;"
            "line-height:1.5; border-radius:.25rem; transition:color .15s ease-in-out,"
            "background-color .15s ease-in-out, border-color .15s ease-in-out,"
            "box-shadow .15s ease-in-out;"
        )
        return format_html('<a href="{}" style="{}">Delete</a>', url, style)

admin.site.register(models.Category, CategoryAdmin)


class BrandAdmin(admin.ModelAdmin):
    list_display=["name","date_added","delete_button"]
    search_fields=["name"]

    @admin.display(description="Delete", ordering=False)
    def delete_button(self, obj):
        url = reverse(
            f"admin:{obj._meta.app_label}_{obj._meta.model_name}_delete",
            args=[obj.pk],
        )
        style = (
            "display:inline-block; font-weight:400; color:#fff; text-align:center;"
            "vertical-align:middle; user-select:none; background-color:#dc3545;"
            "border:1px solid #dc3545; padding:.375rem .75rem; font-size:.9375rem;"
            "line-height:1.5; border-radius:.25rem; transition:color .15s ease-in-out,"
            "background-color .15s ease-in-out, border-color .15s ease-in-out,"
            "box-shadow .15s ease-in-out;"
        )
        return format_html('<a href="{}" style="{}">Delete</a>', url, style)

admin.site.register(models.Brand, BrandAdmin)



class ImageInline(admin.StackedInline):
    model = models.Image

class ProductAdmin(admin.ModelAdmin):
    inlines=[
        ImageInline,
    ]
    list_display=["name","price", "date_added", "delete_button"]
    list_editable=["price"]
    search_fields=["name"]

    @admin.display(description="Delete", ordering=False)
    def delete_button(self, obj):
        url = reverse(
            f"admin:{obj._meta.app_label}_{obj._meta.model_name}_delete",
            args=[obj.pk],
        )
        style = (
            "display:inline-block; font-weight:400; color:#fff; text-align:center;"
            "vertical-align:middle; user-select:none; background-color:#dc3545;"
            "border:1px solid #dc3545; padding:.375rem .75rem; font-size:.9375rem;"
            "line-height:1.5; border-radius:.25rem; transition:color .15s ease-in-out,"
            "background-color .15s ease-in-out, border-color .15s ease-in-out,"
            "box-shadow .15s ease-in-out;"
        )
        return format_html('<a href="{}" style="{}">Delete</a>', url, style)



admin.site.register(models.Product, ProductAdmin)