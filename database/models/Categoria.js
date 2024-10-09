module.exports = (sequelize, dataTypes) => {
    let alias = "Categoria";
    let cols = {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      categoria: {
        type: dataTypes.STRING,
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
    };
    return Categoria;
  };
  