import empRouter from './employee/index';

import express from 'express';
const router = express.Router();

router.use('/emp', empRouter);

export default router;
