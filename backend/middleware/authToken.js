const jwt = require('jsonwebtoken')

async function authToken(req, res, next){
    try {
        const token = req.cookies?.token || req.headers['authorization'];
        console.log('Received token:', token)

        if(!token){
            return res.status(401).json({
                success : false,
                error : true,
                message : 'You are not logged in!'
            });
        }
        jwt.verify(token, process.env.TOKEN_SECRET_KEY, function(err, decoded){
            console.log('decoded', decoded)
            console.log('err', err)

            if(err){
                return res.status(401).json({
                    success : false,
                    message : 'Invalid or expired Token'
                })
            }
            req.userId = decoded?._id

            next();

        });


        
    } catch (error) {
        return res.status(400).json({
            data : [],
            success : false,
            message : error.message || 'An unexpected error occurred',
            error : true
        })
        
    }
}

module.exports = authToken