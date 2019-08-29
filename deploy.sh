#!/bin/bash
sudo docker rm -f react
sudo docker rmi -f ahanifan/react-frontend:latest
sudo docker run -d -p 3000:80 --name react ahanifan/react-frontend:latest
