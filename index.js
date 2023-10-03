// import library express js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());

app.use(bodyParser.json()) // for parsing app json

// create logger middleware function
function LoggerMiddleware(req, res, next) {
  console.log(`Request received at: ${new Date}()`);
  next();
}
// app.use(LoggerMiddleware);

// create handling http GET all customers
app.get('/api/customers', (req, res) =>{
  const {keyword, category, limit} = req.query; // request query string by keyword, category, limit
  res.status(200).json({
    code:200,
    message: 'get success',
    data: [
      {
        name: 'LeBron James',
        email: 'kingjames@code.com',
        role: 'Lakers'
      },
      {
        name: 'Trae Young',
        email: 'young@code.com',
        role: 'Hawks'
      }
    ],
    pagination: {
      total_record: 100,
      current_page: 1,
      total_page: limit,
    },
    search:{
      keyword: keyword,
      category: category
    }
  })
})

// create handling http POST for api customers
app.post('/api/customers', LoggerMiddleware, (req, res) => {
  console.log(req.body);
  const {name, email, role} = req.body;

  // res.send(`thankyou, ${name} with email: ${email} and role: ${role} we have received your submission`);
  res.status(201).json({
    message: "create data customer successfully",
    data: {
      name: name,
      email: email,
      role: role
    }
  })
})

// create handling http GET Detail customer
app.get('/api/customers/:id', (req, res) =>{
  const customerID = req.params.id; // request params by id customers
  res.status(200).json({
    message: 'get success',
    data: 
      {
        customerID: customerID,
        name: 'LeBron James',
        email: 'kingjames@code.com',
        role: 'Lakers'
      }
  })
})


// define listener port 3000
const port = 3000;
app.listen(port, () =>{
  console.log(`App is listening on port ${port}`);
})