const express = require('express')
const router = express.Router()
const path = require('path')

router.post('/email', (req, res) => {

    const outputHTML = `
        <h2>Mail Details</h2>
        <ul>
            <li>Name : ${req.body.name}</li>
            <li>Email : ${req.body.email}</li>
            <li>Phone : ${req.body.phone}</li>
        </ul>
        <h3>Message</h3>
        <p>${req.body.message}</p>`

        "use strict";
        const nodemailer = require("nodemailer");
        
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: 'kerimciloglu2001@gmail.com',
            pass: 'REPLACE-WITH-YOUR-GENERATED-PASSWORD'
          }
        });
        
        // async..await is not allowed in global scope, must use a wrapper
        async function main() {
          // send mail with defined transport object
          const info = await transporter.sendMail({
            from: '"Node Proje Contact Form" <kerimciloglu2001@gmail.com>', // sender address
            to: "kerimciloglu2001@gmail.com", // list of receivers
            subject: "Node Contact Message", // Subject line
            text: "Hello world?", // plain text body
            html: outputHTML // html body
          });
        
          console.log("Message sent: %s", info.messageId);
          // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        
          //
          // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
          //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
          //       <https://github.com/forwardemail/preview-email>
          //
        
    req.session.sessionFlash = {
        type: 'alert alert-success',
        message: 'Mesajınız başarılı bir şekilde gönderildi.'
    }

    res.redirect('/contact')

}    
        main().catch(console.error);
        
})


module.exports = router