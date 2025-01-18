FROM node:20

WORKDIR /usr/src/app

COPY . .

# Copy the entrypoint script
COPY nextjs-entrypoint.dev.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Use the custom entrypoint
ENTRYPOINT ["entrypoint.sh"]

CMD ["npm", "run", "dev"]