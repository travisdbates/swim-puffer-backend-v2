require('dotenv').config();
const nodemailer = require('nodemailer');
var htmlToText = require('nodemailer-html-to-text').htmlToText;

module.exports = {
  sendEmail(child) {
    let sessions = [
      'April 10 - May 3',
      'May 7 - May 17',
      'May 29 - June 14',
      'June 18 - June 28',
      'August 7 - August 23'
    ];
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'pufferfishswimlessons@gmail.com',
        pass: ''
      }
    });
    transporter.use('compile', htmlToText());

    console.log('req.body', req.body);
    // setup email data with unicode symbols
    let mailOptions = {
      from: `"Power Road Puffer Fish" <pufferfishswimlessons@swimpufferfish.com>`, // sender address
      to: child.email, // list of receivers
      subject: `Your time has been assigned!`, // Subject line
      // text: 'testing one two on two', // plain text body
      html: `
      <div style="font-family: Arial, sans-serif">
      <div style="width: 500px;height; display: flex; flex-direction: column; justify-content: center; align-items: center">
        <img src="https://i.imgur.com/TboiVhr.png" style='width: 150px'/></div>
                   <div style="width: 500px; display: flex; flex-direction: column; justify-content: center; align-items: center; background-color: #55B3B0; color: white; margin-top: 15px; padding: 15px;">
                     
                     <h3> Hello!</h3></div>

                     <p>Your time has been assigned for <strong>${
                       child.childfirst
                     }!</strong><br>
                    Your session time will be at <strong>${
                      child.time
                    }</strong>. You can also check your dashboard on our website to <a href="http://swimpufferfish.com/dash">view your schedule</a>.<br><br>
    
                    Child Name: ${child.childfirst}<br/>
                    Session: ${child.session_id}<br/>
                    Time: ${child.time}<br/><br/>

                    IMPORTANT: Please click <a href="mailto:swimpufferfish@gmail.com?subject=${
                      child.childfirst
                    } Assigned Time">here</a> and send an email to confirm that this time works for you, or email us at <a href="mailto:swimpufferfish@gmail.com">swimpufferfish@gmail.com</a>.<br/>
                    
                    We need to know you received this email and that you will be doing this session, and we must hear from everyone!<br/><br/>

                    A few reminders:<br/>

                    1. Please apply sunscreen BEFORE arriving.<br/>
                    2. Parking is in back. Follow signs.<br/>
                    3. Please email me ASAP if you no longer can do this session. <a href="mailto:swimpufferfish@gmail.com">(swimpufferfish@gmail.com)</a><br/><br/>
                    
  
  <div style="width: 500px; display: flex; flex-direction: column; justify-content: center; align-items: center; background-color: #55B3B0; color: white; margin-top: 15px; padding: 15px;">
                      <strong>Thank you!</strong>
                    <span>Pufferfish Swim Team</span><span style="font-size: 8; margin-top: 5px">Please do not reply to this email</span></div>
            `
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return {
          status: 'error',
          data: error
        };
      }
      console.log('Message %s send: %s', info);
      return {
        status: 'success',
        data: null
      };
    });
  }
};
