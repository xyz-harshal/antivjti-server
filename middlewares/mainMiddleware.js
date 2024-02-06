export async function mainMiddleware(req,res,next){
    try{
        let key=req.headers['key']
        if(key!=process.env.KEY){
            res.status(401).json({msg:"user unauthorized"})
            return
        }
        else{
            next()
        }
    }
    catch(e){
        res.status(500).json({error: e.message})
    }
}