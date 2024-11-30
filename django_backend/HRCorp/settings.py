"""
Django settings for HRCorp project.

Generated by 'django-admin startproject' using Django 4.2.4.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""

from pathlib import Path

# importing dj_database_url for deployment purposes
# if live postgreSQL is used (see option 3 for database)
import dj_database_url


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# step 2: defining "accounts.CustomUser" as the AUTH_USER_MODEL
AUTH_USER_MODEL = "accounts.CustomUser" 



import environ
env = environ.Env()
environ.Env.read_env()


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env("SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

# allowing all hosts
ALLOWED_HOSTS = ["*"]


# manage allowing origins for accessing from our API
CORS_ALLOW_ALL_ORIGINS = True


# Application definition

INSTALLED_APPS = [
    # whitenoise app (for vercel development only)
    "whitenoise.runserver_nostatic",

    # pre defined
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # apps
    'accounts',
    'power_user',
    'standard_user',

    'employee',
    'employment',
    'salary',

    'transfer',
    'confirmation',
    'promotion',
    'separation',

    'job_profile',

    'leave',
    'payroll',

    # 3rd party libraries
    'rest_framework',
    'rest_framework.authtoken',
    "dj_rest_auth",

    'django.contrib.sites',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',

    "corsheaders",
]


REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework.authentication.SessionAuthentication",
        "rest_framework.authentication.TokenAuthentication",
    ],
    
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.AllowAny",
    ],
}


MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    'django.middleware.common.CommonMiddleware',
    'allauth.account.middleware.AccountMiddleware',

    # for session middleware
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',

    # for CSRF middleware
    'django.middleware.security.SecurityMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',

    # whitenoise middleware (for vercel deployment only)
    "whitenoise.middleware.WhiteNoiseMiddleware",
]



# To trust and allow CSRF token on deployment, adding our frontend domain to CSRF_TRUSTED_ORIGINS list
CSRF_TRUSTED_ORIGINS = [
    'https://hrcorp.netlify.app',   # deployed frontend
    'http://localhost:5173',        # frontend's localhost
]



ROOT_URLCONF = 'HRCorp.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]


SITE_ID = 1



# default WSGI_APPLICATION settings (also can be used for onRender deployment)
# WSGI_APPLICATION = 'HRCorp.wsgi.application'

# WSGI_APPLICATION settings modified for vercel deployment issue
WSGI_APPLICATION = 'HRCorp.wsgi.app'





# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases


# # initial: 1st option for database
# # default sqlite3 database
# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': BASE_DIR / 'db.sqlite3',
#     }
# }


# # 2nd option for database
# # Local PostgreSQL Database credentials accessed from .env file
# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql_psycopg2',
#         'NAME': env("DB_NAME"),
#         'USER': env("DB_USER"),
#         'PASSWORD': env("DB_PASSWORD"),
#         'HOST': env("DB_HOST"),
#         'PORT': env("DB_PORT"),
#     }
# }


# # 3rd option for database
# # Database configuration for PostgreSQL with on-render development server
# DATABASES = {
#     'default': dj_database_url.config(
#         # Replace this value with your local database's connection string.
#         default='postgresql://hrcorp_database_user:YU4HDkKRZxgYmJdcD0BuhLloJ5dQVsKJ@dpg-cr74ap2j1k6c73f2tm8g-a.oregon-postgres.render.com/hrcorp_database',
#         conn_max_age=600
#     )
# }



# Final for vercel deploy: 4th option for database
# PostgreSQL Database for super_base deployment
# credentials accessed from .env file
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': env("DB_NAME"),
        'USER': env("DB_USER"),
        'PASSWORD': env("DB_PASSWORD"),
        'HOST': env("DB_HOST"),
        'PORT': env("DB_PORT"),
    }
}




# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = 'static/'

# setting STATIC_ROOT for vercel deployment issue
STATIC_ROOT = BASE_DIR / 'staticfiles'


# defining media path
STATIC_URL = 'media/'



# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# mail sending facility
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_USE_TLS = True
EMAIL_PORT = 587
EMAIL_HOST_USER = env("EMAIL")
EMAIL_HOST_PASSWORD = env("EMAIL_PASSWORD")


