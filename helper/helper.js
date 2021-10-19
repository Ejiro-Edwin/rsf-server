require("dotenv").config();
const sgMail = require("@sendgrid/mail");

const sendEmail = async (from, subject, html) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const mail = {
    to: `<${process.env.EMAILTO}>`,
    from,
    subject: subject,
    text: html.replace(/<[^>]*>?/gm, ""),
    html,
  };
  var res = await sgMail.send(mail);
  return res;
};

module.exports = sendEmail;
