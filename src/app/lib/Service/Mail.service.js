import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user:process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});


export const SendEmail = async(name,token,email)=>{
  const info = await transporter.sendMail({
      from: 'govind.lowanshi28@gmail.com',
      to: email,
      subject: "Forget Password",
      html:`

      Hey, ${name},
      your forget passwrod link is below click the link <br/>
      <a href="https://nextjs-auth-sage.vercel.app/update-password?token=${token}">Click</a>
      `,
    });

    return info
}