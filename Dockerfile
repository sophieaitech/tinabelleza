FROM node:20-alpine

WORKDIR /app

# Copiar configuración y servidor
COPY package.json ./
COPY server.js ./
COPY lyos ./lyos

# Variables de entorno
ENV NODE_ENV=production
ENV PORT=8080

# Exponer puertos
EXPOSE 80 8080 3000

# Comando de arranque del servidor optimizado
CMD ["node", "server.js"]
