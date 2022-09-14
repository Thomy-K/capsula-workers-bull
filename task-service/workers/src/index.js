const Queue = require('bull');

const videoQueue = new Queue('audio transcoding', { 
  redis: { 
    port: process.env.REDIS_PORT, 
    host: process.env.REDIS_HOST, 
    password: process.env.REDIS_PASSWORD, 
  },
}); // Specify Redis connection using object


videoQueue.process(function (job, done) {

  // job.data contains the custom data passed when the job was created
  // job.id contains id of this job.

  // transcode video asynchronously and report progress
  job.progress(42);
  console.log("Processing task", job.id, job.data)

  // // call done when finished
  // done();

  // // or give an error if error
  // done(new Error('error transcoding'));

  // or pass it a result
  done(null, { framerate: 29.5 /* etc... */ });

  // If the job throws an unhandled exception it is also handled correctly
  throw new Error('some unexpected error');
});

console.log("Worker Listening to Tasks...")

// Define a local completed event
videoQueue.on('completed', (job, result) => {
  console.log(`Worker completed with result ${JSON.stringify(result)}`);
})

videoQueue.on('error', (error) => {
  console.log(`Worker completed with error: ${error}` );
})

module.exports = videoQueue;