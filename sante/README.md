# First step

Create an env file that contains the database URL and the database password.

Example:

```
DATABASE_PASSWORD=postgres
DATABASE_URL=postgres://postgres:password@localhost/postgres
```

For this test, I've already setted the database options directly on container (to keep easy to try)

# How to run?

## Set up your database:

The first step is to set up you database (postgres). You can do this in a several different forms, but I really recommend the usage of docker.

### If you have docker:

I've aleary configurated a container for that. You'll just need to run:

`docker compose up -d postgres`

## Run the initial migrations:

To start your database schema:

`npx prisma migrate deploy`

## build and run the app:

```
yarn build;
yarn start;
```

## We are done!
