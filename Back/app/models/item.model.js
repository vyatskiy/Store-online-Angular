module.exports = (sequelize, Sequelize) => {
  return sequelize.define('item', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    serial_number: {
      type: Sequelize.STRING,
      allowNull: false
    },
    year_od_production: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
      instrument_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'instrument',
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