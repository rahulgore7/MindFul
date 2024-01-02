const express = require('express');
const { register, login, deleteUser, getAllUser, updateProfile, logout, checkRegistration, updateUser, getUserDetails, searchUser } = require('../controllers/userController');
const router = express.Router();
const { isAuthenticatedUser } = require('../middleware/auth')

// router.get('/', homepage);
// router.get('/about', customerController.about);
// router.get('/add', customerController.addCustomer);
router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/allUsers', getAllUser);
router.put('/update', updateProfile);
router.post('/checkRegistration', checkRegistration);
// router.get('/view/:id', customerController.view);
// router.get('/edit/:id', customerController.edit);
// router.put('/edit/:id', customerController.editPost);
router.delete('/edit/:id', deleteUser);
router.put('/updates/:id', updateUser);
router.get('/me', isAuthenticatedUser, (req, res) => {
    res.json({ user: req.user });
});

router.get('/search/:key', searchUser);
// router.get('/getUser/:id', getUserDetails);

// router.post('/search', customerController.searchCustomers);


module.exports = router;
