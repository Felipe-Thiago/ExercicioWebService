const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

const cursos = ["DSWEB", "ENGSOFT", "SQL", "IHC", "NOSQL", "TECPROG"]
let alunos = [
    {ra: 123, nome: "Fulano A", turma: "1A"},
    {ra: 213, nome: "Beltrano B", turma: "1B"},
    {ra: 312, nome: "Cicrano C", turma: "2A"}
];

app.get('/', (req, res)=>{
    res.json(alunos)
})

app.post('/', (req, res)=>{
    const {ra, nome, turma} = req.body
    const novoAluno = {ra, nome, turma}
    alunos.push(novoAluno)
    res.send(novoAluno)

})

app.put('/', (req, res)=>{
    const index = alunos.findIndex(x => x.ra == req.body.ra)
    alunos[index] = {ra: req.body.ra, nome: req.body.nome, turma: req.body.turma}
    res.send(alunos[index])
})

app.delete('/', (req, res)=>{
    const index = alunos.findIndex(x => x.ra == req.body.ra)
    
    alunos.splice(index, 1)
    
    res.send(alunos)
})

app.listen(port, ()=>{
    console.log(`Aplicação rodando com sucesso na porta ${port}`)
})

