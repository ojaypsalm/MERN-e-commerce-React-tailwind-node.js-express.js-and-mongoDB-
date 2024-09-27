const userModel = require("../../models/userModel");

async function userDetailsController(req, res) {
    try {
        console.log('userId', req.userId)
        const user = await userModel.findById(req.userId);
        console.log('user', user)
        if(!user) {
            return res.status(404).json({
                success : false,
                message : 'User not found',
                error : true
            })
        }
        res.status(200).json({
            success : true,
            message : 'User details fetched successfully',
            data : user,
            error : false
        });

    }catch(error){
        console.error('Error in userDetailsController:', error)
        return res.status(500).json({
            success : false,
            message : error.message || 'An unexpected error occurred!',
            error : true
        })
    }
}
module.exports = userDetailsController;