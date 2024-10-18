const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    try {
        //get the token
        const token = req.headers.authorization.split(" ")[1];

        //Verify the token
        const verifyToken = jwt.verify(token, process.env.JWT_KEY);

        //Getting the user out of token and sending to the main route
        req.body.userId = verifyToken.userId;

        next();
    } catch (error) {
        res.status(401).send({ success: false, message: "Token is not valid" });
    }
};
