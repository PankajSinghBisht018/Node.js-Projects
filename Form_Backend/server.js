import express from 'express';

const app = express();
const port = process.env.PORT || 3000;


const passwordCheck = (req, res, next) => {
  const { password } = req.body;
  if (password === 'pankaj') { 
    next(); 
  } else {
    res.send(' You Entered Incorrect password'); 
  }
};

app.use(express.static('public'));

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.sendFile(__dirname,'public/index.html'); 
});

app.post('/login', passwordCheck, (req, res) => {
  res.redirect('https://getbootstrap.com/');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
