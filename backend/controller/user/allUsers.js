const userModel = require("../../models/userModel");

async function allUsers(req, res){
    try {
        console.log('userId allUsers', req.userId);
        
        const allUsers = await userModel.find()


        res.json({
            message : 'all users',
            error : false,
            success : true,
            data : allUsers

        })
    } catch (error) {
        res.status(400).json({
            message : err.message || error,
            error : true,
            success : false
        })
    }
}


module.exports = allUsers;