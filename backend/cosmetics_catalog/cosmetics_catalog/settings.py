"""
Django settings for cosmetics_catalog project.
"""

import os
from pathlib import Path

# Caminho base do projeto
BASE_DIR = Path(__file__).resolve().parent.parent

# =========================
# Segurança
# =========================

SECRET_KEY = os.getenv("DJANGO_SECRET_KEY", "dev-only-not-secure")

DEBUG = os.getenv("DEBUG", "1") == "1"
ON_RENDER = os.getenv("RENDER") == "1"

if ON_RENDER:
    DEBUG = False
    SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True

ALLOWED_HOSTS = [
    "localhost", "127.0.0.1",
    ".onrender.com",   # cobre qualquer domínio do Render
    "api.byrose.com",  # opcional se usar subdomínio próprio
]

# =========================
# Aplicativos
# =========================

INSTALLED_APPS = [
    'jazzmin',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    "corsheaders",
    "cosmetics_catalogs_app",
    "cloudinary",
    "cloudinary_storage",
    "rest_framework",
    "django_filters",
]

# Jazzmin
JAZZMIN_SETTINGS = { "show_ui_builder": True }
JAZZMIN_UI_TWEAKS = {
    "navbar_small_text": False,
    "footer_small_text": False,
    "body_small_text": False,
    "brand_small_text": True,
    "brand_colour": "navbar-dark",
    "accent": "accent-info",
    "navbar": "navbar-dark",
    "sidebar": "sidebar-dark-primary",
    "theme": "darkly",
}

# =========================
# Cloudinary
# =========================

CLOUDINARY_STORAGE = {
    "CLOUD_NAME": os.getenv("CLOUDINARY_CLOUD_NAME"),
    "API_KEY": os.getenv("CLOUDINARY_API_KEY"),
    "API_SECRET": os.getenv("CLOUDINARY_API_SECRET"),
}
STORAGES = {
  "default": {"BACKEND": "cloudinary_storage.storage.MediaCloudinaryStorage"},
  "staticfiles": {"BACKEND": "django.contrib.staticfiles.storage.StaticFilesStorage"},
}

# =========================
# DRF
# =========================

REST_FRAMEWORK = {
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.LimitOffsetPagination",
    "PAGE_SIZE": 10,
    "DEFAULT_FILTER_BACKENDS": [
        "rest_framework.filters.SearchFilter",
        "rest_framework.filters.OrderingFilter",
        "django_filters.rest_framework.DjangoFilterBackend",
    ],
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework.authentication.BasicAuthentication",
        "rest_framework.authentication.SessionAuthentication",
    ],
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticatedOrReadOnly",
    ]
}

# =========================
# Middleware
# =========================

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

# =========================
# CSRF e CORS
# =========================

CSRF_TRUSTED_ORIGINS = [
    "https://byrose.com",
    "https://www.byrose.com",
]
_render_host = os.getenv("RENDER_EXTERNAL_HOSTNAME")
if _render_host:
    CSRF_TRUSTED_ORIGINS.append(f"https://{_render_host}")

CORS_ALLOWED_ORIGINS = [
    "https://byrose.com",
    "https://www.byrose.com",
    # depois adicione aqui a URL do front na Vercel
]

# =========================
# URLs, Templates e WSGI
# =========================

ROOT_URLCONF = 'cosmetics_catalog.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'cosmetics_catalog.wsgi.application'

# =========================
# Banco de dados
# =========================

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": str(BASE_DIR / "db.sqlite3"),  # Free plan Render não persiste
    }
}

# =========================
# Validação de senha
# =========================

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# =========================
# Internacionalização
# =========================

LANGUAGE_CODE = 'pt-BR'
TIME_ZONE = 'America/Sao_Paulo'
USE_I18N = True
USE_TZ = True

# =========================
# Arquivos estáticos
# =========================

STATIC_ROOT = str(BASE_DIR / "staticfiles")
STATIC_URL = "/static/"
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

# =========================
# Default Primary Key
# =========================

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
