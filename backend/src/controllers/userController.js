const Customer = require("../models/customer");
const mongoose = require("mongoose");
const ErrorHander = require('../utils/errorHandler')
const sendToken = require('../utils/jwtToken');
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
//Register a User
exports.register = catchAsyncErrors(async (req, res) => {
    const { firstName, lastName, tel, email, password, gender, howDidYouHear, city, state } = req.body;
    const user = await Customer.create({
        firstName,
        lastName,
        password,
        tel,
        email,
        gender,
        howDidYouHear,
        city,
        state
    });
    sendToken(user, 201, res);
});


//Login a User
exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    // checking if user has given password and email both

    if (!email || !password) {
        return next(new ErrorHander("Please Enter Email & Password", 400));
    }

    const user = await Customer.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHander("Invalid email or password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHander("Invalid email or password", 401));
    }

    sendToken(user, 200, res);
};

//Logout A User
exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
});

//Delete a User
exports.deleteUser = async (req, res, next) => {
    const userToBeDeleted = Customer.findById(req.params.id);
    if (!userToBeDeleted) {
        return next(
            new ErrorHander(`User does not exist with Id: ${req.params.id}`, 400)
        );
    }
    await userToBeDeleted.deleteOne();
    res.status(200).json({
        success: true,
        message: "User Deleted Successfully",
    });
}

//Get All Users
// Get all users(admin)
exports.getAllUser = async (req, res, next) => {
    const users = await Customer.find();

    res.status(200).json({
        success: true,
        users,
    });
};

//Update User Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        tel: req.body.tel,
        email: req.body.email

    };

    const user = await Customer.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
    });
});

exports.checkRegistration = async (req, res) => {
    try {
        const { email, tel } = req.body;

        // Check if email is already registered
        const emailExists = await Customer.exists({ email });

        // Check if mobile number (tel) is already registered
        const telExists = await Customer.exists({ tel });

        res.json({
            success: true,
            emailExists,
            telExists,
        });
    } catch (error) {
        console.error(error);

        if (error.code === 11000 && error.keyPattern.tel === 1) {
            // Duplicate key error for tel field
            res.status(400).json({
                success: false,
                message: 'Mobile number is already registered. Please use a different number.',
            });
        } else {
            // Other errors
            res.status(500).json({
                success: false,
                message: 'Internal Server Error',
            });
        }
    }
};

//update any user
exports.updateUser = catchAsyncErrors(async (req, res, next) => {


    const updatedUserData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        tel: req.body.tel,
        email: req.body.email,
        gender: req.body.gender,
        city: req.body.city,
        state: req.body.state
    };

    const user = await Customer.findByIdAndUpdate(req.params.id, updatedUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        user
    });
});

//get user by id
// exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
//     const user = await Customer.findById(req.user.id);

//     res.status(200).json({
//         success: true,
//         user,
//     });
// });

exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await Customer.findById(req.user.id);

    res.status(200).json({
        success: true,
        user,
    });
});

exports.searchUser = catchAsyncErrors(async (req, res, next) => {
    let users = await Customer.find({
        "$or": [
            {
                firstName: { $regex: req.params.key, $options: 'i' }
            },
            {
                lastName: { $regex: req.params.key, $options: 'i' }
            },
            {
                tel: { $regex: req.params.key, $options: 'i' }
            },
        ]
    });
    res.status(200).json({
        users,
    });
})
