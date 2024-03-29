FROM node:alpine3.18

# Declare build time environment variables
ARG EMAIL_USER
ARG EMAIL_PASS
ARG PORT
ARG MONGO_URL
ARG SECRET_KEY
ARG RAZOR_KEY_ID
ARG RAZORPAY_SECRET
ARG CLOUDINARY_CLOUD_NAME
ARG CLOUDINARY_API_KEY
ARG CLOUDINARY_API_SECRET
ARG ASSESS_PAGE_URL

# Set default values for environment variables
ENV EMAIL_USER=$EMAIL_USER
ENV EMAIL_PASS=$EMAIL_PASS
ENV PORT=$PORT
ENV MONGO_URL=$MONGO_URL
ENV SECRET_KEY=$SECRET_KEY
ENV RAZOR_KEY_ID=$RAZOR_KEY_ID
ENV RAZORPAY_SECRET=$RAZORPAY_SECRET
ENV CLOUDINARY_CLOUD_NAME=$CLOUDINARY_CLOUD_NAME
ENV CLOUDINARY_API_KEY=$CLOUDINARY_API_KEY
ENV CLOUDINARY_API_SECRET=$CLOUDINARY_API_SECRET
ENV ASSESS_PAGE_URL=$ASSESS_PAGE_URL


# Build App
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 4001
CMD [ "npm", "run", "start" ]