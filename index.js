const functions = require('@google-cloud/functions-framework');
const Redis = require('ioredis');

// 初始化 Redis 客户端（用你自己的地址）
const redis = new Redis('redis://10.8.0.3:6379'); // 修改为你的 Memorystore 地址

functions.http('helloHttp', async (req, res) => {
  const action = req.query.action;

  if (action === 'set') {
    await redis.set('hello', 'world1');
    res.send('Key "hello" set to "world"');
  } else if (action === 'get') {
    const value = await redis.get('hello');
    res.send(`Value of "hello": ${value}`);
  } else {
    res.status(400).send('Please provide ?action=set or ?action=get');
  }
});
