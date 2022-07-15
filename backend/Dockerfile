FROM node:17-slim

ENV NODE_ENV=production
ENV JWT_SECRET="LossLessPI"
ENV DATABASE_URL="file:./dev.db"

WORKDIR /lossless/
COPY package.json package-lock.json* ./prisma/ ./src/ ./tests/ tsconfig.json ./jest.config.ts/


# RUN npm i -D

COPY . .


USER node

CMD npm run dev && npm run test
