# frontend/Dockerfile
# Base image: Lightweight Nginx for serving static content
FROM nginx:alpine

# 1. Remove the default Nginx index.html (optional but clean)
RUN rm -rf /usr/share/nginx/html/*

# 2. Copy the entire 'frontend' folder content into the Nginx directory
# The 'nginx.conf' file must also be present in the frontend folder for the routes to work.
COPY pages /usr/share/nginx/html/pages
COPY css /usr/share/nginx/html/css
COPY js /usr/share/nginx/html/js

# 3. Configure Nginx to serve the correct landing page (register.html)
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Port Nginx listens on
EXPOSE 80

# Command to keep Nginx running (default for this image)
CMD ["nginx", "-g", "daemon off;"]