const jwt = require("jsonwebtoken");
const {SECRET_KEY} =  process.env

module.exports = function (roles) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }
        try {
            console.log("FUCK U:", req.header.authorization)
            const token = req.header.authorization.split(' ')[1]
            if (!token) {
                return res.status(403).json({message: 'Unauthorized user!'})
            }
            const {roles: userRoles} = jwt.verify(token, SECRET_KEY)
            let hashRole = false;
            userRoles.forEach(role => {
                if (roles.includes(role)) {
                    hashRole = true
                }
            })
            if (!hashRole) {
                return res.status(403).json({message: "Don't have a permission"})
            }
            next()
        } catch (e) {
            console.log(e)
            return res.status(403).json({message: 'Unauthorized user!'})
        }
    }
}