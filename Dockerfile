FROM node:18-alpine

WORKDIR /app

# Copy dependency files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# API environment variable
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Debug
RUN echo "API URL: $NEXT_PUBLIC_API_URL"

# Build application
RUN npm run build

# Expose port
EXPOSE 3000

# Start command
CMD ["npm", "start"]