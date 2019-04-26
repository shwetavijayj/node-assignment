const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
mongoose.connect('mongodb://localhost/personalBook');



var UserSchema = new mongoose.Schema({
    cname:{
        type: String,
        required: true,
        minlength: 5
    },
    contact:{
        type: Number,
        required: true,
        trim: true,
        minlength: 10,
    },
    email:{
        type: String,
        unique: true,
        required: true,
        trim: true,
        minlength: 1,
        validate:{
            validator: validator.isEmail,
            message: ' is not a valid email'
        }
    },
    password:{
        type: String,
        required: true,
        minlength: 6
    },
    dob:{
        type: Date,
        required: true
    },
    securityQuestion:{
        type: String
    },
    answer:{
        type: String
    },
    imagePath:{
        type:String
    },
    fileName:{
        type:String
    },
    tokens:[{
        access:{
            type: String,
            required: true
        },
        token:{
            type: String,
            required: true
        }
    }]
});



UserSchema.methods.generateAuthToken = function(){
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id:user._id.toHexString(), access},'abc123').toString();
    user.tokens.push({access, token});
    return user.save().then(()=>{
        return token;
    });
};

UserSchema.statics.findByToken = function(token){
    var User = this;
    var decoded;
    try{
        decoded = jwt.verify(token,'abc123');
    }catch(e){
        return Promise.reject();
    }

    return User.findOne({
        '_id': decoded._id,
        'tokens.token':token,
        'tokens.access':'auth'
    });

};


UserSchema.statics.findByCredentials = function (email, password) {
	var User = this;

	return User.findOne({
		email
	}).then((user) => {
		if (!user) {
			console.log("could not find user with email");
			return Promise.reject();
		}
       
		return new Promise((resolve, reject) => {
           
            if(password === user.password) {
				
					resolve(user);
				} else {
					reject();
				}
			
		});
	});
};

UserSchema.statics.findByEmail = function (email) {
	var User = this;

	return User.findOne({
		email
	}).then((user) => {
		if (!user) {
			console.log("could not find user with email");
			return Promise.reject();
		}
        else{
            return user;
        }
	});
};

UserSchema.statics.findByCredentials1 = function (email,securityQuestion,answer, password) {
	var User = this;

	return User.findOne({
		email
	}).then((user) => {
		if (!user) {
			console.log("could not find user with email");
			return Promise.reject();
		}

		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (err, res) => {
				if (!err) {
					console.log(res);
					resolve(user);
				} else {
					reject();
				}
			});
		});
	});
};


UserSchema.methods.removeToken = function (token) {
	var user = this;
    var user = this;

	return user.update({
		$pull: {
			tokens: {
				token
			}
		}
	});
	// delete user.tokens[user.tokens.length-1];
};



var Users = mongoose.model("Users", UserSchema);

module.exports = {
    Users
}

