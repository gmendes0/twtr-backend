const multer = require('multer')
const path = require('path')

module.exports = {
  dest: path.resolve(__dirname, '..', '..', 'uploads', 'avatars'),
  storage: multer.diskStorage({
    destination: (request, file, callback) => {
      callback(null, path.resolve(__dirname, '..', '..', 'uploads', 'avatars'))
    },
    filename: (request, file, callback) => {
      callback(null, `${Date.now()}-${file.originalname}`)
    }
  }),
  fileFilters: (request, file, callback) => {
    const allowedMimes = [
      'image/jpeg',
      'image/png',
      'image/pjpeg',
    ]

    if (allowedMimes.includes(file.mimetype)) {
      callback(null, true)
    } else {
      callback(new Error('invalid file type.'))
    }
  },
  limits: {
    fileSize: 2 * 1024 * 1024
  }
}