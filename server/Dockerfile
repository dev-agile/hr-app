FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies using Yarn
COPY package*.json yarn.lock ./
RUN yarn install

# Bundle app source
COPY . .

# Build the TypeScript code
RUN yarn build

# Expose the app port
EXPOSE 3000

# Run the app
CMD ["yarn", "start"]
