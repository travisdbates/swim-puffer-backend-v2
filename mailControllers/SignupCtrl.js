require('dotenv').config();
const nodemailer = require('nodemailer');
var htmlToText = require('nodemailer-html-to-text').htmlToText;
var mg = require('nodemailer-mailgun-transport');

module.exports = {
  sendSignupEmail: async ({ email,
    firstName,
    sessionPreference,
    timePreference,
    notes,
    age }) => {
    let sessions = [
      'April 27 - May 13',
      'May 18 - June 3',
      'June 8 - June 24',
      'June 29 - July 9',
      'August 17 - August 27',
    ];
    let times = ['9:00 AM - 11:30 AM', '11:30 AM - 3:30 PM', '3:30 PM - 5:30 PM'];
    // create reusable transporter object using the default SMTP transport
    let auth = {
      auth: {
        api_key: process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_DOMAIN
      }
    };

    var nodemailerMailgun = nodemailer.createTransport(mg(auth));
    transporter.use('compile', htmlToText());

    console.log(firstName, email, sessionPreference)

    // setup email data with unicode symbols
    let mailOptions = {
      from: `"Power Road Puffer Fish" <signup@swimpufferfish.com>`, // sender address
      to: email, // list of receivers
      subject: `You have signed up!`, // Subject line

      html: `  <div style="font-family: Arial, sans-serif">
      <div style="width: 500px;height; display: flex; flex-direction: column; justify-content: center; align-items: center">
        <img src="https://i.imgur.com/TboiVhr.png" style='width: 150px'/></div>
                   <div style="width: 500px; display: flex; flex-direction: column; justify-content: center; align-items: center; background-color: #55B3B0; color: white; margin-top: 15px; padding: 15px;">
                     
                     <h3> Hello ${firstName}!</h3></div>
                    <div style="width: 455px;height; display: flex; flex-direction: column; justify-content: flex-start; align-items: center; padding: 15px"><span>Your child <strong>${req.body.name
        }</strong> has just been signed up for swim lessons with <strong>Power Road
                    Pufferfish Swim Lessons</strong></span><br>
                    <span>Here's what you signed up for:<br><br> 
                      
                      ${sessionPreference.map((sessionID, index) => {
          console.log(sessionID);
          return (
            '<strong>' +
            ' ' +
            sessionPreference[sessionID - 1].name +
            '</strong>' +
            ' | ' +
            sessionPreference[sessionID - 1].dates +
            ' | ' +
            '<strong>' +
            sessionPreference[sessionID - 1].days +
            '</strong>' +
            ' | ' +
            times[req.body.time[index] - 1] +
            '<br/>'
          );
        })}<br><br>
                    We'll do our best to assign you a class within your preferred time preference. Please allow 2 - 3 weeks for us to process your reservation. You'll be notified once your class time has been assigned!</span><br><br>
  </div>
  
  <div style="width: 500px; display: flex; flex-direction: column; justify-content: center; align-items: center; background-color: #55B3B0; color: white; margin-top: 15px; padding: 15px;">
                      <strong>Thank you!</strong>
                    <span>Pufferfish Swim Team</span><span style="font-size: 8; margin-top: 5px">Please do not reply to this email</span></div>
    
                    
                    
            `,
    };

    // send mail with defined transport object
    // await transporter.sendMail(mailOptions);
    await nodemailerMailgun.sendMail(mailOptions);
  },
};
