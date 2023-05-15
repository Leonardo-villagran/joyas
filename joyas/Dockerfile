# Base image
FROM node:latest

# Crear y establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos necesarios y el package.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos del frontend
COPY . .

# Establecer las variables de entorno necesarias
ENV REACT_APP_API_URL=http://localhost:3001

# Construir la aplicación
RUN npm run build

# Exponer el puerto del frontend
EXPOSE 3000

# Iniciar la aplicación
CMD [ "npm", "start" ]