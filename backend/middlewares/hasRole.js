const hasRole = (roles) => (req, res, next) => {
    if(!roles.includes(req.user.role)) {
        return res.status(400).json({message: "Access Denied! Insuffecient Permission"})
    };
    next();
}

export default hasRole;