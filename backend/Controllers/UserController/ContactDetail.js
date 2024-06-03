const user = require('../../models/UserSchema');

const ContactDetail = async (req,res) => {
    try {
        const {  userid, item} = req.body;
        const userInfo = await user.findById(userid);
        if (!userInfo) {
           return res.status(500).json({
                message:"user id not found",error
            })
        }
        const existingAdd = userInfo.contact.map(contact => contact);
        if (existingAdd[0]) { 
            return res.status(300).json({ message: "address already saved in database" });
        }
        userInfo.contact.push(item);
        await userInfo.save();
        
        res.status(200).json({ message:"address saved successfully"})
    }
    catch(err){
        console.log("error in pickup data", err.message);
        res.status(500).json({ message : err.message });
    }
}

module.exports = ContactDetail;