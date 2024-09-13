const { FOREIGNKEYS } = require("sequelize/lib/query-types");

module.exports = (sequelize, dataTypes) => {
    let alias = "Productos";
    let cols = {
        id_productos: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER,
            allowNull: false
        },
        nombre: {
            type: dataTypes.STRING,
            allowNull: false
        },
        descripcion: {
            type: dataTypes.STRING,
            allowNull: false
        },
        imagen: {
            type: dataTypes.STRING,
            allowNull: false
        },
        color: {
            type: dataTypes.STRING,
            allowNull: false
        },
        precio: {
            type: dataTypes.DECIMAL(8,2),
            allowNull: false
        }

    };
    let config = {
        tableName: "productos",
        timestamps: false,
        underscored: true,

    }
    const Producto = sequelize.define(alias, cols, config);
    Producto.associate = function(models){
        Producto.belongsTo(models.Talle, {
            as: "talles",
            foreignKey: "id_talles"
        })
        Producto.belongsTo(models.Marca, {
            as: "marcas",
            foreignKey: "id_marcas"
        })
        Producto.belongsToMany(models.Carrito, {
            as: "productosCarritos",
            through: 'productos_carritos',
            foreignKey: "id_productos",
            otherKey: 'id_carritos',
            timestamps: false
        })
    }

 
    return Usuario;
}

