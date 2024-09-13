module.exports = (sequelize, dataTypes) => {
    let alias = "Usuarios";
    let cols = {
        cantidad: {
            type: dataTypes.INT,
            allowNull: false
        },
        precioUnitario: {
            type: dataTypes.DECIMAL(8,2),
            allowNull: false
        }

    };
    let config = {
        tableName: "productosCarritos",
        timestamps: false,
        underscored: true,

    }
    const Usuario = sequelize.define(alias, cols, config);
    return Usuario;
}