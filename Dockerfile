# Set the base image n/b: for production, node is only used for building the static Html and javascript files
# as react creates static html and js files after build these are what will be served by nginx.
# Use alias builder to be easier to refer this container elsewhere e.g inside nginx container.
FROM node:alpine as builder

# Set working directory. This is the working folder in the container from which the app will be running from.
WORKDIR /app

# Copy the package.json to install dependencies.
COPY package.json ./
COPY yarn.lock ./
COPY .yarnrc ./

# Install the dependencies and make the folder.
RUN yarn install

# Copy everything to /app directory.
COPY . .

# Build the project for production.
RUN yarn build
RUN yarn compress

###### Nginx ########

# Set up production environment. The base image for this is an alpine based nginx image.
FROM nginx:1.20-alpine

# Replace with custom one.
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

# Remove default nginx index page.
RUN rm -rf /usr/share/nginx/html/*

# Copy the build folder from react to the root of nginx.
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 8080 to the outer world.
EXPOSE 8080

# Start nginx.
CMD ["nginx", "-g", "daemon off;"]
