#!/bin/bash
sudo docker stop react-frontend
sudo docker rm react-frontend
sudo docker rmi ahanifan/react-frontend:latest
sudo docker run -d -p 3000:80 --name reactceria ahanifan/react-fronted:latest
