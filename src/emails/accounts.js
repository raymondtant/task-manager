const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// sgMail.send({
//     to: 'john@jpanzer.com',
//     from: 'another@bulldiamond.net',
//     subject: 'First API email',
//     text: 'This is a test!'

// }).then(() => {
//     console.log('Email sent.')
// }).catch((e) => {
//     console.log(e)
// })

const sendWelcomeEmail = (email, name) => {

// sgMail.send({
//     to: email,
//     from: 'another@bulldiamond.net',
//     subject: 'Welcome Message!',
//     text: `Welcome to the app, ${name}. Let me know how it works.`
// })
//console.log('REMEMBER to TURN EMAIL BACK ON...')
}

const sendGoodByeEmail = (email, name) => {
    // sgMail.send({
    //     to: email,
    //     from: 'another@bulldiamond.net',
    //     subject: 'Good Bye Message!',
    //     text: `Good Bye, ${name}. Sorry to see you go.`
    // })
 //   console.log('REMEMBER to TURN EMAIL BACK ON...')
}

 


module.exports = {
    sendWelcomeEmail,
    sendGoodByeEmail
}