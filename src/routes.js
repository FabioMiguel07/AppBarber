import { Router } from 'express';

const routes = new Router();

routes.get('/', (require, response) => {
    return response.json({message: 'Hello Miguel'})
});

export default routes;
