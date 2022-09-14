const Queue = require('bull');

const videoQueue = new Queue('audio transcoding', { 
  redis: { 
    port: process.env.REDIS_PORT, 
    host: process.env.REDIS_HOST, 
    password: process.env.REDIS_PASSWORD, 
  },
}); // Specify Redis connection using object

const seconds = 2 * 1000;
let i = 0;

setInterval( () => {
  videoQueue.add({ video: `http://example.com/video${i}.mov` });
  console.log(`Adding Task ${i}`);
  i++;
}, seconds);

