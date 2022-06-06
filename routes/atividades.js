const { get } = require('mongoose')

module.exports= (app)=>{

app.post('/atividades',async(req,res)=>{
    //recuperando as informações digitais
    var dados = req.body
    //exibindo terminar
    //console.log(dados)
    //conectar com o database
    const conexao = require('../config/database')()
    //model atividades 
    const atividades = require('../models/atividades')
    //salvar as informacoes do formulario no database
    var salvar = await new atividades({
        data:dados.data,
        tipo:dados.tipo,
        entrega:dados.entrega,
        disciplina:dados.disciplina,
        instrucoes:dados.orientacao,
        usuario:dados.id
    }).save()

    var buscar = await atividades.find({usuario:dados.id})
    //console.log(buscar)
    res.render('atividades.ejs',{nome:dados.nome,id:dados.id,dados:buscar})
})
    //excluir  atividades
    app.get("/excluir",async(req,res)=>{
        //recuperar a parametro id da bara de endereço
        var id = req.query.id
        var excluir = await atividades.findOneAndRemove({
            _id:id
        })
        //voltar para página atividades
        res.send("Atividade Excluir")
    }) 

}