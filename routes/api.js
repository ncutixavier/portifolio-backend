const express = require('express');
const projectRouter = require('./project');
const apiRouter = express.Router();

apiRouter.use('/projects', projectRouter);

module.exports = apiRouter;
