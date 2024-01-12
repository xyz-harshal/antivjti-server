import  jwt  from "jsonwebtoken"
let jwtVerify = (data) => {
    return jwt.verify(data, process.env.SECRET)._id
}
export default jwtVerify