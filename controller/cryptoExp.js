const {SHA256} = require('crypto-js');
var jwt = require('jsonwebtoken');

var data={
    id:10
};
var token= jwt.sign(data, '123abc');
console.log('Tokens: ',token);

var decode= jwt.verify(token, '123abc');
console.log('decoded',decode);

// var message = 'This is my computer.';
// var hash = SHA256(message).toString();

// console.log('Message:',message);
// console.log('Hash:',hash);

// var data ={id:4};
// var token ={
//     data,
//     hash: SHA256(JSON.stringify(data)+'somesecret').toString()
// }
// var result = SHA256(JSON.stringify(token.data)+'somesecret').toString();

// if(token.hash === result){
//     console.log('Same');
// }else{
//     console.log('not same');
// }