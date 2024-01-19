import models from '../models/students.js';

const controllers = {};

controllers.index = (req, res) => {
    try {
        let response = {
            "message": "Get Students",
            "data": models,
        };

        res.json(response);
    } catch (error) {
        console.log(error);
        res.json({ "error": "Failed to data" });
    }
};

controllers.store = (req, res) => {
    try {
        const { name } = req.body;
        const getIndexID = models.length + 1;
        const student = { "id": getIndexID, "name": name };
        models.push(student);
        let response = {
            "message": `Add Data Students ${name}`,
            "data": models,
        };

        res.json(response);
    } catch (error) {
        console.log(error);
        res.json({ "error": "Failed to data" });
    }
};

controllers.update = (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        for (let index = 0; index < models.length; index++) {
            if (models[index].id == id) {
                models[index].name = name;
            }
        }
        let response = {
            "message": `Updated Data Students id ${id}`,
            "data": models,
        };

        res.json(response);
    } catch (error) {
        console.log(error);
        res.json({ "error": "Failed to update data" });
    }
};

controllers.destroy = (req, res) => {
    try {
        const { id } = req.params;
        for (let index = 0; index < models.length; index++) {
            if (models[index].id == id) {models.splice(index, 1);
            }
        }
        let response = {
            "message": "Success Deleted",
        };
        res.json(response);
    } catch (error) {
        console.log(error);
        res.json({ "error": "Failed to delete" });
    }
};

export default controllers;
