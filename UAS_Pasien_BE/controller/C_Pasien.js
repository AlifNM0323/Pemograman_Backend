import { Op } from 'sequelize';
import M_Pasien from '../models/M_Pasien.js';
import M_Status from '../models/M_Status.js';


class C_Pasien {
    async index(req, res) {
        try {
            const { name, address, status, sort, order } = req.query;
            let whereClause = {};
            let orderClause = [];
        
            if (name) {
                whereClause.name = { [Op.like]: `%${name}%` };
            }
            if (address) {
                whereClause.address = { [Op.like]: `%${address}%` };
            }
            if (status) {
                whereClause.status = status;
            }
        
            if (sort && order) {
                orderClause = [[sort, order.toUpperCase()]];
            }
        
            const patients = await M_Pasien.findAll({
                where: whereClause,
                order: orderClause,
                include: [M_Status],
            });
    
            const response = {
                message: "Menampilkan semua data Pasien",
                data: patients.map(patient => ({
                    id_patient:patient.id,
                    name: patient.name,
                    phone: patient.phone,
                    address: patient.address,
                    in_date_at: patient.in_date_at,
                    out_date_at: patient.out_date_at,
                    timestamp: patient.timestamp,
                    status_Info:{status: patient.status.status,}
                    
                })),
            };
    
            res.status(200).json(response);
    
        } catch (error) {
            console.error(" :", error);
            res.status(500).json({ message: "Terjadi kesalahan saat mengambil pasien", error: error.message });
        }
        
    }

    async get(req, res) {
        const { id } = req.params;

        try {
            const patients = await M_Pasien.findByPk(id);
            const status = await M_Status.findByPk(patients.statusId);

            if (patients) {
                const data = {
                    message: `Dapatkan pasien berdasarkan ID ${id}`,
                    data: {
                        id_patient:patients.id,
                    name: patients.name,
                    phone: patients.phone,
                    address: patients.address,
                    in_date_at: patients.in_date_at,
                    out_date_at: patients.out_date_at,
                    timestamp: patients.timestamp,
                    status_Info:{status: status.status,}
                    }
                };
                res.status(200).json(data);
            } else {
                res.status(404).json({ message: "Pasien tidak ditemukan" });
            }
        } catch (error) {
            console.error("Terjadi kesalahan saat mengambil pasien dari database:", error);
            res.status(500).json({ message: "Terjadi kesalahan saat mengambil pasien", error: error.message });
        }
    }

    async store(req, res) {
        try {
            const { name, phone, address, status, in_date_at, out_date_at, timestamp } = req.body;
    
            const requiredFields = ['name', 'phone', 'address', 'status', 'in_date_at', 'out_date_at', 'timestamp'];
            const missingFields = requiredFields.filter(field => !req.body[field]);
    
            if (missingFields.length > 0) {
                return res.status(422).json({
                    message: "Kesalahan Validasi",
                    errors: `Bidang wajib tidak ada: ${missingFields.join(', ')}`
                });
            }
    
            // Cari atau buat status baru terlebih dahulu
            const foundStatus = await M_Status.findOne({ where: { status: status.type } });
    
            let statusId;
            if (foundStatus) {
                // Jika status sudah ada, gunakan ID status yang sudah ada
                statusId = foundStatus.id;
            } else {
                // Jika status belum ada, buat status baru
                const newStatus = await M_Status.create({ status: status.type });
                statusId = newStatus.id;
            }
    
            // Buat pasien baru dengan status yang telah ditemukan atau dibuat
            const newPatient = await M_Pasien.create({
                name,
                phone,
                address,
                statusId,
                in_date_at,
                out_date_at,
                timestamp,
            });
    
            const createdStatus = await M_Status.findByPk(statusId);
    
            const responseData = {
                message: `Menambahkan Pasien baru: ${name}`,
                data: {
                    id: newPatient.id,
                    name: newPatient.name,
                    phone: newPatient.phone,
                    address: newPatient.address,
                    in_date_at: newPatient.in_date_at,
                    out_date_at: newPatient.out_date_at,
                    timestamp: newPatient.timestamp,
                    status: {
                        id: createdStatus.id,
                        status: createdStatus.status,
                    },
                },
            };
    
            res.status(201).json(responseData);
        } catch (error) {
            console.error("Terjadi kesalahan saat menambahkan Pasien ke database:", error);
    
            // Check for validation error from Sequelize
            if (error.name === 'SequelizeValidationError') {
                const validationErrors = error.errors.map(err => ({
                    message: err.message,
                    field: err.path,
                }));
                // Status 422 - validation error
                res.status(422).json({ message: "Kesalahan Validasi", errors: validationErrors });
            } else {
                // Status 500 - other errors
                res.status(500).json({ message: "Terjadi kesalahan saat menambahkan pasien", error: error.message });
            }
        }
    }

    async update(req, res) {
        const { id } = req.params;
        const { status, out_date_at } = req.body;
        let statusId = 0;
    
        if (status === 'sembuh') {
            statusId = 1;
        } else if (status === 'positif') {
            statusId = 2;
        } else if (status === 'meninggal') {
            statusId = 3;
        } else {
            const data = {
                message: 'Pilih Status sembuh, positif, atau meninggal',
            };
            return res.status(422).json(data);
        }
    
        try {
            const [updatedRowsCount] = await M_Pasien.update(
                { statusId, out_date_at },
                { where: { id } }
            );
    
            if (updatedRowsCount > 0) {
                const patient = await M_Pasien.findByPk(id);
    
                if (patient) {
                    const statusInfo = await M_Status.findByPk(patient.statusId);
    
                    const data = {
                        message: `Dapatkan pasien berdasarkan ID ${id}`,
                        data: {
                            id_patient: patient.id,
                            name: patient.name,
                            phone: patient.phone,
                            address: patient.address,
                            in_date_at: patient.in_date_at,
                            out_date_at: patient.out_date_at,
                            timestamp: patient.timestamp,
                            status_Info: { status: statusInfo.status },
                        },
                    };
                    res.status(200).json(data);
                } else {
                    res.status(404).json({ message: 'Sumber tidak ditemukan' });
                }
            } else {
                res.status(404).json({ message: 'Sumber tidak ditemukan' });
            }
        } catch (error) {
            console.error('Terjadi kesalahan saat memperbarui pasien di database:', error);
            res.status(500).json({ message: 'Terjadi kesalahan saat memperbarui pasien', error: error.message });
        }
    }

    async destroy(req, res) {
        const { id } = req.params;


        try {
            const patientsToDelete = await M_Pasien.findByPk(id);

            if (patientsToDelete) {
                await patientsToDelete.destroy();

                const data = {
                    message: `Pasien yang dihapus dengan ID ${id}`,
                    data: { id: parseInt(id) },
                };
                res.status(200).json(data);
            } else {
                res.status(404).json({ message: "Pasien tidak ditemukan untuk dihapus" });
            }
        } catch (error) {
            console.error("Terjadi kesalahan saat menghapus pasien dari database:", error);
            res.status(500).json({ message: "Terjadi kesalahan saat menghapus pasien", error: error.message });
        }
    }

    async specific(req, res) {
        try {
            const { field, value } = req.query;
            if (!field || !value) {
                return res.status(400).json({ message: "Parameter 'bidang' dan 'nilai' diperlukan dalam kueri." });
            }

            const patients = await M_Pasien.findAll({
                where: {
                    [field]: {
                        [Op.like]: `%${value}%`
                    },
                },
            });

            if (patients.length > 0) {
                const data = {
                    message: `Getting pasien with ${field} ${value}`,
                    data: patients,
                };
                return res.status(200).json(data);
            } else {
                return res.status(404).json({ message: "pasien not found" });
            }
        } catch (error) {
            console.error("Error getting specific pasien:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}

const patientsController = new C_Pasien();
export default patientsController;