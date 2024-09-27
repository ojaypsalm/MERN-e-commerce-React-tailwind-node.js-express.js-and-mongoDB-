const bcrypt = require('bcryptjs');
const userModel = require('../../models/userModel');
const jwt = require('jsonwebtoken')



async function userSignInController(req, res){
    try {
        const {email, password} = req.body;
        if(!email){
            throw new Error ('please provide an existing email')
        };
        if(!password){
            throw new Error ('please provide password')
        };
        const user = await userModel.findOne({email})
        if(!user){
            throw new Error("User not found!")
        }
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('isMatch', isMatch)
        if(!isMatch) {
                console.log("password does not match!!")
                return res.status(400).json({
                    message : "Invalid credentials",
                    error : true,
                    success : false
                });

            };
        
        if(isMatch){
            const tokenData = {
                _id : user._id,
                email : user.email
            }
            console.log('tokenData', tokenData)

            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: '1h' });
            const tokenOption = {
                httpOnly : true,
                secure : false
            }
            res.cookie('token', token, tokenOption).status(200).json({
                message : 'login successfully',
                data : token,
                success : true,
                error : false
            })
        }



        
    } catch (error) {
        console.log('Login error:', error)
        res.status(400).json({
            message : "An error occurred",
            error : true,
            success : false
        })
    }

}

module.exports = userSignInController;