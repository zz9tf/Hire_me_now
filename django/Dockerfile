FROM python:3.11-slim

ENV PYTHONUNBUFFERED=1

WORKDIR /django

COPY requirements.txt .
RUN pip3 install -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["python3", "./hmn_project/manage.py", "runserver", "0.0.0.0:8000"]