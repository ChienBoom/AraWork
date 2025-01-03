# Step 1: Build Angular application
FROM node:16-alpine as build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build --prod
# npm run build -- --configuration production

# Step 2: NGINX server to serve the app
FROM nginx:alpine

COPY --from=build /app/dist/ara-work /usr/share/nginx/html
COPY .nginx/nginx.conf /etc/nginx/conf.d/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
