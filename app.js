const express = require('express');
const errorHandler = require('http-errors');

const app = express();
const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
  res.send({
    message: 'Welcome to the test App',
  })
});

app.get('/endpoint', (req, res) => {
  res.send({
    message: 'Welcome to the Endpoint of this App',
  });
});

app.get('/endpoint/:name', (req, res) => {
  const { name } = req.params;
  res.send({
    message: `Welcome to the Endpoint of this App ${name}`,
  });
});

app.use((req, res, next) => {
  next(errorHandler.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 400).send({
    status: err.status || 404,
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`App running on ${PORT}`);
})