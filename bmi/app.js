const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/public', express.static(path.join(__dirname, 'public'), { 'extensions': ['css'] }));

app.get("/", (req, res) => {
  // Render the HTML file with the result embedded directly in it
  res.sendFile(__dirname + '/index.html', { result: '' });
});

app.post('/', (req, res) => {
    const weight = Number(req.body.weight);
    const height = Number(req.body.height);
  
    if (!isNaN(weight) && !isNaN(height)) {
      const bmi = (weight / (Math.pow(height / 100, 2))).toFixed(2);
      
      res.sendFile(__dirname + '/index.html', { result: `Your BMI is: ${bmi}` });
    } else {
      
      res.sendFile(__dirname + '/index.html', { result: 'Please enter valid weight and height.' });
    }
  });

app.listen(3000, () => {
  console.log("Server is active on port 3000...");
});
