
const Queue = require('bull');

const videoQueue = new Queue('audio transcoding', { 
  redis: { 
    port: process.env.REDIS_PORT, 
    host: process.env.REDIS_HOST, 
    password: process.env.REDIS_PASSWORD, 
  } 
}); // Specify Redis connection using object

// Define a local completed event
videoQueue.on('global:completed', (job, result) => {
  console.log(`Job completed with result ${result}`);
})

videoQueue.on('global:error', (job, result) => {
  console.log(`Job completed with error`);
})