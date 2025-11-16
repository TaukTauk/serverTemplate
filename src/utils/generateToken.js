import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  return jwt.sign(
    { 
      user: {
        id: userId
      }
    }, 
    process.env.JWT_SECRET,
    {
      expiresIn: "1h"
    }
  );
};

export default generateToken;