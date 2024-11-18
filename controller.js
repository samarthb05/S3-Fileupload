const File = require('./filemodel');
const {s3} = require('./upload');
const { PutObjectCommand } = require("@aws-sdk/client-s3");
require('dotenv').config();

// Add details with file upload
const addDetails = async (req, res) => {
    try {
        const { fullname } = req.body;
        const photo = req.file ? req.file.location : null; 

        const newDetail = new File({ fullname, photo });
        const savedDetail = await newDetail.save();

        res.status(200).json({ message: 'Detail added successfully!', detail: savedDetail });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// Get all details
const getdetails = async (req, res) => {
    try {
        const Details = await File.find();
        res.status(200).json(Details);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get details by ID
const detailsById = async (req, res) => {
    try {
        const details = await File.findById(req.params.id);
        if (!details) return res.status(400).json({ message: 'Detail Not Found' });
        res.status(200).json(details);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// Edit details
const editDetils = async (req, res) => {
    try {
        const { fullname } = req.body;

        if (req.file) {
            const photo = req.file.location;

            const existingDetail = await File.findById(req.params.id);
            if (!existingDetail) {
                return res.status(400).json({ message: 'Detail not found' });
            }

            // if new photo uploded then delete existing one
            const oldPhotoKey = existingDetail.photo.split('/').pop();
            await s3.send(new PutObjectCommand({
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: oldPhotoKey
            }));

            // updte new detils
            existingDetail.photo = photo;
            if (fullname) existingDetail.fullname = fullname;

            const updatedDetail = await existingDetail.save();
            res.status(200).json({ message: 'Detail updated successfully!', detail: updatedDetail });
        } else {
            res.status(400).json({ message: 'No file uploaded' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// Delete details
const deletedetils = async (req, res) => {
    try {
        const deletedetails = await File.findByIdAndDelete(req.params.id);
        if (!deletedetails) return res.status(400).json({ message: 'Details not found' });
        res.status(200).json({ message: 'Detail deleted successfully!' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
module.exports={
    addDetails,
    getdetails,
    detailsById,
    editDetils,
    deletedetils
}