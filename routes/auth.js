const express = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const auth = require("../middlewares/auth");
const cloudinary = require('cloudinary').v2;
const fs = require("fs");
const multer  = require('multer')
const { v4:uuidv4 } = require('uuid') ;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
   const random = uuidv4()
    cb(null, random+""+file.originalname)
  }
})

const upload = multer({ storage: storage })
require('../index')
//const Image = mongoose.model('Image', {Image_Url: String});


// SIGN UP
authRouter.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "User with same email already exists!" });
    }

    const hashedPassword = await bcryptjs.hash(password, 8);

    let user = new User({
      email,
      password: hashedPassword,
      name,
    });
    user = await user.save();
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Sign In Route
// Exercise
authRouter.post("/api/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "User with this email does not exist!" });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Incorrect password." });
    }

    const token = jwt.sign({ id: user._id }, "passwordKey");
    res.json({ token, ...user._doc });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

authRouter.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);
    const verified = jwt.verify(token, "passwordKey");
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);
    res.json(true);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// get user data
authRouter.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({ ...user._doc, token: req.token });
});

//user profile edit & update
cloudinary.config({ 
  cloud_name: 'dtgeckjmr', 
  api_key: '836833412468214', 
  api_secret: 'TOjtPhY-Drb6_AOVKPYfQzkE3Zw' 
});

authRouter.post("/upload",upload.single('myfile'),async (req,res) => {

 const x = await cloudinary.uploader.upload(req.file.path);

const newvar = new Image({Image_Url: x.secure_url})
newvar.save().then(() => console.log("done"));

 fs.unlink((req.file.path),
 function(err){
     if (err) console.log(err);
     else {
         console.log("\nDeleted file");

         
     }
 });

  res.json({
  msg:'file uploaded',
  your_url:{image_url: x.secure_url}
  })
})


authRouter.put("/api/update/:userId",upload.single('myfile'), async (req, res) => {
  const { userId }= req.params;
  const {name , email, password, gender, phone } = req.body;
  

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    
    user.name = name;
    user.email = email;
    user.gender = gender;
    user.phone = phone;

    if (password) {
      // Hash the new password if provided
      const hashedPassword = await bcryptjs.hash(password, 8);
      user.password = hashedPassword;
    }

    if (req.file) {
      const x = await cloudinary.uploader.upload(req.file.path);

      user.profileImage = x.secure_url;

      const previousPublicId = extractPublicId(user.profileImage);

      if (previousPublicId) {
        await cloudinary.uploader.destroy(previousPublicId);
      }
      
      fs.unlinkSync(req.file.path); 
    }

    const updatedUser = await user.save();
    res.json(updatedUser);   
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = authRouter;
