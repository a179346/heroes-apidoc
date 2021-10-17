/* eslint-disable */
const express = require('express');
const app = express();
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerModelValidator = require('swagger-model-validator');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Hero server API',
      version: '1.0.0',
    },
    servers: [ {
      url: 'https://heroes-hahow.herokuapp.com',
      description: 'development'
    }, {
      url: 'http://127.0.0.1:3100',
      description: 'local'
    } ],
    schemes: [ 'http' ],
    basePath: '/'
  },
  apis: [
    // tags --------------------------------------------------------------------------------------------
    './api/tags.yaml',
    // schema --------------------------------------------------------------------------------------------
    './api/schemas/*.yaml',
    // parameters --------------------------------------------------------------------------------------------
    './api/parameters/*.yaml',
    // router --------------------------------------------------------------------------------------------
    // Hero
    './api/paths/ListHeroes.yaml',  // 取得英雄列表
    './api/paths/SingleHero.yaml',  // 取得單一英雄
  ]
};

const swaggerSpec = swaggerJSDoc(options);

swaggerModelValidator(swaggerSpec);

// OpenAPI JSON 格式
// https://swagger.io/specification/
app.get('/swagger.json', cors(), function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Render swagger 網站
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(3000, () => {
  console.log('listening on port: 3000');
});