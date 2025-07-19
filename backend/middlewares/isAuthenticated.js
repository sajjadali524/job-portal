import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];;
        if(!token) {
            return res.status(404).json({message: "Unauthorized user"})
        };

        const decode = jwt.verify(token, process.env.TOKEN_SECRET);
        if(!decode) {
            return res.status(401).json({message: "Invalid Token"})
        };

        req.user = decode.user;
        next();
    } catch (error) {
        console.log(error)
    }
};

export default isAuthenticated;
