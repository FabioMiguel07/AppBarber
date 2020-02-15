import User from "../models/User";

class UserController {

    async store(request , response ) {

        //Verificar se ja nao existe um usuario com o mesmo email

        const userExists = await User.findOne({where: {email: request.body.email}});

        if (userExists) {
            return response.status(400).json({error: 'Usuario/Email ja Cadastrado'});
        }
        const  {id, name, email, provider} =  await User.create(request.body);

        return response.json({
            id,name,email,provider
        });
    }

}

export default new UserController();
