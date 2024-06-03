const user = require('../../models/UserSchema');

const DeleteAdd = async (req, res) => {
    try {
        const { userid} = req.body;
        const userInfo = await user.findById(userid);
        if (!userInfo) {
            return res.status(500).json({
                message: "user id not found", error
            })
        }  
        userInfo.contact = userInfo.contact.filter(item => item._id.toString() === userid);
        console.log(userInfo.contact);

        await userInfo.save();
        
    }
    catch (Error) {
        console.log("error in pickup data", Error);
    }
}

module.exports = DeleteAdd;