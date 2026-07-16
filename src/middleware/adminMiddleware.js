const adminOnly = (req,res,next)=>{

    if(req.user.roleId !== "1"){

        return res.status(403).json({
            success:false,
            message:"Only Admin can perform this action"
        });

    }

    next();

}

module.exports = adminOnly;