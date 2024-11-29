import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        return res.status(200).json({ users });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
export const SignUp = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(401).json({ message: "User Already Exist" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        return res.status(201).json({ user, message: "SignedUp successfully" });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
export const Login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not Registered" });
        }
        const isPassworCorrect = await bcrypt.compare(password, user.password);
        if (!isPassworCorrect) {
            return res.status(400).json({ Message: "Incorrect Password!" });
        }
        return res.status(201).json({ user, message: "SignedUp Successfully" });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
//# sourceMappingURL=UserHandler.js.map