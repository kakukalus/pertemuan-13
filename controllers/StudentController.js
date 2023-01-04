// import Model Student
const Student = require("../models/Student");

class StudentController {

  statusData(res, number, message, data = {}) {
    const dataContent = {
      message: message,
      data: data
    };

    return res.status(number).json(dataContent);
  }

  async index(req, res) {
    // Memanggil method all dari Model Student
    const students = await Student.all();

    // Cek apakah data array tidak kosong
    if (students.length > 0)
      return this.statusData(res, 200, 'Menampilkkan semua students', students);

    return this.statusData(res, 200, 'Students is empty');
  }

  async store(req, res) {

    validation(req);
    // Memanggil method create dari model Student.
    const student = await Student.create(req.body);

    return statusData(res, 201, 'Menambahkan data student', students);


  }

  async update(req, res) {
    const { id } = req.params;
    // Mencari data yang ingin diupdate
    const student = await Student.find(id);

    // Jika data ada, maka update data.
    if (student) {
      // Memanggil method update dari model Student.
      validation(req);
      const student = await Student.update(id, req.body);
      return statusData(res, 200, `Mengedit data students`);
    }
    return statusData(res, 404, `Student not found`);

  }

  async destroy(req, res) {
    const { id } = req.params;
    // Mencari data yang ingin dihapus
    const student = await Student.find(id);

    // Jika data ada, maka hapus data
    if (student) {
      // Memanggil method delete dari Model Student
      await Student.delete(id);
      statusData(res, 200, `Menghapus data students`);
    }

    // Jika data tidak ditemukan
    statusData(res, 404, `Student not found`);
  }

  async show(req, res) {
    const { id } = req.params;
    // Mencari data berdasarkan id
    const student = await Student.find(id);

    // Jika data ada, maka tampilkan data
    if (student) {
      const data = {
        message: `Menampilkan detail students`,
        data: student,
      };

      return res.status(200).json(data);
    }
    // Jika data tidak ditemukan
    statusData(res, 404, `Student not found`);
  }



  validation(req) {
    /**
 * Validasi sederhana:
 * - Handle jika salah satu data tidak dikirim
 */

    // destructing object req.body
    const { nama, nim, email, jurusan } = req.body;

    // jika data undefined maka kirim response error
    if (!nama || !nim || !email || !jurusan) {
      const data = {
        message: "Semua data harus dikirim",
      };

      return res.status(422).json(data);
    }
  }
}

// Membuat object StudentController
const object = new StudentController();

// Export object StudentController
module.exports = object;
