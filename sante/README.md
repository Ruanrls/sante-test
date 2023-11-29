# How to run?

For this test purpose, I've already setted up a database on AWS RDS, and also added the keys on the .env file.

## build and run the app:

```
yarn build;
yarn start;
```

## We are done!

# Interesting things

I've used composite patterns in some components of react. You can check Card components, this keeps easy for us to reuse those components an enhance the manutenabillity.

Also, I've create test for create contact service using a pattern that I really appreciate (makeSut).

The entity concept (server side) keeps easy to reuse some important logic (core of your product).

And the last one, is the error handling pattern, using either wrapping our response into an error or a result, force us to treat our bussiness rules errors, and make it different from the unexpected errors. s
