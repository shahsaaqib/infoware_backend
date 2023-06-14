import express from 'express';
const router = express.Router();

import {
  createEmployee,
  listEmployee,
  getEmployee,
  updateEmployee,
  deleteEmployee,
} from './handler';

router.post('/', async (request, response) => {
  try {
    const result = await createEmployee(request.body);
    response.status(200).json(result);
  } catch (e) {
    response.status(500).json({
      status: 500,
      message: e.message,
    });
  }
});

router.get('/', async (request, response) => {
  try {
    const result = await listEmployee(request.query);
    response.status(200).json(result);
  } catch (e) {
    response.status(500).json({ err: e.message });
  }
});

router.get('/:id', async (request, response) => {
  try {
    const result = await getEmployee(request.params.id);
    response.status(200).json(result);
  } catch (e) {
    response.status(500).json({ err: e.message });
  }
});

router.put('/', async (request, response) => {
  try {
    const result = await updateEmployee(request.body);
    response.status(200).json(result);
  } catch (e) {
    response.status(500).json({ err: e.message });
  }
});

router.delete('/:id', async (request, response) => {
  try {
    const result = await deleteEmployee(request.params.id);
    response.status(200).json(result);
  } catch (e) {
    response.status(500).json({ err: e.message });
  }
});
export default router;
