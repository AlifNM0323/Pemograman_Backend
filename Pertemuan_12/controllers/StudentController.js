import Student from "../models/Student.js";

let StudentController = {}

StudentController.index = async (req,res) => {

    try {
        const Student = await Student.findAll()
        
        const data = {
            message : "Tampilkan Semua Data Students",
            data : Student
        }
        res.json(data)
    } 
    
    catch (error) {
        const data = {
            message : "Error"
        }
        console.error("Error Saat Menambahkan Data User : "+error); res.status(900).json({ error: "Server Error" });
    }
}


StudentController.store = async (req,res) =>  {
    try {
      const { nama, nim, email, jurusan } = req.body;
  
      // Memastikan semua data terkirim
      if (!nama || !nim || !email || !jurusan) {
        const data = {
          message: "Semua Data Harus Dikirim",
        };
        return res.status(422).json(data);
      }
  
      // Membuat data student baru
      const student = await Student.create({ nama, nim, email, jurusan });
  
      // Menyusun respons
      const data = {
        message: "Menambahkan Data Student",
        data: student,
      };
  
      // Mengirim respons berhasil
      return res.status(201).json(data);
    } catch (error) {
      // Mengirim respons jika terjadi kesalahan
      return res.status(500).json({ message: "Terjadi kesalahan server", error: error.message });
    }
  }

StudentController.update = async (req,res) => {
    try {
        const { id } = req.params;
        const { nama, nim, email, jurusan } = req.body;

        if (!nama && !nim && !email && !jurusan) {
            return res.status(400).json({ error: "At least one field is required for update" });
        }
        

        const studentUpdate = await Student.findByPk(id);

        if (studentUpdate == null) {
            return res.status(404).json({ error: "Student not found" });
        }

        const fieldsToUpdate = {
            nama: nama || studentUpdate.name,
            nim: nim || studentUpdate.nim,
            email: email || studentUpdate.email,
            jurusan: jurusan || studentUpdate.jurusan,
        };

        let data =  {
            message : "Update Sukses",
            data : fieldsToUpdate
        }
        
        await studentUpdate.update(fieldsToUpdate);

        res.status(200).json(data);
    } catch (error) {
        console.error("Error saat update:", error);
        res.status(500).json({ error: "Server Error" });
    }
}

StudentController.delete = async (req,res) => {
    try {
        const { id } = req.params;
        
        const studentToDelete = await Student.findByPk(id);

        if (studentUpdate == null) {
            return res.status(404).json({ error: "Tidak Tampil" });
        }

        let data =  {message : "Student deleted Successfully",
        }

        await studentToDelete.destroy();

        res.status(200).json(data);
    } catch (error) {
        console.error("Error saat delete:", error);
            res.status(500).json({ error: "Server Error" });
    }
}

export default StudentController

