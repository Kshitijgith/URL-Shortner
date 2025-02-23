const redis = require('redis');

const client = redis.createClient({
  host: 'redis-container',
  port: 6379
});

client.on('error', (err) => {
  console.error('Redis error:', err);
});
client.connect(); // Required for Redis v4+



module.exports = client;
