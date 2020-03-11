import Agendamento from "../models/Agendamento";
import User from "../models/User";
import { startOfDay , endOfDay , parseISO } from 'date-fns';
import { Op} from "sequelize";
import {parse} from "sucrase/dist/parser";

class ScheduleController {

    async index(request, response) {

        if (!await User.findOne({
            where: {
                id: request.userId,
                provider: true
            }
        })) {
            return response.status(401).json({
                error: 'Usuario nao Provider'
            })
        }

        const { date } = request.query;
        const parseDate = parseISO(date);

        const agendamentos = await Agendamento.findAll({
            where: {
               provider_id: request.userId,
                canceledAt: null,
                date: {
                    [Op.between] : [
                        startOfDay(parseDate),
                        endOfDay(parseDate)
                    ]

                },
            },
            order: ['date']
        });

        return response.json(agendamentos)
    }

}

export default new ScheduleController();
