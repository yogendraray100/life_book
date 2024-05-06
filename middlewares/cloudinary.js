const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'dtgeckjmr', 
    api_key: '836833412468214', 
    api_secret: 'TOjtPhY-Drb6_AOVKPYfQzkE3Zw' 
  });

module.exports = cloudinary;