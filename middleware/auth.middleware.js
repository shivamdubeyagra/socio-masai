// const jwt = require("jsonwebtoken");
// const auth = async(req,res,next) =>{
//     const token = req.headers.auth.split(" ")[1];
//     try{
//         const verified = jwt.verify(token,'shivamdubey')
//         console.log(verified.userId);
//     }catch(error){
//         res.send("somtheing auth error");
//     }
// }

// module.exports = {auth};