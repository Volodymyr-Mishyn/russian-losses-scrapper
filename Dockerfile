# reference https://developers.google.com/web/tools/puppeteer/troubleshooting#setting_up_chrome_linux_sandbox
FROM node:current-alpine

# manually installing chrome
RUN apk add chromium

# skips puppeteer installing chrome and points to correct binary
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV PUPPETEER_EXECUTABLE_PATH /usr/bin/chromium

# Set the working directory in the container for the core app
WORKDIR /usr/src/scraper-app

# Copy the core app's package.json and package-lock.json (if available)
COPY package*.json ./


# Install dependencies for the core app
RUN npm install

# Copy the core app source
COPY . .

# Define the command to run your app
CMD npm run start:mod
