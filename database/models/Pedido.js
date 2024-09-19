module.exports = (sequelize, dataTypes) => {
    let alias = "Pedido";
    let cols = {
        id_pedidos: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        total_precio: dataTypes.DECIMAL(8, 2),
        fecha_pedido: dataTypes.DATE,


    };
    let config = {
        tableName: "pedidos",
        timestamps: false,
        underscored: true,

    }
    const Pedido = sequelize.define(alias, cols, config);
    Pedido.associate = function (models) {
        Pedido.belongsTo(models.Usuario, {
            as: "usuarios",
            foreignKey: "id_usuarios"
        })
        Pedido.belongsToMany(models.Producto, {
            as: "pedidosProductos",
            through: 'productos_pedidos',
            foreignKey: "id_pedidos",
            otherKey: 'id_productos',
            timestamps: false
        })
       
    }
    return Pedido;
}