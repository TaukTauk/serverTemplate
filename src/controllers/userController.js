import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import { uploadToR2 } from "../utils/cloudinary.js";

const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  
  if (!name || !email || !password || !role) {
    return res.status(400).json({
      success: false,
      devMessage: "Please provide all fields",
      message: "Please provide all fields",
      result: {}
    });
  }
  
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        devMessage: "User already exists",
        message: "User already exists",
        result: {}
      });
    }
    
    let profile_url = "";
    const profileFolder = process.env.PROFILE_FOLDER_NAME;
	
	// Handle profile image
    if (req.file) {
      const profileFile = req.file; // Already formatted!
      profile_url = await uploadToR2(profileFile, profileFolder);
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
      profile_url
    });
	
    const token = generateToken(user.id);
    res.status(200).json({
      success: true,
      devMessage: "User created successfully",
      message: "User created successfully",
      result: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          profile_url
        },
        token
      }
    });
  } catch (error) {
    console.error("Register user error:", error);
    res.status(400).json({
      success: false,
      devMessage: error.message,
      message: "Failed to create user",
      result: {}
    });
  }
};

export { registerUser };