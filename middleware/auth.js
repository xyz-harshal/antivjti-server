export let auth = async(req,res,next)=>{
console.log("this is an auth middleware");
next();
}