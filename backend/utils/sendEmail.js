// util for sending email
const nodemailer = require("nodemailer");

// send email
module.exports = async (email, subject, text) => {
	try {
		const transporter = nodemailer.createTransport({
			host: process.env.HOST,
			service: process.env.SERVICE,
			port: Number(process.env.EMAIL_PORT),
			secure: Boolean(process.env.SECURE),
			auth: {
				user: "fudstops307@gmail.com",
				pass: "liqfmvdjqpfjukvc",
			},
		});

        // console.log(process.env.PASS);

		await transporter.sendMail({
			from: process.env.USER,
			to: email,
			subject: subject,
			text: text,
		});
		// console.log("email sent successfully");
	} catch (error) {
		// console.log("email not sent!");
		// console.log(error);
		return error;
	}
};

// TODO: create new gmail for sending emails if needed for testing

