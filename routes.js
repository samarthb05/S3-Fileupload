const express = require('express');
const router = express.Router();

const controller = require('./controller');
const {upload} = require('./upload');

router.post('/addDetail', upload.single('photo'), controller.addDetails);
router.get('/getdetails',controller.getdetails);
router.get('/detailById/:id',controller.detailsById);
router.put('/editDetail/:id', upload.single('photo'),controller.editDetils);
router.delete('/deleteDetail/:id',controller.deletedetils);

module.exports = router;