module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define(
        'role', 
        {
            role_name: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }
    );

    return Role;
}
