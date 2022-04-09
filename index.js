const express = require('express');
const app = express();
const config = require('config');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const PORT = process.env.PORT || config.get('port') || 8080;
const mongoUri = config.get('mongoUri');
const authRouter = require('./routes/auth.router');
const userRouter = require('./routes/user.router');
const noteRouter = require('./routes/note.router');

app.use(express.json({extended: true}))
// app.use(express.json());
app.use(morgan('tiny'));

app.use('/api/auth', authRouter);
app.use('/api/users/me', userRouter);
app.use('/api/notes', noteRouter);

app.use('/', express.static(path.join(__dirname, "/client/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});

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


