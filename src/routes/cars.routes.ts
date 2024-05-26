import { Router } from 'express';
import { carsController } from '../controllers/';
import { upload } from '../config/multer'

const carRoutes = Router();

carRoutes.get('/', carsController.getAll);
carRoutes.get('/:id', carsController.getById);
carRoutes.post('/create', upload.single('picture'), carsController.insert);
carRoutes.delete('/:id', carsController.delete);
carRoutes.put('/:id', upload.single('picture'), carsController.update);

export default carRoutes;
