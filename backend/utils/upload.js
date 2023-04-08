const multer = require('multer');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/'); // specify the destination folder for uploads
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname); // specify a unique filename for the uploaded file
	},
});

module.exports.upload = multer({ storage });
