const nodemailer = require("nodemailer");

var sendRegistrationMail = function (user,callback) {
    console.log(user);
    var transporter = nodemailer.createTransport({
                host: "smtp.office365.com",// hostname 
                secureConnection: false, // TLS requires secureConnection to be false 
                port: 587, // port for secure SMTP 
                tls: {
                    ciphers:'SSLv3'
                    },
                auth: {
                    user: "shweta.joshi@harbingergroup.com",
                    pass:"Teaiseverything@1"
                    }
        });

    let mailOptions = {
                    from: "shweta.joshi@harbingergroup.com",
                    to: user.email,
                    subject: "Registration On User Portal",
                    html: `Dear ${user.cname},<br> Your registration is successful.<b>Thank you for registration</b>.You may use our service now.`
                };

    transporter.sendMail(mailOptions, function (err, result) {
            if (err) {
                console.log('Error',err);
                logger.error("in sendContactUsMail sendMail,err: ", err);
                callback(err);
                    } else {
                        console.log('Success');
                        callback(null,result);
                    }
                });
        }


module.exports= {
    sendRegistrationMail
    };
