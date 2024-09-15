module.exports = (sequelize, dataTypes) => {
    let alias = "Talle";
    let cols = {
        id_talles: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER,
            allowNull: false
        },
        talle: {
            type: dataTypes.STRING,
            allowNull: false
        }
    };
    let config = {
        tableName: "talles",
        timestamps: false,
        underscored: true,

    }
    const Talle = sequelize.define(alias, cols, config);
    Talle.associate = function(models){
        Talle.hasMany(models.Producto, {
            as: "productos",
            foreignKey: "id_talles"
        })
    }
    return Talle;
}