#!/bin/bash
clear
echo "Installing curl"
sudo apt-get install curl -y
echo "Installing nodejs"
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs


