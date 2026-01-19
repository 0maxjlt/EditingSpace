import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Prisma } from '../../../generated/prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    switch (exception.code) {
      case 'P2002': // violation unique
        return response.status(HttpStatus.CONFLICT).json({
          statusCode: 409,
          message: 'Valeur unique déjà utilisée',
        });
      case 'P2025': // record introuvable
        return response.status(HttpStatus.NOT_FOUND).json({
          statusCode: 404,
          message: 'Ressource introuvable',
        });
      default:
        console.warn('Erreur Prisma inconnue:', exception.code, exception.meta);
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          statusCode: 500,
          message: 'Erreur base de données',
        });
    }
  }
}
