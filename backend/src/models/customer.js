const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;
const CustomerSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    tel: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        validate: validator.default.isEmail,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [8, "Password should be greater than 8 characters"],
    },
    gender: {
        type: String,  // Specify the type for the gender field
        enum: ['Male', 'Female', 'Other'],  // Allow only these values
        required: true
    },
    howDidYouHear: {
        type: String,
        enum: ['LinkedIn', 'jobPortal', 'Other'],
        required: true
    },
    state: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});


CustomerSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
});


//JWT TOKEN
CustomerSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

//Compare Password
CustomerSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};



module.exports = mongoose.model('Customer', CustomerSchema);