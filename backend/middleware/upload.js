const multer=require('multer');
const path=require('path');

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/');
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now() + path.extname(file.originalname));
    }
});

const fileFilter=(req,file,cb)=>{
    if(file.mimetype.startsWith('image') ||file.mimetype.startsWith('video')) {
        cb(null,true);
    }
    else{
        cb(new Error('Not a valid file type!'),false);
    }
};

const upload = multer({ storage, fileFilter});
    //  limits: { fileSize: 100 * 1024 * 1024 }.single('media');
module.exports = upload;
