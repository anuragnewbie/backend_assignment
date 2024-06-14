const bcrypt = require('bcrypt');

// function that will hash the inputted password
async function hashPassword(passwordToBeHashed) {
    const hashedPassword = await bcrypt.hash(passwordToBeHashed, 10);
    return hashedPassword;
}

// function that will compare and match two passwords
async function comparePasswords(passwordToBeCompared, encryptedPassword) {
    const comparedResult = await bcrypt.compare(passwordToBeCompared, encryptedPassword);
    return comparedResult
}

module.exports = {
    hashPassword,
    comparePasswords
};
