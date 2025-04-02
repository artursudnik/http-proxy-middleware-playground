import express from 'express';

const app = express();

app.use(express.json());

app.use('/', (req, res, next) => {
  console.log(
    `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} request received`,
  );

  next();
});

app.all('/no-delay', (req, res) => {
  res.send('Welcome');
  console.log(
    `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} 200 OK response sent`,
  );
});

app.all('/delayed/:delay', (req, res) => {
  const delayPathParam = req.params.delay;

  if (delayPathParam === 'infinite') {
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} delaying respons infinitely, no response is going to be sent`,
    );

    return;
  }

  const delay = parseInt(delayPathParam);

  if (isNaN(delay)) {
    res.status(400).send('Invalid delay number');
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} 400 Bad Request response sent`,
    );
    return;
  }

  console.log(
    `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} the response will be sent with a ${delay}ms delay`,
  );

  setTimeout(() => {
    res.send('Welcome');
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} 200 OK response sent with a ${delay}ms delay`,
    );
  }, delay);
});

app.use((req, res) => {
  res.status(404).send(`${req.method} ${req.originalUrl} not found`);

  console.log(
    `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} 404 Not Found response sent`,
  );
});

const PORT = 3001;

app.listen(PORT, '127.0.0.1', () => {
  console.log(`Listening at http://127.0.0.1:${PORT}`);
});
