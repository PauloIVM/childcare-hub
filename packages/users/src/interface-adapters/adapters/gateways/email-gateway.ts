import { IEmailGateway } from "@/application/ports/gateways";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

// TODO: Os adapters são, em geral, implementações mais específicas do que o port. Acho
//       q seria interessante melhorar os nomes. Talvez aqui poderia ser:
//       NodemailerAdapter.
export class EmailGateway implements IEmailGateway {
    private static instance: EmailGateway;
    private static transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;

    private constructor() {}

    static getInstance() {
        if (!EmailGateway.instance) {
            EmailGateway.transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.EMAIL_GATEWAY_USERNAME,
                    pass: process.env.EMAIL_GATEWAY_PASSWORD
                }
            });
            EmailGateway.instance = new EmailGateway();
        }
        return this.instance;
    }

	async send(subject: string, text: string, to: string): Promise<string> {
        const mailOptions = {
            from: "NanaPapais <noreply.nanapapais@gmail.com>",
            to,
            subject,
            html: text
        };
        return new Promise((resolve, reject) => {
            EmailGateway.transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    reject(error);
                } else {
                    resolve(info.response);
                }
            })
        });
	}

    createTemplate(title: string, text: string): string {
        return (
            `<html><body><div>${title}<br>` +
            `<br>${text}<br>` +
            `<br>Atenciosamente,<br>equipe NanaPapais.<div class='yj6qo'></div><div class='adL'><br></div>` +
            `</div></body></html>`
        )
    }
}
