# Build stage
FROM node:20-alpine as build

# Install pnpm
RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Install tzdata for time zone configuration
RUN apk add --no-cache libc6-compat tzdata

# Set the time zone to America/Bogota
ENV TZ=America/Bogota

RUN corepack enable

# Update
RUN apk update
USER node

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY --chown=node:node pnpm-lock.yaml ./

# Copy source files
COPY --chown=node:node . .

# Install dependencies and build the project
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

# Production stage
FROM node:20-alpine as production

# Install tini
RUN apk add --no-cache tzdata tini

# Set the time zone to America/Bogota
ENV TZ=America/Bogota

# Use tini as the init system
ENTRYPOINT ["/sbin/tini", "--"]

# Copy built application and dependencies
COPY  --chown=node:node --from=build /app/node_modules  ./node_modules
COPY  --chown=node:node --from=build /app/dist  ./dist

# Command to run your application
CMD [ "node", "dist/main" ]
