module.exports = (sequelize, dataTypes) => {
    let alias = "Categoria";
    let cols = {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_parent: {
        type: dataTypes.INTEGER,
        allowNull: true
    },
      categoria: {
        type: dataTypes.STRING,
        allowNull: false
      },
    };
    let config = {
      tableName: "categorias",
      timestamps: false,
    };
    let Categoria = sequelize.define(alias, cols, config);
    Categoria.assosiate = (models) => {
      Categoria.hasMany(models.Producto, {
        as: "producto",
        foreignKey: "id_categoria",
      });
      Categoria.belongsTo(models.Categoria, {
        as: "subcategoria",
        foreignKey: "parent_id",
      });
      Categoria.hasMany(models.Categoria, {
        as: "padre",
        foreignKey: "parent_id",
      });
    };
    return Categoria;
  };
  