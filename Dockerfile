# Base stage for building the app
FROM node:18-alpine AS build

# Set timezone
ENV TZ=Asia/Bangkok
RUN apk add --no-cache tzdata && \
    ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Set environment variable from build argument
ARG ENV_APP
ENV env=$ENV_APP

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all application files to the working directory, including .proto files
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine AS production

# Set timezone again for the production image
ENV TZ=Asia/Bangkok
RUN apk add --no-cache tzdata && \
    ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Set environment variable for production
ARG ENV_APP
ENV env=$ENV_APP


# Add Heap Memory Limit
ENV NODE_OPTIONS="--max-old-space-size=4096"


# Create app directory
WORKDIR /usr/src/app

# Copy only the necessary files from the build stage
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package*.json ./

# Copy .proto files for gRPC
COPY --from=build /usr/src/app/proto ./proto

# Start the server using the production build
CMD ["sh", "-c", "npm run start:prod"]
