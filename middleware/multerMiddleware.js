import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Setting destination for uploaded files.
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname;
        cb(null, fileName)
    }
});

const upload = multer({ storage });

export default upload;