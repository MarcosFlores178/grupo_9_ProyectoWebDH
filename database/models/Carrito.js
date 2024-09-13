module.exports = (sequelize, dataTypes) => {
    let alias = "Carritos";
    let cols = {
        id_carritos: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER,
            allowNull: false
        },
        totalItems: {
            type: dataTypes.STRING,
            allowNull: false
        },
        totalPrecio: {
            type: dataTypes.STRING,
            allowNull: false
        },
        fechaCompra: {
            type: dataTypes.DATEONLY,
            allowNull: false
        }

    };
    let config = {
        tableName: "carritos",
        timestamps: false,
        underscored: true,

    }
    const Usuario = sequelize.define(alias, cols, config);
    return Usuario;
}