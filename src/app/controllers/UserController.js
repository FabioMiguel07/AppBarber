import User from "../models/User";
import * as Yup from 'yup';

class UserController {

    async store(request , response ) {

        //Verificar se ja nao existe um usuario com o mesmo email

        const schema = Yup.object().shape({
            name: Yup.string()
                .required(),
            email: Yup.string()
                .email()
                .required(),
            password: Yup.string()
                .required().min(6)
        });

        if (!(await schema.isValid(request.body))) {
            return response.status(400).json({error: 'Falha de Validacao'});
        }
        const userExists = await User.findOne({where: {email: request.body.email}});

        if (userExists) {
            return response.status(400).json({error: 'Usuario/Email ja Cadastrado'});
        }
        const  {id, name, email, provider} =  await User.create(request.body);

        return response.json({
            id,name,email,provider
        });
    }

    async update(request, response) {

        const { email , oldPassword } = request.body;
        const user = await User.findByPk(request.userId);

        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string()
                .email(),
            oldPassword: Yup.string()
                .min(6),
            password: Yup.string()
                .min(6)
                .when('oldPassword', (oldPassword, field) => {
                    oldPassword ? field.required(): field
                })
        });

        if (!(await schema.isValid(request.body))) {
            return response.status(400).json({error: 'Falha de Validacao'});
        }

        if (email !== user.email) {
            const userExists = await User.findOne({where: {email}});

            if (userExists){
                return response.status(400).json({
                    error:
                    "Usuario ja existe"
                })
            }
        }

        if (oldPassword && !(await user.checkPasswor(oldPassword))){
            return response.status(401).json({
                error:
                "Senha invalida"
            })
        }

       const  { id, name, provider } =  await user.update(request.body);

        return response.json({
            id,name,email,provider
        });



        //console.log(request.userId);
        //return response.json({'ok': true})
    }

}

export default new UserController();
