FROM node:alpine3.18

# Declare build time environment variables
ARG EMAIL_USER
ARG EMAIL_PASS

# Set default values for environment variables
ENV EMAIL_USER=$EMAIL_USER
ENV EMAIL_PASS=$EMAIL_PASS



# Build App
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 4001
CMD [ "npm", "run", "start" ]