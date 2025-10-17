const mongoose = require("mongoose");

const initdata = require("./data.js");
const listing = require("../models/listing.js") 

const MONGO_URL = process.env.ATLASDB_URL;
main() .then(()=>console.log("connected to db"))
       .catch((err)=>{console.log(err)});


async function main() {
    await mongoose.connect(MONGO_URL);
    
}


const initDB = async ()=>{
    await listing.deleteMany({});
    
    
}

initDB();
