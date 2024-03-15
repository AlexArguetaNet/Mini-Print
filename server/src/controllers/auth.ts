import { Request, Response } from "express";
import { UserModel } from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// POST: Create a new user account
export const signUp = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {

    const { username, email, password } = req.body;

    try {

        // Check if username is available
        const usernameResult = await UserModel.findOne({ username });
        if (usernameResult) return res.json({ error: "Sign up error", msg: "Username unavailable" });

        // Check if email is available
        const emailResult = await UserModel.findOne({ email });
        if (emailResult) return res.json({ error: "Sign up error", msg: "Email is already associated with an account" });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user, then add it to the database 
        const newUser = new UserModel({ username, email, password: hashedPassword });
        newUser.save();


        return res.json({ msg: "hello" });
        
        
    } catch(err) {
        return res.json({ error: err});
    }
}

// POST: Process login request
export const login = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {

    const { email, password } = req.body;

    try {

        // Validate email
        const user = await UserModel.findOne({ email });
        if (!user) return res.json({ error: "Login error", msg: "Username or password is invalid" });
        
        // Validate password
        const passwordResult = await bcrypt.compare(password, user.password);
        if (!passwordResult) return res.json({ error: "Login error", msg: "Username or password is invalid" });

        // Generate token, then return token and user id in the response
        const token = jwt.sign({ id: user._id }, process.env.SECRET || "");
        return res.json({ token, userId: user._id });


    } catch(err) {
        return res.json({ error: err, msg: "Server error" });
    }

}
