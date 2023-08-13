import { createSwaggerSpec } from 'next-swagger-doc'

import 'server-only'

export const getApiDocs = async () =>
  createSwaggerSpec({
    apiFolder: 'src/app/api',
    schemaFolders: ['model'],
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'TokeNest API Swagger',
        description: 'TokeNest에서 사용하는 API 정리',
        version: '1.0',
      },
      components: {
        securitySchemes: {
          BearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
          OAuth2: {
            type: 'oauth2',
            flows: {
              authorizationCode: {
                authorizationUrl: 'https://example.com/oauth/authorize',
                tokenUrl: 'https://example.com/oauth/token',
                scopes: {
                  read: 'Grants read access',
                  write: 'Grants write access',
                },
              },
            },
          },
        },
      },
      security: [],
    },
  })
