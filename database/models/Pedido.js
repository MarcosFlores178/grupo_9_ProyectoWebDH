module.exports = (sequelize, dataTypes) => {
    let alias = "Pedido";
    let cols = {
        id_pedidos: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        total_precio: DataTypes.DECIMAL(8, 2),
        fecha_pedido: DataTypes.DATE,


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
       
    }
    return Pedido;
}