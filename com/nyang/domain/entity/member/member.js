module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user', {
    member_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: sequelize.UUIDV4,
      primaryKey: true,
    },
    id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    nickname: {
      type: DataTypes.STRING(20),
    },
    email: {
      type: DataTypes.STRING(20),
    },
    phone_number: {
      type: DataTypes.STRING(20),
    },
    authority: {
      type: DataTypes.STRING(20),
    },
    date_register: {
      type: DataTypes.DATE,
    },
    is_delete: {
      type: DataTypes.STRING(20),
    },
  });
};
