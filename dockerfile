#System image for the project
FROM node:22.14.0-alpine

#Default user within the container
#User name comes from the node alpine image
ARG USERNAME=node

#In your Linux terminal, run the "id" command without quotes
#Check if your user and user group belong to the same group
#UID and GID, this is so that the container does not create files
#Owned by the root user but by a common user
ARG USER_UID=1000
ARG USER_GID=$USER_UID

#The shadow package will be installed which will allow updating permissions
#to create files and belong to the user group the same as
#the host operating system
RUN apk --no-cache add shadow bash

#Permissions will be set for the user
RUN groupmod --gid $USER_GID $USERNAME \
    && usermod --uid $USER_UID --gid $USER_GID $USERNAME \
    && chown -R $USER_UID:$USER_GID /home/$USERNAME

#Next development library is installed to be able to execute react globally
#for the respective commands
RUN npm install -g create-vite@latest 

#Working on this path
WORKDIR /app

#Default user within the container
USER $USERNAME