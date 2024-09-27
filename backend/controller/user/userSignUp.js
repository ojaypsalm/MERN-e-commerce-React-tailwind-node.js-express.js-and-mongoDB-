const bcrypt = require('bcryptjs');
const userModel = require('../../models/userModel')

async function userSignUpController(req, res){
    try {
        const { firstName, lastName, email, password} = req.body;
        console.log('req.body', req.body)
        if(!firstName){
            throw new Error ('please provide first name')
        };
        if(!lastName){
            throw new Error ('please provide last name')
        };
        if(!email){
            throw new Error ('please provide email')
        };
        if(!password){
            throw new Error ('please provide password')
        };
        

        //Hash a password
         const salt = await bcrypt.genSaltSync(10);
         const hashedPassword = await bcrypt.hash(password, salt);
         if(!hashedPassword){
            throw new Error('something is wrong')
         };
          // Check if the user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already exists' });
        }
         const payload = {
            ...req.body,
            role : "GENERAL",
            password: hashedPassword
         };
         const userData = new userModel(payload)
         const saveUser = await userData.save()
         res.status(201).json({
            data : saveUser,
            success : true,
            error : false,
            message : "User Created Successfully"
         })

    } catch (error) {
        res.json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

module.exports = userSignUpController;