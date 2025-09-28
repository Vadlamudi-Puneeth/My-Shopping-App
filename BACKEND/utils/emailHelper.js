// sending email

const nodemailer = require("nodemailer");

// Create a transporter for SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

(
    async () => {
        try{
            await transporter.verify();
            console.log("Email Server is Ready");
        }catch(err){
            console.log("Error connecting Email");
            console.log(err.message);
        }
})();


const sendEmail = async (toEmail, subject, htmlText) => {
  try {
      await transporter.sendMail({
      from: `"Shopping App Verification Team" <${process.env.SMTP_USER}>`, // sender address
      to: toEmail, // receivers mail
      subject: subject,
      html: htmlText
    });

    console.log("----------------Message sent----------------")
  } catch (err) {
    console.error("Error while sending mail", err);
    throw new Error("Error sent in email");
  }
};


const sendOtpEmail = async(toEmail, otp) => {
    sendEmail(
        toEmail,
        subject= "otp verification from shopping app",

        `
            <html>
                <head>
                    <style>
                        div{
                            display: flex;
                            flex-direction: column;
                            gap:1.5rem;
                            align-items: center;
                            justify-content: center;
                            padding: 1rem;
                        }
                        h2{
                            color: darkblue;
                        }
                        h1{
                            color: chocolate;
                        }
                    </style>
                </head>
                <body>
                    <div>
                        <h2>Your Otp for verifying the email is: </h2>
                        <h1>${otp}</h1>
                    </div>
                </body>
            </html>
        `

    )
}

module.exports = {
    sendOtpEmail
}
