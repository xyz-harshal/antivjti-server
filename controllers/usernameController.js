export async function usernameController(req, res) {
    try{
        let username=req.user.username
        res.json({username})
    }
    catch(e){
        res.status(500).json({message:e.message})
    }
}