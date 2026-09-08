from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User


class UserAdmin(BaseUserAdmin):
    ordering = ['email']
    list_display = ('email', 'first_name', 'last_name', 'reg_no', 'id_no', 'is_verified', 'is_staff')
    search_fields = ('email', 'first_name', 'last_name', 'reg_no', 'id_no')

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal Info', {'fields': ('first_name', 'last_name', 'reg_no', 'id_no', 'session', 'phone',
                                       'workplace', 'designation', 'profile_photo', 'is_verified')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'first_name', 'last_name', 'reg_no', 'id_no', 'session', 'password1', 'password2'),
        }),
    )


admin.site.register(User, UserAdmin)