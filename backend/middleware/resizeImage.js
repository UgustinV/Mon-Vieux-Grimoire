const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

module.exports = async (req, res, next) => {
    if (!req.file) return next();
    const folderName = path.join(__dirname, '../images');
    try {
        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName);
        }
    } catch (err) {
        console.error(err);
    }
    const name = req.file.originalname.split(' ').join('_');
    const filename = `${name}${Date.now()}.webp`;
    const outputPath = path.join(__dirname, '../images', filename);

    try {
        await sharp(req.file.buffer)
        .resize({ width: 404, height: 568 })
        .webp({ quality: 80 })
        .toFile(outputPath);

        req.file.filename = filename;
        next();
    } catch (err) {
        console.error('Erreur Sharp:', err);
        res.status(500).json({ message: 'Erreur lors du traitement de l’image.' });
    }
};