const mongoose = require('mongoose')
const dbString = require('./config').dbUrl + 'Plays';
const rdyString = `${'*'.repeat(5)}Database is READY!${'*'.repeat(5)}`;


module.exports=()=>{
    return mongoose.connect(dbString,{
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify:false

    },
     console.log(rdyString)
    );
};