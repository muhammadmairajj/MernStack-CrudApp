const express = require('express');
const cors = require('cors');
const employeeRoutes = require('./routes/employee.route');

const app = express();
const PORT = 8000;

// DataBase:

// MiddleWare
app.use(cors());
app.use(express.json());

// define root route
app.get('/', (req, res)=>{
    res.send('Hello World');
});
 
// create employee routes
app.use('/api/v1/employee', employeeRoutes);


app.listen(PORT, () => {
    console.log(`Server is running at ${PORT} `);
});
