import StudentModel from "../models/Student.js";
import { Op } from "sequelize";
import { validationResult } from 'express-validator';
import StudentsValidation from '../validation/StudentsValidation.js';

class StudentController {
  async displayAllStudents(req, res) {
    try {
      let filterOptions = {};
      let whereConditions = {};
      
      console.log(req.query.filter);
      if (req.query.filter !== undefined) {
        if (req.query.filter["nama"] !== '' && req.query.filter["nama"] !== undefined) {
          whereConditions.nama = {
            [Op.like]: `%${req.query.filter["nama"]}%`,
          };
        }
    
        if (req.query.filter["jurusan"] !== '' && req.query.filter["jurusan"] !== undefined) {
          whereConditions.jurusan = {
            [Op.like]: `%${req.query.filter["jurusan"]}%`,
          };
        }
    
        console.log();
        if (Object.keys(whereConditions).length > 0) {
          filterOptions.where = whereConditions;
        }
      }

      let orderDirection;
      let sortByField = "id";
      let orderBy = "ASC";

      if (req.query.sort !== undefined && req.query.sort !== '') {
        let sortField = req.query.sort.toLowerCase();
        if (!['name', 'jurusan', 'id'].includes(sortField)) {
          return res.status(500).json({ errors: "nama, jurusan, and id" }); 
        } else {
          sortByField = sortField;
        }
      }

      if (req.query.order !== undefined && req.query.order !== '') {
        let orderValue = req.query.order.toLowerCase();
        if (!['asc', 'desc'].includes(orderValue)) {

        } else {
          orderBy = req.query.order;
        }
      }

      orderDirection = [sortByField, orderBy];
      filterOptions.order = [orderDirection];
      console.log(filterOptions);

      const studentsList = await StudentModel.findAll(filterOptions);
      const responseData = {
        message: "Show All Data Students",
        data: studentsList,
      };

      return res.json(responseData);
    } catch (error) {
      const responseData = {
        message: "Error",
      };
      console.error("Error student data: " + error);
      return res.status(500).json({ errors: "Internal Server Error" });
    }
  }

  async addStudent(req, res) {
    try {
      await Promise.all(StudentsValidation.createValidation.map((validation) => validation.run(req)));
      const errorsList = validationResult(req);

      if (!errorsList.isEmpty()) {
        const formattedErrors = errorsList.array().map((error) => ({
          [error.path]: error.msg,
        }));
    
        return res.status(422).json({ errors: formattedErrors, message: "All fields are required" });
      }
        
      const { name, nim, email, jurusan } = req.body;

      const existingStudent = await StudentModel.findOne({
        where: {
          nim: nim,
        }
      })
  
      if (existingStudent !== null) {
        return res.status(400).json({ errors: "Nim is available" });
      }

      const newStudent = await StudentModel.create({
        name: name,
        nim: nim,
        email: email,
        jurusan: jurusan,
      });
  
      let responseData = {
        message: "Student Created Successfully",
        data: newStudent,
      };
  
      res.status(201).json(responseData);
    } catch (error) {
      console.error("Error creating student:", error);
      res.status(500).json({ errors: "Internal Server Error" });
    }
  }

  async updateStudent(req, res) {
    try {
      await Promise.all(StudentsValidation.updateValidation.map((validation) => validation.run(req)));
      const errorsList = validationResult(req);
      
      if (!errorsList.isEmpty()) {
        const formattedErrors = errorsList.array().map((error) => ({
          [error.path]: error.msg,
        }));
    
        return res.status(422).json({ errors: formattedErrors, message: "Setidaknya satu bidang diperlukan untuk pembaruan" });
      }
      const { id } = req.params;
      const { name, nim, email, jurusan } = req.body;
  
      if (!name && !nim && !email && !jurusan) {
        return res.status(400).json({ errors: "Setidaknya satu bidang diperlukan untuk pembaruan" });
      }
      
      const studentToUpdate = await StudentModel.findByPk(id);
  
      if (studentToUpdate === null) {
        return res.status(404).json({ errors: "Student not found" });
      }
  
      const fieldsToUpdate = {
        name: name || studentToUpdate.name,
        nim: nim || studentToUpdate.nim,
        email: email || studentToUpdate.email,
        jurusan: jurusan || studentToUpdate.jurusan,
      };
  
      let responseData = {
        message: "Student Updated Successfully",
        data: fieldsToUpdate,
      };
      
      await studentToUpdate.update(fieldsToUpdate);
  
      res.status(200).json(responseData);
    } catch (error) {
      console.error("Error updating student:", error);
      res.status(500).json({ errors: "Internal Server Error" });
    }
  }

  async removeStudent(req, res) {
    try {
      await Promise.all(StudentsValidation.deleteValidation.map((validation) => validation.run(req)));
      const errorsList = validationResult(req);
      
      if (!errorsList.isEmpty()) {
        const formattedErrors = errorsList.array().map((error) => ({
          [error.path]: error.msg,
        }));
    
        return res.status(422).json({ errors: formattedErrors, message: "Setidaknya satu bidang diperlukan untuk dihapus" });
      }
      const { id } = req.params;
      
      const studentToDelete = await StudentModel.findByPk(id);
  
      if (studentToDelete === null) {
        return res.status(404).json({ error: "Student not found" });
      }
  
      let responseData = {
        message: "Student deleted Successfully",
      };
  
      await studentToDelete.destroy();
  
      res.status(200).json(responseData);
    } catch (error) {
      console.error("Error deleting student:", error);
      res.status(500).json({ errors: "Internal Server Error" });
    }
  }
}

export default new StudentController();
