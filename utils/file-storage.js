const multer = require('multer');
const { v4 } = require('uuid');
const fs = require('fs');

const checkExtension = (req, file, callback) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg') {
      callback(null, true);
    } else {
      callback("Only image files are accepted", false)
    }
  }

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = './images'
        if(!fs.existsSync(dir)){
            fs.mkdir('./images', (err) => {
            if (err) {
                console.log(err);
            }
        }
        )};
        
        cb(null, dir)
        

    },
    filename: (req, file, cb) => {
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];
        cb(null, `${v4()}.${extension}`)
    },
  })

  const upload = multer({ storage: storage, fileFilter: checkExtension, limits: { fileSize: 1024 * 1024 * 2 } })

  module.exports = {upload}