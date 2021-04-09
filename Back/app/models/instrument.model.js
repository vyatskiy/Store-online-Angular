module.exports = (sequelize, Sequelize) => {
  return sequelize.define('instrument', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
      instrument_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    src: {
      type: Sequelize.STRING,
      allowNull: false
    },
    rating: {
      type: Sequelize.FLOAT,
      allowNull: true
    },
    category_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'category',
        key: 'id',
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    manufacturer_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'manufacturer',
        key: 'id',
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  })
}