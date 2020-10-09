FROM golang:1.15 as BUILD-BACKEND
WORKDIR /src
COPY go.sum go.mod ./
RUN go mod download
COPY . .
RUN rm -fr ./frontend
RUN CGO_ENABLED=0 go build -o /bin/backend .

FROM node:12.18.4-stretch-slim as BUILD-FRONTEND
WORKDIR /src
COPY frontend .
RUN npm install
RUN npm run build && cp -fr build /bin/

#RUN npm install -g serve
#RUN serve -s /bin/build -l 3000

FROM node:12.18.4-stretch-slim
WORKDIR /app
RUN npm install -g serve && mkdir build
COPY --from=BUILD-BACKEND /bin/backend .
COPY --from=BUILD-FRONTEND /bin/build ./build/
COPY entrypoint.sh .
RUN chmod 777 entrypoint.sh
ENTRYPOINT ./entrypoint.sh