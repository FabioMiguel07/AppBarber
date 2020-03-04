import { Router } from 'express';
import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import auth from "./app/middlewares/auth";
import multer from 'multer';
import multerConfig from './config/multer';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(auth);
routes.put('/users', UserController.update);

routes.post('/files', upload.single('file'), (req, res) => {
    return res.json({
        ok: true
    })
});

export default routes;
