FROM node:14.12.0-alpine as build
WORKDIR /app
COPY . .
RUN set -x; \
  # yarn config set registry https://registry.npm.taobao.org; \
  yarn; \
  yarn build; \
  yarn cache clean

FROM nginx:1.16-alpine
WORKDIR /app
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /app
