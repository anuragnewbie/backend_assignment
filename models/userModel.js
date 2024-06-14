const Role = require('./roleModel');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'user',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            userName: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            createdAt: {
                type: DataTypes.DATEONLY,
                allowNull: false
            },
            updatedAt: {
                type: DataTypes.DATEONLY,
                allowNull: false
            }
        }
    );

    return User;
}
