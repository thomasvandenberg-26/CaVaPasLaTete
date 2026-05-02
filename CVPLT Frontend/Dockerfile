FROM node:22.12.0 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist/ca-va-pas-la-tete/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
