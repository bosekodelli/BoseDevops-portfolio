# =========================================================
# Stage 1: Build Stage
# =========================================================
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies first to maximize Docker layer caching
COPY package.json package-lock.json ./
RUN npm ci

# Copy application source files
COPY . .

# Build production bundle with TypeScript check and Vite
RUN npm run build

# =========================================================
# Stage 2: Production Serving Stage (Ultra-lightweight Nginx)
# =========================================================
FROM nginx:1.27-alpine AS runner

# Remove default Nginx configuration
RUN rm -rf /etc/nginx/conf.d/default.conf /usr/share/nginx/html/*

# Copy custom production Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy compiled static assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose standard HTTP port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/healthz || exit 1

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
