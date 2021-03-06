FROM node:12-alpine as builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM node:12-alpine
WORKDIR /app
COPY --from=builder /app/package*.json ./
RUN npm install --only=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.env .

CMD ["npm", "run", "start:prod"]