const redis = require("redis");

const client = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST,  // Use RedisLabs public endpoint
    port: Number(process.env.REDIS_PORT),  // Ensure port is a number
    tls: {} ,  // Required for RedisLabs since it's a secure connection
  },
  password: process.env.REDIS_PASSWORD,
});

// Error handling
client.on("error", (err) => console.error("❌ Redis Client Error:", err));

// Connect to Redis
client.connect()
  .then(() => console.log("✅ Connected to Redis"))
  .catch((err) => console.error("❌ Redis connection error:", err));

module.exports = client;

