const express = require('express');
const Redis = require('ioredis');

const app = express();
const redis = new Redis('redis://10.8.0.3:6379');

app.get('/', async (req, res) => {
  const action = req.query.action;

  if (action === 'set') {
    await redis.set('hello', 'world');
    res.send('Set key "hello" to "world"');
  } else if (action === 'get') {
    const value = await redis.get('hello');
    res.send(`Value of "hello": ${value}`);
  } else {
    res.status(400).send('Use ?action=set or ?action=get');
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
