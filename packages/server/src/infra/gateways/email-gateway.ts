import { IEmailGateway } from "@/application/gateways";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export class EmailGateway implements IEmailGateway {
    private static instance: EmailGateway;
    private static transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;

    private constructor() {}

    static getInstance() {
        if (!EmailGateway.instance) {
            // TODO: Criar variáveis de ambiente... criar um email para o nana-papais... futuramente
            //       comprar um domínio ou rodar um servidor no domínio do site.
            // TODO: Depois de criar os envs, criar uma nova senha pro gmail-app... pra não ficar
            //       rastreável nos commits.
            EmailGateway.transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "noreply.nanapapais@gmail.com",
                    pass: "vtwl mcvc xtyl cwdf"
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
