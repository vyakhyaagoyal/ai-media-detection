const multer=require('multer');
const {CloudinaryStorage}=require('multer-storage-cloudinary');
// const path=require('path');
// const cloudinary=require('../utils/cloudinary.js');
const cloudinary=require('../utils/cloudinary');
// console.log("Current directory:", __dirname);

//multer setup
// const storage=multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,'uploads/');
//     },
//     filename:(req,file,cb)=>{
//         cb(null,Date.now() + path.extname(file.originalname));
//     }
// });

//cloudinary storage setup
const storage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:'ai-media-detection(uploads)',
        allowed_formats:['jpg', 'png', 'jpeg', 'mp4', 'mov'],
        resource_type:'auto',
        public_id: (req, file) => {
            return Date.now() + '-' + file.originalname;
        },
    },
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
