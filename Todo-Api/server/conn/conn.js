const mongoose=require('mongoose');
const  conn =async(req,res)=>{
    try {
        await mongoose.connect("mongodb+srv://Pankaj:helloworld@cluster0.mskvocq.mongodb.net/").then(()=>{
    console.log("connected")
});

    } catch (error) {
        res.status(404).json({
            message:"not connected"
        });
    }
};
conn()