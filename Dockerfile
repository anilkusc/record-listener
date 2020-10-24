FROM golang:1.15 as BUILD-BACKEND
WORKDIR /src
COPY go.sum go.mod ./
RUN go mod download
COPY . .
RUN rm -fr ./frontend
RUN CGO_ENABLED=0 go build -o /bin/app .

FROM node:12.18.4-stretch-slim as BUILD-FRONTEND
WORKDIR /src
COPY frontend .
RUN npm install
RUN npm run build && cp -fr build /bin/

FROM nginx
WORKDIR /app
COPY --from=BUILD-BACKEND /bin/app .
COPY --from=BUILD-FRONTEND /bin/build /usr/share/nginx/html
COPY entrypoint.sh .
COPY default.conf /etc/nginx/conf.d/default.conf
RUN chmod 777 entrypoint.sh
ENTRYPOINT ./entrypoint.sh