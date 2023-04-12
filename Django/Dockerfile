FROM python:3.11-slim

WORKDIR /Django

COPY requirement.txt .

RUN pip install -r requirement.txt

COPY . .

EXPOSE 8000

CMD ["python", "./hmn_project/manage.py", "runserver"]