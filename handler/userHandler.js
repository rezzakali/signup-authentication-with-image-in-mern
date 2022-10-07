// external imports
import bcrypt from 'bcrypt';
import express from 'express';
import multer from 'multer';
import path from 'path';

// internal imports
import authentication from '../middleware/authentication.js';
import User from '../models/userSchema.js';

const router = express.Router();

const uploadFile = './public/Uploads/';

// storage for image
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFile);
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const fileName = `${file.originalname
      .replace(fileExt, '')
      .toLowerCase()
      .split(' ')
      .join('-')}-${Date.now()}`;
    cb(null, fileName + fileExt);
  },
});

// uploader [multer]
const upload = multer({
  storage,
  limits: {
    fileSize: 1000000, // 1MB
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/jpg'
    ) {
      cb(null, true);
    } else {
      cb(new Error('Only .jpg , .png or .jpeg format allowed!'));
    }
  },
});

// Register router
router.post('/register', upload.any('avatar'), async (req, res) => {
  try {
    const avatar = req.files ? req.files[0].filename : '';
    console.log(avatar);
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const password = req.body.password;

    const newUser = new User({
      name,
      email,
      phone,
      password,
      avatar,
    });
    await newUser.save();
    console.log(newUser);
    res.status(200).send('User created successfully!');
  } catch (error) {
    console.log(error);
    res.status(500).send('There was a server side error!');
  }
});

// Login router
router.post('/login', async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ email: email });
    if (user) {
      const isMatchPassword = await bcrypt.compare(password, user.password);
      if (isMatchPassword) {
        const token = await user.generateToken();
        res.cookie('jwt', token, {
          expires: new Date(Date.now() + 86400000),
          httpOnly: false, //accessible only by web server
          secure: true, // https
          sameSite: 'None', //cross-site cookie
        });

        res.status(200).json(user);
      } else {
        res.status(400).send('Invalid user details');
      }
    } else {
      res.status(401).send('Unauthorized user!');
    }
  } catch (error) {
    res.status(500).send('There was a server side error!');
  }
});
// get user
router.get('/userinfo', async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ result: users });
  } catch (error) {
    res.status(500).json({ error: 'There was a server side error!' });
  }
});
// Logout router
router.get('/logout', async (req, res) => {
  try {
    res.clearCookie('jwt', {
      httpOnly: false,
      sameSite: 'None',
      secure: true,
    });
    res.status(200).send('Cleared cookie');
  } catch (error) {
    res.status(500).send('There was a server side error!');
  }
});

router.get('/auth', authentication, (req, res) => {
  res.status(200).send('Success');
});

// post router
router.post('/post', upload.single('postImage'), async (req, res) => {
  const postImage = req.file ? req.file.filename : null;
  const { title, description } = req.body;

  const newPost = new Post({
    title: title,
    description: description,
    image: postImage,
    user: req.userId,
  });

  try {
    const post = await newPost.save();
    await User.updateOne(
      {
        _id: req.userId,
      },

      {
        $push: {
          posts: post._id,
        },
      }
    );
    res.status(200).json({ result: 'posted successfully!' });
  } catch (error) {
    res.status(500).send('There was a server side error!');
  }
});

// get post
router.get('/posts', async (req, res) => {
  try {
    const result = await Post.find({});
    res.status(200).json({ result: result });
  } catch (error) {
    res.status(500).json({ error: 'There was a server side error!' });
  }
});

// get post by id
router.get('/posts/:id', async (req, res) => {
  try {
    const result = await Post.findById({ _id: req.params.id });
    res.status(200).json({ result: result });
  } catch (error) {
    res.status(500).json({ error: 'There was a server side error!' });
  }
});

export default router;
