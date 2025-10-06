const mongoose = require("mongoose");

const initdata = require("./data.js");
const listing = require("../models/listing.js") 

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust"

main() .then(()=>console.log("connected to db"))
       .catch((err)=>{console.log(err)});


async function main() {
    await mongoose.connect(MONGO_URL);
    
}


const initDB = async ()=>{
    await listing.deleteMany({});
    initdata.data  =   initdata.data.map((obj) => ({...obj, owner : "682ec8d8a9e64924b5a33fb9"})) 
    await listing.insertMany(initdata.data)
    console.log("data was initialized")

}

initDB();