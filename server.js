const express = require('express');
const res = require('express/lib/response');
const apiRouter = require('./router')


const app = express()

app.use(express.json())
app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if(req.method === 'OPTIONS'){
        res.header("Access-Control-Allow-Methods","GET, POST")
        return res.status(200).json({});
    }
    next();
});



app.use('',apiRouter)


app.listen(process.env.PORT || 3000 , () => {
    console.log("SERVER IS RUNNİNG")
}) 