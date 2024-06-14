const db = require("../models");
const { generateToken } = require("../utils/generateToken");
const { hashPassword, comparePasswords } = require("../utils/hashPassword");
const Role = db.roles;
const User = db.users;

// function to register a user
const userRegistration = async(req, res) => {
    try {
        let { name, userName, role, email, password } = req.body;

        // checking if the user already exists
        const user = await User.findOne({
            where: {
                email: email
            }
        });

        // user exists
        if(user) {
            res.status(400).send("User already exists with this email");
        } else {
            // user doesn't exists
            if(userName.length < 3 || userName.length > 25) {
                res.status(400).send("User Name length should be between 3 characters to 25 characters");
            } else {
                // removing unwanted spaces from both the ends
                role = role.trim();
                userName = userName.trim();

                // hash password
                const encryptedPassword = await hashPassword(password);

                // find matching role id for this user
                const getRole = await Role.findOne({
                    where: {
                        role_name: role
                    },
                    raw: true,
                    attributes: ['id']
                });

                let newUser = {
                    name: name,
                    userName: userName,
                    roleId: getRole?.id,
                    email: email,
                    password: encryptedPassword
                }

                await User.create(newUser);

                const token = generateToken({ id: user?.dataValues?.id, email: email }, process.env.ACCESS_TOKEN_SECRETKEY);

                res.status(201).json({ message: "User registered successfully.", token});
            }
        }
    } catch (error) {
        if(error.message === "Validation error") {
            res.status(400).json({ message: "Username can't be the same" });
        } else {
            res.status(500).json({ message: "Something went wrong" });
        }
    }
}

// function to make a user login
const userLogin = async(req, res) => {
    try {
        const { email, password } = req.body;

        // checking if the user exists
        const user = await User.findOne({
            where: { 
                email: email 
            },
            raw: true
        });

        // user not found in the table
        if(!user) {
            res.status(404).json({ message: "User not found" });
        } else {
            let userStoredEncryptedPassword = user?.password;

            // checking for the password match
            const verifyPassword = await comparePasswords(password, userStoredEncryptedPassword);

            // password didn't match
            if(!verifyPassword) {
                res.status(400).send("Please enter a valid password");
            }

            const token = generateToken({ id: user?.id, email: email, role: user?.roleId }, process.env.ACCESS_TOKEN_SECRETKEY);

            res.status(200).json({ user, token });
        }
    } catch (error) {
        console.log(error);
    }
}

// function to fetch all registered users
const getLoggedInUser = async(req, res) => {
    try {
        const userDetails = req?.user?.user_details;

        const foundUser = await User.findOne({
            where: {
                id: userDetails?.id
            },
            attributes: ['name', 'email', 'userName']
        })
        
        if(foundUser) {
            res.status(200).json({ message: "User found", user: foundUser });
        } else {
            res.status(400).json({ message: "User not found" });
        }
    } catch (error) {
        console.log(error);
    }
}

// function to update an user
const userUpdate =  async(req, res) => {
    try {
        const { name, userName, role, email, password } = req.body;
        const userRoleId = req?.user?.user_details;
        const userId =  Number(req?.params?.id);

        // if the user is an admin
        if(userRoleId?.role === 1) {
            // find matching role id for this user
            const getRole = await Role.findOne({
                where: {
                    role_name: role
                },
                raw: true,
                attributes: ['id']
            });

            // hash password
            const encryptedPassword = await hashPassword(password);

            await User.update({
                name: name,
                userName: userName,
                roleId: getRole?.id,
                email: email,
                password: encryptedPassword
            }, {
                where: {
                    id: userId
                }
            })

            res.status(201).json({ message: "User details updated successfully" });
        } else {
            res.status(404).json({ message: "Permission denied" });
        }
    } catch (error) {
        console.log(error);
    }
}

// function to make a user logout
const userLogout = async(req, res) => {
    try {
        // Sorry but I don't know how to delete a jwt token that's why couldn't implement it
        res.send("User logged out");
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    userRegistration,
    userLogin,
    getLoggedInUser,
    userUpdate,
    userLogout
};
