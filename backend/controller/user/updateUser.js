const userModel = require('../../models/userModel')

async function updateUser(req, res){
    try {

        const { userId, email, firstName, role } = req.body;
        const sessionUser = req.userId

        const payload = {
            ...( email && {email : email}),
            ...( firstName && {firstName : firstName}),
            ...( role && {role : role})
        }

        const user = await userModel.findById(sessionUser)
        console.log('user.role', user.role)

        const updateUser = await userModel.findByIdAndUpdate(userId, payload)

        res.json({
            data : updateUser,
            message : 'User Updated',
            success : true,
            error : false
        })
    } catch (error) {
        res.status(400).json({
            message : error.message || error,
            error : true,
            success : false
        })

    }
}

module.exports = updateUser;