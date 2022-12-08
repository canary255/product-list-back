const express = require('express');
const fs = require('fs');
const cors = require('cors');
const formRouter = require("./routes/form.routes");
const app = express();
const PORT = 4153;

app.use(express.json({ limit: '100mb' }));
app.use(cors());

//////////////////////////////////////////////////////
//                     ROUTING                      //
//////////////////////////////////////////////////////
app.use(formRouter);
app.use('/images' ,express.static(__dirname + '/images'))
  

//////////////////////////////////////////////////////
//                 CREATING JSON DB                 //
//////////////////////////////////////////////////////
const dbFile = './data.json';
if (!fs.existsSync(dbFile)) {
    fs.writeFileSync(dbFile, JSON.stringify([]));
    
}
  
app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT);
    else 
        console.log("Error occurred, server can't start", error);
    }
);