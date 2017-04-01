FROM python:2.7
ADD . /hidro-chico
WORKDIR /hidro-chico
RUN pip install -r requirements.txt
