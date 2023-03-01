const Sequelize = require('sequelize')

//Fazendo conexão com o banco de Dados
const sequelize = new Sequelize('jovemtech','root','1234',{
    host: "localhost",
    dialect: 'mysql',
    query: { raw:true}
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}