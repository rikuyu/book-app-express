import nodemailer, {TransportOptions} from "nodemailer";

export const sendEmail = async (
    email: string,
    subject: string,
    text: string,
): Promise<void> => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false, // use SSL
        auth: {
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PASSWORD,
        },
    } as TransportOptions);

    await transporter.sendMail({
        from: process.env.SENDER_EMAIL,
        to: email,
        subject: subject,
        text: text,
    });
};
