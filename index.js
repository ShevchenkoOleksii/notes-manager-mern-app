const express = require('express');
const app = express();
const config = require('config');
const morgan = require('morgan');
const mongoose = require('mongoose');
const PORT = config.get('port') || 8080;
const mongoUri = config.get('mongoUri');
const authRouter = require('./routes/auth.router');
const userRouter = require('./routes/user.router');
const noteRouter = require('./routes/note.router');

app.use(express.json());
app.use(morgan('tiny'));

app.use('/api/auth', authRouter);
app.use('/api/users/me', userRouter);
app.use('/api/notes', noteRouter);

const start = async () => {
  try {
    await mongoose.connect(mongoUri);

    app.listen(PORT, () => {
      console.log(`Server is starting on port ${PORT}...`);
    });
  } catch (e) {
    console.log(`server error ${e.message}`);
    process.exit(1);
  }
};

start()
    .then()
    .catch((e) => console.log(e.message));


