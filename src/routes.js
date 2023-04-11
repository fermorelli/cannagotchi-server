import express from 'express';
import usersControllers from './users/controller.js';
import plantsControllers from './plants/controllers.js';

const router = express.Router();

router
  .post('/users', usersControllers.createUser)
  .post('/plants', plantsControllers.createPlant)
  .get('/users', usersControllers.getAllUsers)
  .get('/plants', plantsControllers.getAllPlants)
  .get('/users/:id', usersControllers.getUserById)
  .get('/plants/:id', plantsControllers.getPlantById)
  .put('/users/:id', usersControllers.updateUser)
  .put('/plants/:id', plantsControllers.updatePlant)
  .delete('/users/:id', usersControllers.deleteUser)
  .delete('/plants/:id', plantsControllers.deletePlant)

export default router;