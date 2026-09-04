import User from "../model/userModel.js";

export const create= async (req, res) => {
    try{
        const newUser = new User(req.body);
        const {email} = newUser;
        const userExist = await User.findOne({email}); 
        if(userExist){
            return res.status(400).json({errorMessage: "User with this email already exists"});
        }
        const savedData = await newUser.save();
        res.status(200).json({message: "User created successfully", user: newUser});
    }catch(error){
        res.status(500).json({errorMessage: error.message});
    }
}

export const getAllUsers = async (req, res) => {
    try{
        const userData = await User.find();
        if(!userData){
            return res.status(404).json({errorMessage: "No users found"});
        }
        res.status(200).json({userData});
    }catch(error){
        res.status(500).json({errorMessage: error.message});
    }
}

export const getUserById = async (req, res) => {
    try{
        const {id} = req.params;
        const userExit = await User.findById(id);
        if(!userExit){
            return res.status(404).json({errorMessage: "User not found"});
        }
        res.status(200).json({userExit});
    }catch(error){
        res.status(500).json({errorMessage: error.message});
    }
}

export const updateUser = async (req, res) => {
    try{
        const {id} = req.params;
        const updatedUser = await User.findByIdAndUpdate(id, req.body, {new: true});
        if(!updatedUser){
            return res.status(404).json({errorMessage: "User not found"});
        }
        res.status(200).json({message: "User updated successfully", user: updatedUser});
    }catch(error){
        res.status(500).json({errorMessage: error.message});
    }
}

export const deleteUser = async (req, res) => {
    try{
        const {id} = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if(!deletedUser){
            return res.status(404).json({errorMessage: "User not found"});
        }
        res.status(200).json({message: "User deleted successfully", user: deletedUser});
    }catch(error){
        res.status(500).json({errorMessage: error.message});
    }
}