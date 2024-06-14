require("dotenv").config();
const jwt = require("jsonwebtoken");

// middleware functiomn that will verify the token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
  
    //Extracting token from authorization header
    const token = authHeader && authHeader.split(" ")[1];

    //Checking if the token is null
    if (!token) {
      return res.status(401).send("No access token found");
    } else {
        //Verifying if the token is valid.
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRETKEY, (error, user) => {
            if (error) {
                console.log(error);
                return res.status(403).send("Invalid token");
            }
    
            req.user = user;
        });

        next();
    }
};

module.exports = authenticateToken;
