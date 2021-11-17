const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const morgan = require('morgan');
const errorhandler = require('errorhandler');
const swaggerDocument = require('./swagger.json');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));
app.use(errorhandler());

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the API'
    });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})

module.exports = app;
