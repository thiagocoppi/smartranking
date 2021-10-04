import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common";

@Catch()
export class AllExceptionFilter implements ExceptionFilter{
    private readonly logger = new Logger(AllExceptionFilter.name);
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest<Request>();
        
        const status: Number = 
        exception instanceof HttpException
        ? exception.getStatus()
        : 500;

        const message = exception instanceof HttpException
        ? exception.getResponse()
        : {
            message: "Ocorreu um erro não esperado",
            statusCode: status,
            error: "Internal Server Error"
          };


        this.logger.error(`Ocorreu um erro na url ${request.url} com o body ${JSON.stringify(request.body)} e o response ${JSON.stringify(message)} - Exception ${JSON.stringify(exception)}`);

        return response.status(status).json({
            timestamp: new Date().toISOString(),
            path: request.url,
            error: message
        });
    }

}