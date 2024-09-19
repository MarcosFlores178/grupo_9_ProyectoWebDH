module.exports = (sequelize, dataTypes) => {
    let alias = "Producto";
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
        },
        id_talles: {  // Agrega la columna id_talles como llave foránea
            type: dataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'talles',  // Hace referencia a la tabla Talles
                key: 'id_talles'
            }
        },
        id_marcas: {  // Agrega la columna id_marcas como llave foránea
            type: dataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'marcas',  // Hace referencia a la tabla Marcas
                key: 'id_marcas'
            }
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
        Producto.belongsToMany(models.Pedido, {
            as: "productosPedidos",
            through: 'productos_pedidos',
            foreignKey: "id_productos",
            otherKey: 'id_pedidos',
            timestamps: false
        })
    }

 
    return Producto;
}

