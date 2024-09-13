module.exports = (sequelize, dataTypes) => {
    let alias = "Marcas";
    let cols = {
        id_marcas: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER,
            allowNull: false
        },
        descripcion: {
            type: dataTypes.STRING,
            allowNull: false
        },

    };
    let config = {
        tableName: "marcas",
        timestamps: false,
        underscored: true,

    }
    const Usuario = sequelize.define(alias, cols, config);
    Marca.associate = function(models){
        Marca.hasMany(models.Producto, {
            as: "productos",
            foreignKey: "id_marcas"
        })
    }
    return Usuario;
}