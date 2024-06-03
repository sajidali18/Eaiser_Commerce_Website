const User = require('../../models/UserSchema');

const GetUserbyid = async (req, res) => {
    try {
        const { userid } = req.params; // Or req.params if you're sending it as a route parameter
        const userInfo = await User.findById(userid);
        if (!userInfo) return res.status(404).json({ message: "No user found" });
        res.json(userInfo);
    } catch (err) {
        console.error(`Error in rendering: ${err}`);
        res.status(500).json({ message: "Internal server error", error: err });
    }
};

module.exports = GetUserbyid;
