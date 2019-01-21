FROM node:10

# Create app dir
WORKDIR /usr/src/app

# install app dependencies
COPY package*.json ./

# installs all packages inside container
RUN npm ci

# Bundle app source
COPY . .
EXPOSE 5000

# Runs after docker container is built
CMD ["npm", "run", "dev"];