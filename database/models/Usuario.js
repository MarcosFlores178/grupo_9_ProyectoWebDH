// const { DataTypes } = require("sequelize");

module.exports = (sequelize, dataTypes) => {
    let alias = "Usuario";
    let cols = {
        id_usuarios: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER,
            allowNull: false
        },
        nombre: {
            type: dataTypes.STRING,
            allowNull: false
        },
        apellido: {
            type: dataTypes.STRING,
            allowNull: false
        },
        dni: {
            type: dataTypes.STRING,
            allowNull: false
        },
        telefono: {
            type: dataTypes.STRING,
            allowNull: false
        },
        domicilio: {
            type: dataTypes.STRING,
            allowNull: false
        },
        pais: {
            type: dataTypes.STRING,
            allowNull: false
        },
        nombreUsuario: {
            type: dataTypes.STRING,
            allowNull: false
        },
        email: {
            type: dataTypes.STRING,
            allowNull: false
        },
        password: {
            type: dataTypes.STRING,
            allowNull: false
        },
        tipoUsuario: {
            type: dataTypes.STRING,
            allowNull: false
        },
        genero: {
            type: dataTypes.STRING,
            allowNull: false
        },
        fotoPerfil: {
            type: dataTypes.STRING,
            allowNull: false
        }
    };
    let config = {
        tableName: "usuarios",
        timestamps: false,
        underscored: true,

    }
    const Usuario = sequelize.define(alias, cols, config);
    Usuario.associate = function(models){
        Usuario.hasOne(models.Carrito, {
            as: "carritos",
            foreignKey: "id_usuarios"
        });
        Usuario.hasMany(models.Pedido, {
            as: "pedidos",
            foreignKey: "id_usuarios"
        })
    }

    return Usuario;
}



