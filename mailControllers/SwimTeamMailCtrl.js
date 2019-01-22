require('dotenv').config();
const nodemailer = require('nodemailer');

module.exports = {
  sendEmail(req, res) {
    const swimTeams = [
      { id: 1, day: 'Friday', month: 'April', date: '13th', time: '3:00 PM', taken: false },
      { id: 2, day: 'Friday', month: 'April', date: '13th', time: '3:30 PM', taken: false },
      { id: 3, day: 'Friday', month: 'April', date: '13th', time: '4:00 PM', taken: false },
      { id: 4, day: 'Friday', month: 'April', date: '13th', time: '4:30 PM', taken: false },
      { id: 5, day: 'Friday', month: 'April', date: '13th', time: '5:00 PM', taken: false },
      { id: 6, day: 'Friday', month: 'April', date: '13th', time: '5:30 PM', taken: false },
      { id: 7, day: 'Saturday', month: 'April', date: '14th', time: '9:00 AM', taken: false },
      { id: 8, day: 'Saturday', month: 'April', date: '14th', time: '9:30 AM', taken: false },
      { id: 9, day: 'Saturday', month: 'April', date: '14th', time: '10:00 AM', taken: false },
      { id: 10, day: 'Saturday', month: 'April', date: '14th', time: '10:30 AM', taken: false },
      { id: 11, day: 'Saturday', month: 'April', date: '14th', time: '11:00 AM', taken: false },
      { id: 12, day: 'Saturday', month: 'April', date: '14th', time: '11:30 AM', taken: false },
      { id: 13, day: 'Saturday', month: 'April', date: '14th', time: '12:00 PM', taken: false },
      { id: 14, day: 'Saturday', month: 'April', date: '14th', time: '12:30 PM', taken: false },
      { id: 15, day: 'Saturday', month: 'April', date: '14th', time: '1:00 PM', taken: false },
      { id: 16, day: 'Saturday', month: 'April', date: '14th', time: '1:30 PM', taken: false },
      { id: 17, day: 'Friday', month: 'April', date: '20th', time: '3:00 PM', taken: false },
      { id: 18, day: 'Friday', month: 'April', date: '20th', time: '3:30 PM', taken: false },
      { id: 19, day: 'Friday', month: 'April', date: '20th', time: '4:00 PM', taken: false },
      { id: 20, day: 'Friday', month: 'April', date: '20th', time: '4:30 PM', taken: false },
      { id: 21, day: 'Friday', month: 'April', date: '20th', time: '5:00 PM', taken: false },
      { id: 22, day: 'Friday', month: 'April', date: '20th', time: '5:30 PM', taken: false },
      { id: 23, day: 'Saturday', month: 'April', date: '21st', time: '9:00 AM', taken: false },
      { id: 24, day: 'Saturday', month: 'April', date: '21st', time: '9:30 AM', taken: false },
      { id: 25, day: 'Saturday', month: 'April', date: '21st', time: '10:00 AM', taken: false },
      { id: 26, day: 'Saturday', month: 'April', date: '21st', time: '10:30 AM', taken: false },
      { id: 27, day: 'Saturday', month: 'April', date: '21st', time: '11:00 AM', taken: false },
      { id: 28, day: 'Saturday', month: 'April', date: '21st', time: '11:30 AM', taken: false },
      { id: 29, day: 'Saturday', month: 'April', date: '21st', time: '12:00 PM', taken: false },
      { id: 30, day: 'Saturday', month: 'April', date: '21st', time: '12:30 PM', taken: false },
      { id: 31, day: 'Saturday', month: 'April', date: '21st', time: '1:00 PM', taken: false },
      { id: 32, day: 'Saturday', month: 'April', date: '21st', time: '1:30 PM', taken: false },
      { id: 33, day: 'Friday', month: 'April', date: '27th', time: '3:00 PM', taken: false },
      { id: 34, day: 'Friday', month: 'April', date: '27th', time: '3:30 PM', taken: false },
      { id: 35, day: 'Friday', month: 'April', date: '27th', time: '4:00 PM', taken: false },
      { id: 36, day: 'Friday', month: 'April', date: '27th', time: '4:30 PM', taken: false },
      { id: 37, day: 'Friday', month: 'April', date: '27th', time: '5:00 PM', taken: false },
      { id: 38, day: 'Friday', month: 'April', date: '27th', time: '5:30 PM', taken: false },
      { id: 39, day: 'Saturday', month: 'April', date: '28th', time: '9:00 AM', taken: false },
      { id: 40, day: 'Saturday', month: 'April', date: '28th', time: '9:30 AM', taken: false },
      { id: 41, day: 'Saturday', month: 'April', date: '28th', time: '10:00 AM', taken: false },
      { id: 42, day: 'Saturday', month: 'April', date: '28th', time: '10:30 AM', taken: false },
      { id: 43, day: 'Saturday', month: 'April', date: '28th', time: '11:00 AM', taken: false },
      { id: 44, day: 'Saturday', month: 'April', date: '28th', time: '11:30 AM', taken: false },
      { id: 45, day: 'Saturday', month: 'April', date: '28th', time: '12:00 PM', taken: false },
      { id: 46, day: 'Saturday', month: 'April', date: '28th', time: '12:30 PM', taken: false },
      { id: 47, day: 'Saturday', month: 'April', date: '28th', time: '1:00 PM', taken: false },
      { id: 48, day: 'Saturday', month: 'April', date: '28th', time: '1:30 PM', taken: false },
      { id: 49, day: 'Friday', month: 'May', date: '4th', time: '3:00 PM', taken: false },
      { id: 50, day: 'Friday', month: 'May', date: '4th', time: '3:30 PM', taken: false },
      { id: 51, day: 'Friday', month: 'May', date: '4th', time: '4:00 PM', taken: false },
      { id: 52, day: 'Friday', month: 'May', date: '4th', time: '4:30 PM', taken: false },
      { id: 53, day: 'Friday', month: 'May', date: '4th', time: '5:00 PM', taken: false },
      { id: 54, day: 'Friday', month: 'May', date: '4th', time: '5:30 PM', taken: false },
      { id: 55, day: 'Saturday', month: 'May', date: '5th', time: '9:00 AM', taken: false },
      { id: 56, day: 'Saturday', month: 'May', date: '5th', time: '9:30 AM', taken: false },
      { id: 57, day: 'Saturday', month: 'May', date: '5th', time: '10:00 AM', taken: false },
      { id: 58, day: 'Saturday', month: 'May', date: '5th', time: '10:30 AM', taken: false },
      { id: 59, day: 'Saturday', month: 'May', date: '5th', time: '11:00 AM', taken: false },
      { id: 60, day: 'Saturday', month: 'May', date: '5th', time: '11:30 AM', taken: false },
      { id: 61, day: 'Saturday', month: 'May', date: '5th', time: '12:00 PM', taken: false },
      { id: 62, day: 'Saturday', month: 'May', date: '5th', time: '12:30 PM', taken: false },
      { id: 63, day: 'Saturday', month: 'May', date: '5th', time: '1:00 PM', taken: false },
      { id: 64, day: 'Saturday', month: 'May', date: '5th', time: '1:30 PM', taken: false },
    ];
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'Mailgun',
      auth: {
        user: 'postmaster@mail.swimpufferfish.com',
        pass: process.env.emailpass,
      },
    });
    console.log('Mailgun user', process.env.website_email);
    console.log('Mailgun pass', process.env.website_pass);
    console.log('req.body', req.body);
    // setup email data with unicode symbols
    let mailOptions = {
      from: `"Power Road Puffer Fish" <${process.env.website_email}>`, // sender address
      to: req.body.email, // list of receivers
      subject: `You have signed up!`, // Subject line

      html: `  <div style="font-family: Arial, sans-serif">
      <div style="width: 500px;height; display: flex; flex-direction: column; justify-content: center; align-items: center">
        <img src="https://i.imgur.com/TboiVhr.png" style='width: 150px'/></div>
                   <div style="width: 500px; display: flex; flex-direction: column; justify-content: center; align-items: center; background-color: #55B3B0; color: white; margin-top: 15px; padding: 15px;">
                     
                     <h3> Hello!</h3></div>
                    <div style="width: 455px;height; display: flex; flex-direction: column; justify-content: flex-start; align-items: center; padding: 15px"><span>You just has signed up for swim team prep lessons with <strong>Power Road
                    Pufferfish Swim Lessons</strong></span><br>
                    <span>Here's what you signed up for:<br><br> 
                      
                      ${req.body.userAddedTimes.map((sessionID, index) => {
                        console.log(sessionID);
                        return (
                          ' ' +
                          swimTeams[sessionID - 1].day +
                          ', ' +
                          swimTeams[sessionID - 1].month +
                          ' ' +
                          swimTeams[sessionID - 1].date +
                          ', ' + 'at ' +
                          swimTeams[sessionID - 1].time +
                          '<br/>'
                        );
                      })}<br><br>
                    Please note that if you did not pay with a credit card at the time of reservation, you will still need to pay at the time of the lessons.</span><br><br>
  </div>
  
  <div style="width: 500px; display: flex; flex-direction: column; justify-content: center; align-items: center; background-color: #55B3B0; color: white; margin-top: 15px; padding: 15px;">
                      <strong>Thank you!</strong>
                    <span>Pufferfish Swim Team</span><span style="font-size: 8; margin-top: 5px">Please do not reply to this email</span></div>
    
                    
                    
            `,
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      }
      console.log('Message %s send: %s', info);
      res.status(200).send(info);
    });
  },
};
