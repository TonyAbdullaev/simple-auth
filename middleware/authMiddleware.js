const jwt = require("jsonwebtoken");
const {SECRET_KEY} =  process.env

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const token = req.header.authorization.split(' ')[1]
        if (!token) {
            return res.status(403).json({message: 'Unauthorized user!'})
        }
        const decodeDate = jwt.verify(token, SECRET_KEY)
        req.user = decodeDate;
        next()
    } catch (e) {
        console.log(e)
        return res.status(403).json({message: 'Unauthorized user!'})
    }
}