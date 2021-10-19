const sendMail = require("../helper/helper");

class SendEmail {
  static async sender(req, res) {
    try {
      const sent = await sendMail(
        req.body.from,
        req.body.subject,
        req.body.message
      );
      if (sent) {
        res.send({
          status: 200,
          msg: "Email Sent and would be delivered shortly",
        });
      } else {
        console.log("failed");
      }
    } catch (err) {
      console.log("Errors :", err);
    }
  }
}
module.exports = SendEmail;
