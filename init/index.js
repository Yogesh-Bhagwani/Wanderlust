const mongoose = require("mongoose");
const initData = require("./data.js"); // "./" likne ka matlab data.js same directory m hai ager ye nhi likhnge to isse node_modules baki files ke sath dondega .
const Listing = require("../models/listing.js");

main()
    .then((res)=>{
        console.log("connection successful");
    })
    .catch((err) => {
        console.log(err)
    });


async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}


const initDB = async ()=>{
    await Listing.deleteMany({});
    initData.data  = initData.data.map((obj) => ({...obj, owner : '685231047f820214f38dc74c'}));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
}

initDB();