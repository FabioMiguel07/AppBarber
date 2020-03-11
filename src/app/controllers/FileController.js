import File from '../models/File';

class FileController {

    async store(request, response) {

        const { originalname: name, filename: path } = request.file;

        console.log(name + ' - ' + path);
        const file = await File.create({
            name , path
        });

        return response.json(file)
    }
}

export default new FileController();
