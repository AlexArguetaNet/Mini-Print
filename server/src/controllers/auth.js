import { UserModel } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// POST: Create new account
export const signUp = async (req, res) => {

    const { email, username, password } = req.body;

    try {

        // Handle blank input
        if (email === "" || username === "" || password === "") {
            return res.json({ error: "Sign up error", msg: "Please fill out the entire form" });
        }

        // Check if email is taken
        const emailTaken = await UserModel.findOne({ email });
        if (emailTaken) return res.json({ error: "Sign up error", msg: "Email already associated with an account" });

        // Check if username is taken
        const usernameTaken = await UserModel.findOne({ username });
        if (usernameTaken) return res.json({ error: "Sign up error", msg: "Username is unavailable" });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new UserModel, then add to db
        const newUser = new UserModel({ email, username, password: hashedPassword });
        newUser.save();

        res.json({ msg: "New account created!" });

    } catch (err) {
        res.status(500);
        res.json({ error: "Registration error", msg: err });
    }

}

// POST: PRocess login request
export const login = async (req, res) => {

    const { email, password } = req.body;

    try {

        // Handle empty input
        if (email === "" || password === "") {
            return res.json({ error: "Login error", msg: "Please enter an email and password" });
        }

        // Check if user exists
        const user = await UserModel.findOne({ email });
        if (!user) return res.json({ error: "Login error", msg: "Email or password is invalid" });


        // Validate password
        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword) return res.json({ error: "Login error", msg: "Email or password is invalid" });

        // Create session token
        const token = jwt.sign({ id: user._id }, process.env.SECRET);

        // Return token and user id
        res.json({ token, userId: user._id });

    } catch (err) {
        res.status(500);
        res.json({ error: "Login error", msg: err });
    }

}