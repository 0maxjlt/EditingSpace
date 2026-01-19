import { Module } from '@nestjs/common';
import { NodemailerController } from './nodemailer.controller';
import { NodemailerService } from './nodemailer.service';


@Module({
    controllers: [NodemailerController],
    providers: [NodemailerService],
    exports: [NodemailerService],
})
export class NodemailerModule {}
