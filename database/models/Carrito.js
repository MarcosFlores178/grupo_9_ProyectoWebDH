module.exports = (sequelize, dataTypes) => {
    let alias = "Carrito";
    let cols = {
        idCarritos: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER,
            allowNull: false
        },
        totalItems: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        totalPrecio: {
            type: dataTypes.DECIMAL(8,2),
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
        Carrito.belongsToMany(models.Producto, {
            as: "carritosProductos",
            through: 'productos_carritos',
            foreignKey: "id_carritos",
            otherKey: 'id_productos',
            timestamps: false
        })
    }
    return Carrito;
}