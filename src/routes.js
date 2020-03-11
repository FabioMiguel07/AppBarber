import { Router } from 'express';
import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import auth from "./app/middlewares/auth";
import multer from 'multer';
import multerConfig from './config/multer';
import FileController from "./app/controllers/FileController";
import ProviderController from "./app/controllers/ProviderController";
import AgendamentoController from "./app/controllers/AgendamentoController";
import ScheduleController from "./app/controllers/ScheduleController";

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(auth);
routes.put('/users', UserController.update);
routes.get('/providers', ProviderController.index);

routes.post('/files', upload.single('file'), FileController.store);


routes.post('/agendamento', AgendamentoController.store);
routes.get('/agendamento', AgendamentoController.index);
routes.get('/schedule', ScheduleController.index);

export default routes;
