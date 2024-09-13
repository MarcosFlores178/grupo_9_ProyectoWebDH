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
    const Carrito = sequelize.define(alias, cols, config);
    Carrito.associate = function(models){
        Carrito.belongsTo(models.Usuario, {
            as: "usuarios",
            foreignKey: "id_usuarios"
        })
       
    }
    return Usuario;
}