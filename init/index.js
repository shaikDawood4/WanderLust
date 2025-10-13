const mongoose = require("mongoose");

const initdata = require("./data.js");
const listing = require("../models/listing.js") 

const MONGO_URL = "mongodb+srv://4dawoodshaik:dawoodshaik4@cluster0.re4l6cl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

main() .then(()=>console.log("connected to db"))
       .catch((err)=>{console.log(err)});


async function main() {
    await mongoose.connect(MONGO_URL);
    
}


const initDB = async ()=>{
    await listing.deleteMany({});
   

}

initDB();