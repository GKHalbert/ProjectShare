/* User model */
'use strict';

const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// Making a Mongoose model a little differently: a Mongoose Schema
// Allows us to add additional functionality.
const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		minlength: 1,
		trim: true,
		unique: true,
	}, 
	password: {
		type: String,
		required: true,
		minlength: 1
	},
	type: {
		type: String,
		required: true,
		minlength: 4,
		maxlength: 5
	},
	profileImage:{
		type: String,
		required: false
	},
	firstName:{
		type: String,
		required: false
	},
	lastName:{
		type: String,
		required: false
	},
	school:{
		type: String,
		required: false
	},
	bio:{
		type: String,
		required: false
	},
	email:{
		type: String,
		required: false
	},
	phone:{
		type: String,
		required: false
	},
	projects:{
		type: Array,
		required: false
	}


})

// An example of Mongoose middleware.
// This function will run immediately prior to saving the document
// in the database.
UserSchema.pre('save', function(next) {
	const user = this; // binds this to User document instance

	// checks to ensure we don't hash password more than once
	if (user.isModified('password')) {
		// generate salt and hash the password
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash
				next()
			})
		})
	} else {
		next()
	}
})

// A static method on the document model.
// Allows us to find a User document by comparing the hashed password
//  to a given one, for example when logging in.
UserSchema.statics.findByUsernamePassword = function(username, password) {
	const User = this // binds this to the User model

	// First find the user by their username
	return User.findOne({ username: username }).then((user) => {
		if (!user) {
			console.log("did not find user in user DB")
			return Promise.reject()  // a rejected promise
		}
		// if the user exists, make sure their password is correct
		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (err, result) => {
				if (result) {
					resolve(user)
				} else {
					reject()
				}
			})
		})
	})
}

UserSchema.statics.findByUsername = function(username) {
	const User = this // binds this to the User model

	// First find the user by their username
	return User.findOne({ username: username }).then((user) => {
		if (!user) {
			console.log("did not find user in user DB")
			return Promise.reject()  // a rejected promise
		}
		// if the user exists, make sure their password is correct
		return new Promise((resolve, reject) => {
			resolve(user)
		})
	})
}

// make a model using the User schema
const User = mongoose.model('User', UserSchema)
module.exports = { User }

