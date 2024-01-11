let revArray=(data)=>{
    let revArr=[]
    for(let i=data.length-1;i>=0;i--){
        revArr[revArr.length]=data[i] 
    }
    return (revArr)
}
export default revArray