
const models = require('../models/students');

class StudentController {
    index(req, res) {
        const response = {
            message: "Get All Students",
            data: models,
        };

        res.json(response);
    }

    store(req, res) {
        try {
            const { name } = req.body;
            const getIndexID = models.length + 1;
            const student = { id: getIndexID, name: name };
            models.push(student);
            const response = {
                message: `Add Data Students New ${name}`,
                data: models,
            };

            res.json(response);
        } catch (error) {
            console.log(error);
            res.json({ error: "Gagal Untuk Menambahkan Data" });
        }
    }

    update(req, res) {
        try {
            const { id } = req.params;
            const { name } = req.body;

            const updatedModels = models.map(student => {
                if (student.id == id) {
                    return { ...student, name: name };
                }
                return student;
            });

            const response = {
                message: `Updated Data Students id ${id}`,
                data: updatedModels,
            };

            res.json(response);
        } catch (error) {
            console.log(error);
            res.json({ error: "Gagal Untuk Updated Data" });
        }
    }

    destroy(req, res) {
        try {
            const { id } = req.params;

            const filteredModels = models.filter(student => student.id != id);

            const response = {
                message: "Berhasil Deleted Data",
                data: filteredModels,
            };

            res.json(response);
        } catch (error) {
            console.log(error);
            res.json({ error: "Gagal Untuk Deleted Data" });
        }
    }
}

const controllers = new StudentController();

module.exports = controllers;
