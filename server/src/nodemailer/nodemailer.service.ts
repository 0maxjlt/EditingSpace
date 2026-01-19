import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NodemailerService {
  private transporter;

  constructor() {

    const testAcount = nodemailer.createTestAccount();

    this.transporter = nodemailer.createTransport({
      host: testAcount.smtp.host,
      port: testAcount.smtp.port,
      secure: testAcount.smtp.secure,
      auth: {
        user: testAcount.user,
        pass: testAcount.pass,
      },
    });
  }

  async sendMail(to: string, subject: string, text: string) {
    await this.transporter.sendMail({
      from: `"EditingSpace" testAcount`,
      to,
      subject,
      text,
    });
  }
}
