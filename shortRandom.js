const characters = '0918467523abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

// function random(num) {
//     let result=''
//     for( let i = 0 ; i<num+1 ; i++){
//         result += (characters[Math.floor(Math.random() * characters.length)])
    
//     }
//     return result
// }
module.exports = (num) => {
    let result=''
    for( let i = 0 ; i<num ; i++){
        result += (characters[Math.floor(Math.random() * characters.length)])
    
    }
    return result
}


// 這邊要問問題!!!!