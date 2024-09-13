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
    const Usuario = sequelize.define(alias, cols, config);
    return Usuario;
}