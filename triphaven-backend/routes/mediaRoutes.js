const express = require('express')
const multer = require('multer')
const { uploadMediaToCloudinary, deleteMediaFromCloudinary } = require('../helpers-with-media/cloudinary')

const router = express.Router()

const upload = multer({ dest: 'uploads/' })

router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const result = await uploadMediaToCloudinary(req.file.path)
        res.status(200).json({
            success: true,
            data: result
        })
    } catch (error) {
        console.log('Media upload error :', error)
        res.status(500).json({ success: false, message: 'Error uploading file.' })
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ success: false, message: 'Asses id is required.' });
        }

        await deleteMediaFromCloudinary(id);

        res.status(200).json({
            success: true,
            message: 'Asset deleted from cloudinary.'
        })

    } catch (error) {
        console.log("error :", error);
        res.status(500).json({ success: false, message: "Error deleting file." })
    }
})

module.exports = router