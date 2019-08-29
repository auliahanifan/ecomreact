#!/bin/bash
sudo docker rm -f react
sudo docker rmi -f ahanifan/react-ceria:latest
sudo docker run -d -p 3000:80 --name react ahanifan/react-ceria:latest
