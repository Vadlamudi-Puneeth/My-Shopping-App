const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_DB_URL, {
    dbName: "dummy-shopping-app-v1",
}).then(()=>{
    console.log("DB connected successfully");
}).catch((err)=>{
    console.log("DB connected failes")
})
