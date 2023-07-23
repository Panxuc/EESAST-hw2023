# syntax=docker/dockerfile:1.0
FROM ubuntu
RUN apt-get update && apt-get install -y g++
WORKDIR /app
COPY . /app
ARG FILENAME
ARG NUM1
ARG NUM2
RUN g++ -o $FILENAME $FILENAME.cpp
CMD ./$FILENAME $NUM1 $NUM2
