require("dotenv").config();
const nodemailer = require("nodemailer");
var htmlToText = require("nodemailer-html-to-text").htmlToText;
var mg = require("nodemailer-mailgun-transport");

module.exports = {
  sendSignupEmail: async ({
    email,
    firstName,
    sessionPreference,
    timePreference,
    notes,
    age,
  }) => {
    let sessions = [
      "April 16 - April 26",
      "May 28 - June 13",
      "June 18 - July 3",
      "July 30 - August 15",
      // "August 1 - August  17",
    ];
    let times = [
      "9:00 AM - 11:30 AM",
      "11:30 AM - 3:30 PM",
      "3:30 PM - 5:30 PM",
    ];
    // create reusable transporter object using the default SMTP transport
    let auth = {
      auth: {
        api_key: process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_DOMAIN,
      },
    };

    var nodemailerMailgun = nodemailer.createTransport(mg(auth));
    // transporter.use('compile', htmlToText());

    console.log(firstName, email, sessionPreference);

    // setup email data with unicode symbols
    let mailOptions = {
      from: process.env.EMAIL_FROM, // sender address
      to: email, // list of receivers
      subject: `You have signed up!`, // Subject line

      html: `  <div style="font-family: Arial, sans-serif">
      <div style="width: 500px;height; display: flex; flex-direction: column; justify-content: center; align-items: center">
        <img src="https://i.imgur.com/TboiVhr.png" style='width: 150px'/></div>
                   <div style="width: 500px; display: flex; flex-direction: column; justify-content: center; align-items: center; background-color: #55B3B0; color: white; margin-top: 15px; padding: 15px;">
                     
                     <h3> Hello!</h3></div>
                    <div style="width: 455px;height; display: flex; flex-direction: column; justify-content: flex-start; align-items: center; padding: 15px"><span>Your child <strong>${firstName}</strong> has just been signed up for swim lessons with <strong>Power Road
                    Pufferfish Swim Lessons</strong></span><br>
                    <span>Here's what you signed up for:<br><br> 
                      
                      ${sessionPreference.map((signup, index) => {
                        if (!signup) return;
                        else {
                          return (
                            "<strong>" +
                            "Session " +
                            parseInt(index + 1) +
                            "</strong>" +
                            "</strong>" +
                            " | Time Preference " +
                            times[timePreference[index] - 1] +
                            "<br/>"
                          );
                        }
                      })}
        
        <br><br>
                    We'll do our best to assign you a class within your preferred time preference, but there is no guarantee everyone will get in. You'll be notified 2-3 weeks before the session begins and assigned a time slot at that time!</span><br><br>
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
