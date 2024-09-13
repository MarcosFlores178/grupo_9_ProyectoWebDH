module.exports = (sequelize, dataTypes) => {
    let alias = "Talles";
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
        }
    };
    let config = {
        tableName: "talles",
        timestamps: false,
        underscored: true,

    }
    const Talle = sequelize.define(alias, cols, config);
    Talle.associate = function(models){
        Talle.hasMany(models.Productos, {
            as: "productos",
            foreignKey: "id_talles"
        })
    }
    return Usuario;
}