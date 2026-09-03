FROM node:20-alpine

WORKDIR /app

# Copiar archivos de la aplicación
COPY package.json ./
COPY server.js ./
COPY . ./

# Variables de entorno
ENV NODE_ENV=production
ENV PORT=80

# Exponer puertos requeridos
EXPOSE 80 8080 3000

# Arrancar el servidor
CMD ["node", "server.js"]
