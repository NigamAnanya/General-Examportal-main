// import express, { Request, Response } from 'express';
// import mongoose, { Schema } from 'mongoose';
// import bcrypt from 'bcrypt';
// import cors from 'cors';
// import multer from 'multer';
// import bodyParser from 'body-parser';



// // Define TypeScript interface for User
// interface IUser {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
// }

// // Connect to MongoDB


// mongoose.connect('mongodb://basicdb:basicdb@ac-vf6pnoz-shard-00-00.cc0a8zq.mongodb.net:27017,ac-vf6pnoz-shard-00-01.cc0a8zq.mongodb.net:27017,ac-vf6pnoz-shard-00-02.cc0a8zq.mongodb.net:27017/?replicaSet=atlas-jdrkhe-shard-0&ssl=true&authSource=admin');

// console.log('DB connected');

// // Create a Mongoose schema for User
// const userSchema = new mongoose.Schema({
//   firstName: String,
//   lastName: String,
//   email: { type: String, unique: true },
//   password: String,
//   answers : Array,
// });

// interface IAnswer {
//   user: mongoose.Schema.Types.ObjectId; // Reference to the User who gave the answer
//   question: mongoose.Schema.Types.ObjectId; // Reference to the Question being answered
//   answerText: string; // The text of the answer
//   // createdAt: Date; // Timestamp for when the answer was created
// }

// // Create a Mongoose schema for Answer
// const answerSchema = new mongoose.Schema<IAnswer>({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
//   answerText: { type: String, required: true },
//   // createdAt: { type: Date, default: Date.now },
// });

// // Create a Mongoose model for Answer
// const Answer = mongoose.model<IAnswer>('Answer', answerSchema);


// // Create a Mongoose model
// const User = mongoose.model<IUser & mongoose.Document>('User', userSchema);

// // Update the Question schema to include questionImage as a Buffer
// const questionSchema = new mongoose.Schema({
//   questionText: String,
//   questionImage: { type: Buffer }, // Store the image as a Buffer
//   answer: String,
// });

// const Question = mongoose.model('Question', questionSchema);


// // Initialize Express
// const app = express();
// app.use(express.json());
// app.use(cors());

// app.use(bodyParser.json());

// // Multer setup for file uploads
// const upload = multer({
//   limits: {
//     fileSize: 10000000 // Limit file size to 10MB
//   },
//   fileFilter(req, file, cb) {
//     if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
//       return cb(new Error('Please upload an image file (jpg, jpeg, png)'));
//     }
//     cb(null, true);
//   }
// });

// // Signup Endpoint
// app.post('/signup', async (req: Request, res: Response) => {
//   try {
//     const { firstName, lastName, email, password, confirmPassword } = req.body;

//     if (password !== confirmPassword) {
//       return res.status(400).send('Passwords do not match');
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       firstName,
//       lastName,
//       email,
//       password: hashedPassword,
//     });

//     await newUser.save();
//     res.status(201).send('User created successfully');
//   } catch (error) {
//     res.status(500).send('Error creating user');
//   }
// });

// // Login Endpoint
// // Login Endpoint
// app.post('/login', async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).send('User not found');
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).send('Invalid credentials');
//     }

//     // Send back the user ID
//     res.status(200).json({ message: 'Login successful', userId: user._id });
//   } catch (error) {
//     res.status(500).send('Error during login');
//   }
// });


// // app.post('/save-answer', async (req: Request, res: Response) => {
// //   try {
// //     const { userId, questionId, answer } = req.body;

// //     const newAnswer = new Answer({
// //       user: userId,
// //       question: questionId,
// //       answerText: answer,
// //     });

// //     await newAnswer.save();
// //     res.status(200).send('Answer saved successfully');
// //   } catch (error) {
// //     console.error('Error saving answer', error);
// //     res.status(500).send('Error saving answer');
// //   }
// // });


// app.post('/save-answer', async (req, res) => {
//   try {
//     const { userId, questionId, answer } = req.body;

//     const existingAnswer = await Answer.findOne({ user: userId, question: questionId });

//     if (existingAnswer) {
//       existingAnswer.answerText = answer;
//       await existingAnswer.save();
//       res.status(200).send('Answer updated successfully');
//     } else {
//       const newAnswer = new Answer({
//         user: userId,
//         question: questionId,
//         answerText: answer,
//       });

//       await newAnswer.save();
//       res.status(200).send('Answer saved successfully');
//     }
//   } catch (error) {
//     console.error('Error saving/updating answer', error);
//     res.status(500).send('Error saving/updating answer');
//   }
// });

// app.get('/get-answers',async (req:Request, res:Response) => {
//   try{
//     const answers = await Answer.find({});
//     console.log(answers)
//     res.status(200).json(answers);
//   }
//   catch(error)
//   {
//     res.status(500).send('Error retireving answers');
//   }
// })

// // Add a Question Endpoint with image upload
// app.post('/add-question', upload.single('questionImage'), async (req: Request, res: Response) => {
//   try {
//     const { questionText, answer } = req.body;
//     const questionImage = req.file?.buffer;

//     const newQuestion = new Question({
//       questionText,
//       questionImage,
//       answer,
//     });

//     await newQuestion.save();
//     res.status(201).send('Question added successfully');
//   } catch (error) {
//     res.status(500).send('Error adding question');
//   }
// }, (error: any, req: any, res: any) => {
//   res.status(400).send({ error: error.message });
// });

// // Get Questions Endpoint
// app.get('/get-questions', async (req: Request, res: Response) => {
//   try {
//     const questions = await Question.find({});
//     res.status(200).json(questions);
//   } catch (error) {
//     res.status(500).send('Error retrieving questions');
//   }
// });

// app.get('/get-users', async (req: Request, res: Response) => {
//   try {
//     const users = await User.find({});
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).send('Error retrieving users');
//   }
// });

// // Get Answers for a Question Endpoint



// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });



import express, { Request, Response } from 'express';
import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import cors from 'cors';
import multer from 'multer';
import bodyParser from 'body-parser';



// Define TypeScript interface for User
interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// Connect to MongoDB


mongoose.connect('mongodb://pagedb:pagedb@ac-twj1unz-shard-00-00.pmstbgi.mongodb.net:27017,ac-twj1unz-shard-00-01.pmstbgi.mongodb.net:27017,ac-twj1unz-shard-00-02.pmstbgi.mongodb.net:27017/?replicaSet=atlas-uposre-shard-0&ssl=true&authSource=admin');

console.log('DB connected');

// Create a Mongoose schema for User
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  answers: Array,
});

interface IAnswer {
  user: mongoose.Schema.Types.ObjectId; // Reference to the User who gave the answer
  question: mongoose.Schema.Types.ObjectId; // Reference to the Question being answered
  answerText: string; // The text of the answer
  // createdAt: Date; // Timestamp for when the answer was created
}

// Create a Mongoose schema for Answer
const answerSchema = new mongoose.Schema<IAnswer>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
  answerText: { type: String, required: true },
  // createdAt: { type: Date, default: Date.now },
});

// Create a Mongoose model for Answer
const Answer = mongoose.model<IAnswer>('Answer', answerSchema);


// Create a Mongoose model
const User = mongoose.model<IUser & mongoose.Document>('User', userSchema);

// Update the Question schema to include questionImage as a Buffer
const questionSchema = new mongoose.Schema({
  questionText: String,
  questionImage: { type: Buffer }, // Store the image as a Buffer
  answer: String,
});

const Question = mongoose.model('Question', questionSchema);


// Initialize Express
const app = express();
app.use(express.json());
app.use(cors());

app.use(bodyParser.json());

// Multer setup for file uploads
const upload = multer({
  limits: {
    fileSize: 10000000 // Limit file size to 10MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload an image file (jpg, jpeg, png)'));
    }
    cb(null, true);
  }
});

// Signup Endpoint
app.post('/signup', async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).send('Passwords do not match');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).send('User created successfully');
  } catch (error) {
    res.status(500).send('Error creating user');
  }
});

// Login Endpoint
// Login Endpoint
app.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid credentials');
    }

    // Send back the user ID
    res.status(200).json({ message: 'Login successful', userId: user._id });
  } catch (error) {
    res.status(500).send('Error during login');
  }
});


app.post('/save-answer', async (req, res) => {
  try {
    const { userId, questionId, answer } = req.body;

    const existingAnswer = await Answer.findOne({ user: userId, question: questionId });

    if (existingAnswer) {
      existingAnswer.answerText = answer;
      await existingAnswer.save();
      res.status(200).send('Answer updated successfully');
    } else {
      const newAnswer = new Answer({
        user: userId,
        question: questionId,
        answerText: answer,
      });

      await newAnswer.save();
      res.status(200).send('Answer saved successfully');
    }
  } catch (error) {
    console.error('Error saving/updating answer', error);
    res.status(500).send('Error saving/updating answer');
  }
});

app.get('/get-answers', async (req: Request, res: Response) => {
  try {
    const answers = await Answer.find({});
    console.log(answers)
    res.status(200).json(answers);
  }
  catch (error) {
    res.status(500).send('Error retireving answers');
  }
})

// Add a Question Endpoint with image upload
app.post('/add-question', upload.single('questionImage'), async (req: Request, res: Response) => {
  try {
    const { questionText, answer } = req.body;
    const questionImage = req.file?.buffer;

    const newQuestion = new Question({
      questionText,
      questionImage,
      answer,
    });

    await newQuestion.save();
    res.status(201).send('Question added successfully');
  } catch (error) {
    res.status(500).send('Error adding question');
  }
}, (error: any, req: any, res: any) => {
  res.status(400).send({ error: error.message });
});

// Get Questions Endpoint
app.get('/get-questions', async (req: Request, res: Response) => {
  try {
    const questions = await Question.find({});
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).send('Error retrieving questions');
  }
});

app.get('/get-users', async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send('Error retrieving users');
  }
});

// Get Answers for a Question Endpoint



// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




