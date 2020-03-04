import jwt from 'jsonwebtoken';
import auth from "../../config/auth";
import { promisify } from 'util';

export default async ( request , response, next ) => {

    const authHeader = request.headers.authorization;

    if (!authHeader) {
         return response.status(401).json({error: "Token nao Informado"});
    }
    const [, token] = authHeader.split(' ');

   // console.log(authHeader);

    try {

        const decoded = await promisify(jwt.verify)(token, auth.secret);
        console.log(decoded);

        request.userId = decoded.id ;

        return next();

    } catch (e) {
        return response.status(401).json({error: "Token Invalido"});
    }


};
