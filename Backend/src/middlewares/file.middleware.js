const multer = require("multer")


const upload = multer({                              // middleware 
    storage: multer.memoryStorage(),           // temporary storage to load resume pdf 
    limits: {
        fileSize: 3 * 1024 * 1024    // allow max size of a file is 3 MB   
    }
})

module.exports = upload