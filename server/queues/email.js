const Queue = require("bull");
const {sendMail} = require("../config/mailer");

const emailQueue = new Queue("email", process.env.REDIS_URL);

emailQueue.process(async (job, done) => {
  const {receiver, subject, text} = job.data;
  sendMail(receiver, subject, text);
  done();
});

const sendEmailJob = (receiver, subject, text) => {
  emailQueue.add({
    receiver: receiver,
    subject: subject,
    text: text,
  });
};

module.exports = {sendEmailJob};
