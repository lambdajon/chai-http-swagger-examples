const router = require('express').Router();
const { setup } = require('chai-http-swagger')
const path = require('path')
const docsFilePath = path.resolve(__dirname)
const swaggerOptions = {
  swagger: {

    swaggerDefinition: {
      openapi: '3.0.0',
      servers: [
        {
          url: process.env.APP_HOST,
          description: 'Development server'
        },
        {
          url: '{app_host}:{port}{api_prefix}',
          description: 'Custom server',
          variables: {
            app_host: {
              default: 'http://localhost'
            },
            port: {
              default: process.env.PORT || 3000
            },
            api_prefix: {
              default: '/'
            }
          }
        }
      ],
      info: {
        title: 'Users api',
        description: 'Test api USERS CRUD'
      },
      components: {
        securitySchemes: {
          Bearer: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header',
            description: 'Please use login api to get accessToken'
          }
        }
      }
    }
  },
  config: {
    swaggerPath: docsFilePath,
    fileName: 'test_api'
  }
  // apis: [
  //   `./*.yaml`,
  // ]
};
const swagger = setup(swaggerOptions).swagger
router.use('/swagger', swagger);
module.exports = router;