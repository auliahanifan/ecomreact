FROM nginx:stable
MAINTAINER Aulia R Hanifan 

RUN mkdir -p /alterra/www/react
RUN mkdir -p /alterra/logs/nginx

COPY default.conf /etc/nginx/conf.d/
sudCOPY . /alterra/www/react/

WORKDIR /alterra/www/react
