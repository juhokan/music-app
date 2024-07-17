# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=18.19.0
FROM node:${NODE_VERSION}-slim AS base

LABEL fly_launch_runtime="Vite"

# Vite app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"
ENV VITE_CALLBACK_URL=https://music-client.fly.dev
ENV VITE_SERVER_URL=https://music-app-server.fly.dev

ARG CLIENT_ID
ARG CLIENT_SECRET

ENV VITE_CLIENT_ID=$CLIENT_ID
ENV VITE_CLIENT_SECRET=$CLIENT_SECRET

# Throw-away build stage to reduce size of final image
FROM base AS build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

# Install node modules
COPY --link package-lock.json package.json ./
RUN npm ci --include=dev

# Copy application code
COPY --link . .

# Build application
RUN npm run build

# Remove development dependencies
RUN npm prune --omit=dev

FROM ubuntu
RUN apt-get update
RUN apt-get install nginx -y
COPY --from=build /app/dist /var/www/app/html
COPY nginx/ /etc/nginx/

# Start the server by default, this can be overwritten at runtime
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]