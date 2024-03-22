#!/bin/bash

# Install prerequisites
sudo yum -y install curl

# Install Node.js 18.x
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum -y install nodejs

sudo yum -y install unzip



