const form_controller = require("../controller/form.controller");
const router = require('express').Router();
const { upload } = require("../utils/file-storage");



router.post('/createProduct', upload.single('file'), form_controller.create)
router.get('/getProduct', form_controller.get)
router.post('/likeDislikeProduct', form_controller.likeDislike)

module.exports = router