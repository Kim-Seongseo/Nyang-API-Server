module.exports = (sequelize, DataTypes) => {
  return sequelize.define('board', {
    board_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: sequelize.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(100),
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
