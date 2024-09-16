module.exports = (sequelize, DataTypes) => {
    let alias = "ProductoPedido";  // Alias para el modelo
    
    let cols = {
        id_productos: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true  // Parte de la clave primaria compuesta
        },
        id_pedidos: {
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
        },
        subtotal: {
            type: DataTypes.DECIMAL(8, 2),
            allowNull: false
        }
    };
    
    let config = {
        tableName: "productos_pedidos",  // Nombre de la tabla
        timestamps: false,
        underscored: true
    };

    const ProductoPedido = sequelize.define(alias, cols, config);

    // Asociaciones
    ProductoPedido.associate = function(models) {
        ProductoPedido.belongsTo(models.Producto, {
            as: "producto",
            foreignKey: "id_productos"
        });
        
        ProductoPedido.belongsTo(models.Pedido, {
            as: "pedido",
            foreignKey: "id_pedidos"
        });
    };

    return ProductoPedido;
};