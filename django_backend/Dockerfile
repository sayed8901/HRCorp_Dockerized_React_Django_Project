# Using the official Python 3.8 Alpine image as the base image (lightweight and optimized for production)
FROM python:3.8-alpine

# Set environment variables to ensure consistent behavior:
# - PYTHONDONTWRITEBYTECODE: Prevents Python from writing .pyc files to disk
# - PYTHONUNBUFFERED: Ensures logs are sent directly to the terminal (stdout/stderr)
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Install system dependencies
# - gcc and musl-dev: Required for compiling some Python packages
# - postgresql-dev: Required for PostgreSQL database support
RUN apk add --no-cache gcc musl-dev postgresql-dev


# Set the working directory inside the container to /django_backend
WORKDIR /django_backend

# Copy the requirements file into the container
COPY requirements.txt requirements.txt

# Install the Python dependencies listed in requirements.txt
RUN pip install -r requirements.txt

# Copy the rest of the application code into the container
COPY . .

# Expose port 8000 to allow external access to the Django application
EXPOSE 8000
