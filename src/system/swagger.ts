import { Express } from 'express';
import { WorkloadName } from 'src/workloads/workloads';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { logger } from './winston';

const options: swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Express Microservice Backend',
            version: '1.0.0',
            description: 'API documentation for the Express microservice backend',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    in: 'header',
                    name: 'x-auth-token',
                    description: 'Bearer token to access these api endpoints',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis: ['./src/swagger-docs/**/*.yaml']
};

export function swaggerDocs(app: Express, worker: WorkloadName) {
    options.apis = [`./src/swagger-docs/${worker}/*.yaml`];
    app.use(`/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));
    logger.info(`Swagger docs available at /api-docs`);
}