const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Documentation',
      version: '1.0.0',
    },
  },
  apis: ['./routes/roleRoute.js', './routes/employeeRoute.js','./routes/subjectRoute.js','./routes/recruiterRoute.js','./routes/YearSem.js','./server.js'], // Point to your route files
};

const specs = swaggerJsdoc(options);

module.exports = { specs, swaggerUi };
