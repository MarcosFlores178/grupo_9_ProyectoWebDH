module.exports=(sequelize, dataTypes)=>{
    let alias="Usuarios";
    let cols={

    };
    let config={
        tableName: "carritos",
        timestamps: false,
        underscored: true,

    }
    const Usuario=sequelize.define(alias, cols, config);
    return Usuario;
}