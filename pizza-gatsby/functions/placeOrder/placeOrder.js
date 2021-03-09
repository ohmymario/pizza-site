const nodemailer = require('nodemailer');

// create a transport for nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// console.log('===============================');
// console.log(`Host ${process.env.MAIL_HOST}`);
// console.log(`USER ${process.env.MAIL_USER}`);
// console.log(`USER ${process.env.MAIL_PASS}`);
// console.log('===============================');

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);
  console.log(body);

  // validate the data - check if its correct
  const requiredFields = ['email', 'name', 'order'];
  for (const field of requiredFields) {
    console.log(`Checking that ${field} is good`);
    if (!body[field]) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: `Oops you are missing the ${field} field`,
        }),
      };
    }
  }

  // send the email
  // send the success or error back to the

  // TESTING THE EMAILER
  const info = await transporter.sendMail({
    from: "Slick's Slices <slick@emample.com>",
    to: 'orders@example.com',
    subject: 'New order!',
    html: `<p>Your new pizza order is here</p>`,
  });
  console.log(info);
  return { statusCode: 200, body: JSON.stringify(info) };
};
