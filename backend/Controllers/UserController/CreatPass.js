const { Message } = require('twilio/lib/twiml/MessagingResponse');
const user = require('../../models/UserSchema');

const bcrypt = require('bcrypt')


const isvalid = (passward) => {
    const passwardReg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwardReg.test(passward);
}

const hashPassward = async (passward) => {
    const saltRound = 10;
    return await bcrypt.hash(passward, saltRound);
}

const UpdatePass = async (req, res) => {
    try {
        const { create_passward, confirm_passward } = req.body;
        if (create_passward !== confirm_passward)
            return res.status(404).json({ message: "passward does not match, plz try again" });

        const email = req.session.email;
        if (!isvalid(create_passward))
            return res.status(400).json({ message: "passward must be strong" });
        
        if (!isvalid(confirm_passward))
            return res.status(400).json({ message: "passward must be strong" });
       
        const hashedPassword = await hashPassward(create_passward);

        const updateuser = await user.findOne({ email });
        if (updateuser) {
            updateuser.passward = hashedPassword;
            await updateuser.save();
            res.status(200).json({ message: "passward changed successfully" });
        }            
    }
    catch (err) {
        console.error("Error", err);
        res.status(500).json({ message: "internal server error", error:err.message });
    }
}

module.exports = UpdatePass;