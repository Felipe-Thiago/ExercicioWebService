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
    const index = alunos.findIndex(x => x.ra == req.body.ra) //percorre a lista de alunos até o ra informado
    
    if(index !== -1){
        if(req.body.curso != null){ //alterar curso
            //alunos[index].cursos ? (verificar curso dado e alterar curso) : (dizer pra inserir um curso primeiro)
            if(alunos[index].cursos != null){
                const index2 = alunos[index].cursos.findIndex(y => y.curso == req.body.curso)
                alunos[index].cursos[index2] = req.body.curso
            //o curso cadastrado que corresponder ao curso informado será alterado
            } else{
                res.send("Atribua um curso ao aluno através do POST primeiro!")
            }
        } else{ //alterar outras infos sem alterar um curso existente
            if(req.body.nome || req.body.turma){
                alunos[index] = {ra: req.body.ra, nome: req.body.nome, turma: req.body.turma}
                
            }
        }
        /*if(req.body.nome != null || req.body.turma != null){ //se quiser alterar o nome ou turma a partir do ra
         
            alunos[index] = {ra: req.body.ra, nome: req.body.nome, turma: req.body.turma}
            res.send(alunos[index])
        } else if (req.body.curso != null){ //se quiser alterar o(s) curso(s)
            const index2 = alunos[index].cursos.findindex(y => y.curso == req.body.curso)
            
        } */
    } else{
        res.send(`RA inexistente, alunos cadastrados: \n` + JSON.stringify(alunos))
    }
    
})

app.delete('/', (req, res)=>{
    const index = alunos.findIndex(x => x.ra == req.body.ra)
    
    alunos.splice(index, 1)
    
    res.send(alunos)
})

app.listen(port, ()=>{
    console.log(`Aplicação rodando com sucesso na porta ${port}`)
})

