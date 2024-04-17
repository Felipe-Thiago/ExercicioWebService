const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

const cursos = []
let alunos = [
    {ra: 123, nome: "Fulano A", turma: "1A"},
    {ra: 213, nome: "Beltrano B", turma: "1B"},
    {ra: 312, nome: "Cicrano C", turma: "2A"}
];

app.get('/', (req, res)=>{
    //consulta aluno por RA:
    if(req.body.ra != null){
        const index = alunos.findIndex(x => x.ra == req.body.ra)
        res.send(alunos[index])
    } else{ //consulta nenhum aluno em especifico:
        res.json(alunos)
    }
    
})

app.post('/', (req, res)=>{
    const index = alunos.findIndex(x => x.ra == req.body.ra)

    if (index !== -1) { //ra existente
        if (req.body.curso != null){ //adicionar curso
            //variavel = condicao ? valorSeTrue : valorSeFalse;
            alunos[index].cursos ? alunos[index].cursos.push(req.body.curso) : alunos[index].cursos = [req.body.curso];
            res.send(`Adicionando ${req.body.curso} ao aluno de RA ${req.body.ra}`);
         } else{ //só informou o ra 
            res.send(`RA existente, tente outro ou atribue a um curso`)
        }
            
            /* comentário abaixo é basicamente a linha 31
            if(alunos[index].cursos == null){
                alunos[index].cursos = [req.body.curso]; //os [] inicializam um array de cursos e já atribui o curso
            } else{
                alunos[index].cursos.push(req.body.curso) //os [] já devem existir, então só insere mais um curso
            }*/

    } else { //ra não-existente = criar novo aluno
        if(req.body.nome != null && req.body.turma != null){
            const {ra, nome, turma} = req.body
            const novoAluno = {ra, nome, turma}
            alunos.push(novoAluno)
            res.send(novoAluno)
         } else{
             res.send("Informe um ra existente para atribuir um curso ou um novo ra com nome e turma para novo cadastro. \n Lista de alunos: \n" + JSON.stringify(alunos))
         }
    }
})

app.put('/', (req, res)=>{
    const index = alunos.findIndex(x => x.ra == req.body.ra) //acha o ra informado
    const aluno = alunos[index]

    if(index !== -1){ //ra existe
        if(req.body.curso){ //curso foi dado
            
            const cursoAntigo = aluno.curso
            aluno.cursos = req.body.curso
            res.send(`Curso ${cursoAntigo} substituído por ${aluno.curso}`)
            
        
        }
        if(req.body.nome){
            aluno.nome = req.body.nome
        }
        if(req.body.turma){
            aluno.turma = req.body.turma
        }
               
        res.send(aluno)
    } else{
        res.send(`Informe um nome, turma ou curso para ser atualizado`)
    }
    // } else{
    //     res.send(`RA inexistente, alunos cadastrados: \n` + JSON.stringify(alunos))
    // }
    
})

app.delete('/', (req, res)=>{
    const index = alunos.findIndex(x => x.ra == req.body.ra)
    
    alunos.splice(index, 1)
    
    res.send(alunos)
})

app.listen(port, ()=>{
    console.log(`Aplicação rodando com sucesso na porta ${port}`)
})

