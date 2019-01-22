require('dotenv').config();
const nodemailer = require('nodemailer');
var htmlToText = require('nodemailer-html-to-text').htmlToText;

module.exports = {
  sendEmail(req, res) {
    let sessions = [
      'April 10 - May 3',
      'May 7 - May 17',
      'May 29 - June 14',
      'June 18 - June 28',
      'August 7 - August 23',
    ];
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'Mailgun',
      auth: {
        user: 'postmaster@mg.swimpufferfish.com',
        pass: process.env.emailpass,
      },
    });
    transporter.use('compile', htmlToText());

    console.log('req.body', req.body);
    // setup email data with unicode symbols
    let mailOptions = {
      from: `"Power Road Puffer Fish" <signup@swimpufferfish.com>`, // sender address
      to: req.body.child.email, // list of receivers
      subject: `Your time has been assigned!`, // Subject line
      // text: 'testing one two on two', // plain text body
      html: `
      <div style="font-family: Arial, sans-serif">
      <div style="width: 500px;height; display: flex; flex-direction: column; justify-content: center; align-items: center">
        <img src="https://i.imgur.com/TboiVhr.png" style='width: 150px'/></div>
                   <div style="width: 500px; display: flex; flex-direction: column; justify-content: center; align-items: center; background-color: #55B3B0; color: white; margin-top: 15px; padding: 15px;">
                     
                     <h3> Hello!</h3></div>

                     <p>Your time has been assigned for <strong>${req.body.child.childfirst}!</strong><br>
                    Your session time will be at <strong>${
                      req.body.time.time
                    }</strong>. You can also check your dashboard on our website to <a href="http://swimpufferfish.com/dash">view your schedule</a>.<br><br>
    
                    Child Name: ${req.body.child.childfirst}<br/>
                    Session: ${req.body.child.session_id} | ${sessions[req.body.child.session_id - 1]}<br/>
                    Time: ${req.body.time.time}<br/><br/>

                    IMPORTANT: Please click <a href="mailto:swimpufferfish@gmail.com?subject=${
                      req.body.child.childfirst
                    } Assigned Time">here</a> and send an email to confirm that this time works for you, or email us at <a href="mailto:swimpufferfish@gmail.com">swimpufferfish@gmail.com</a>.<br/>
                    
                    We need to know you received this email and that you will be doing this session, and we must hear from everyone!<br/><br/>

                    A few reminders:<br/>

                    1. Please apply sunscreen BEFORE arriving.<br/>
                    2. Parking is in back. Follow signs.<br/>
                    3. Please email me ASAP if you no longer can do this session. <a href="mailto:swimpufferfish@gmail.com">(swimpufferfish@gmail.com)</a><br/><br/>
                    
  
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
