// module.exports = (sequelize, dataTypes) => {
//     let alias = "ProductoCarrito";
//     let cols = {
//         cantidad: {
//             type: dataTypes.INT,
//             allowNull: false
//         },
//         precioUnitario: {
//             type: dataTypes.DECIMAL(8,2),
//             allowNull: false
//         }

//     };
//     let config = {
//         tableName: "productos_carritos",
//         timestamps: false,
//         underscored: true,

//     }
//     const ProductoCarrito = sequelize.define(alias, cols, config);
//     return ProductoCarrito;
// }

module.exports = (sequelize, DataTypes) => {
    let alias = "ProductoCarrito";  // Alias para el modelo
    
    let cols = {
        id_productos: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true  // Parte de la clave primaria compuesta
        },
        id_carritos: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true  // Parte de la clave primaria compuesta
        },
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        precio_unitario: {
            type: DataTypes.DECIMAL(8, 2),
            allowNull: false
        }
    };
    
    let config = {
        tableName: "productos_carritos",  // Nombre de la tabla
        timestamps: false,
        underscored: true
    };

    const ProductoCarrito = sequelize.define(alias, cols, config);

    // Asociaciones
    ProductoCarrito.associate = function(models) {
        ProductoCarrito.belongsTo(models.Producto, {
            as: "producto",
            foreignKey: "id_productos"
        });
        
        ProductoCarrito.belongsTo(models.Carrito, {
            as: "carrito",
            foreignKey: "id_carritos"
        });
    };

    return ProductoCarrito;
};
