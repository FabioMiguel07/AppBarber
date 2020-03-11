import Agendamento from "../models/Agendamento";
import * as YUP from 'yup'
import pt from 'date-fns/locale/pt';
import User from "../models/User";
import File from "../models/File";
import { startOfHour, parseISO, isBefore, format } from 'date-fns';
import Notification from "../schemas/Notification";


class AgendamentoController {

    async index (request, response) {

        const { page } = request.query;

        const agendamentosUser = await Agendamento.findAll({
            where: {
                user_id: request.userId, canceledAt: null
            },
            order: ['date'],
            attributes: ['id', 'date'],
            limit: 3,
            offset: (page - 1) * 3,
            include: [
                {
                    model: User,
                    as: 'provider',
                    attributes: ['id', 'name'],
                    include: [
                        {
                            model: File,
                            as: 'avatar',
                            attributes: ['id', 'path', 'url']
                        }
                    ]
                }

            ]
        });
        return response.json(agendamentosUser);
    }

    async store(request, response) {

        const schema = YUP.object().shape({
            provider_id: YUP.number().required(),
            date: YUP.date().required()
        });

        if (!(await schema.isValid(request.body))) {
            return response.status(400).json({
                error: "Validacao Falhou"
            })
        }

        const {provider_id, date } = request.body;

        /**
         * Check provider
         */
        if (await User.findOne
            ({
                    where: {id: provider_id ,
                    provider: false
                    }
                }
            )
        ){
            return response.status(400).json({
                error: "Criacao de Agendamentos somente para Providers"
            })
        }


        console.log('ID USUARIO: ' , request.userId);


        //Validacao de Datas
        const hourStart = startOfHour(parseISO(date));
        if (isBefore(hourStart, new Date())){
            return response.status(400).json({
                error: "A Data deve ser maior que hoje "
            })
        }


        //Verificar datas disponives
        if (await Agendamento.findOne({
            where: {
                provider_id,
                canceledAt: null,
                date: hourStart
                }
            })
        ){
            return response.status(400).json({
                error: "A Data informada nao esta disponivel para Agendamento "
            })
        }

        const agendamento = await Agendamento.create({
            user_id: request.userId,
            provider_id,
            date: hourStart
        });

        //Buscar o nome do usuario salvo
        const nomeUsuario = await User.findByPk(request.userId);
        const dataFormatada = format(hourStart,
            "'dia' dd 'de' MMMM', as' H:mm'h'",
            {
                locale: pt
            });

        //Notificar o prestador de servico..
        console.log('DATA: ' + dataFormatada);
        await Notification.create({
            content: `Novo Agendamento de ${nomeUsuario.name} para o ${dataFormatada}`,
            user: provider_id
        });

        return response.json(agendamento);
    }
}

export default new AgendamentoController();
