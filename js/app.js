//objeto Alunos
const alunos = [
    {
      _id: 0,
      nome: "chico melato",
      notas: {
        backend_1: [7, 8.5, 9, 6.5],
        frontend_2: [2, 2, 2, 2],
        bancodados: [2, 2, 3, 3],
        ferramentas: [3, 3, 3, 3],
      },
    },
    {
      _id: 1,
      nome: "talita lima",
      notas: {
        backend_1: [4, 4, 4, 4],
        frontend_2: [4, 4, 5, 5],
        bancodados: [5, 5, 6, 6],
        ferramentas: [7, 7, 8, 9],
      },
    },
    {
      _id: 2,
      nome: "fulano da silva",
      notas: {
        backend_1: [3, 3, 3, 3],
        frontend_2: [4, 4, 7, 7],
        bancodados: [5, 6, 8, 6],
        ferramentas: [7, 7, 8, 9],
      },
    },
  ];   


  const alunoService = new AlunoService();

alunos.forEach(aluno => {
    alunoService.add(new AlunoModel(aluno));
})

//inserir na thead da tabela a lista de matérias
const htmlHeader = document.createElement('tr')
htmlHeader.innerHTML = '<td>Nome</td>'

const htmlHeaderMaterias = Object.keys(alunos[0].notas).map(materia => {
    return `<td>${materia}</td>`
}).join('')

htmlHeader.innerHTML += htmlHeaderMaterias
document.querySelector('[data-table-alunos] thead').appendChild(htmlHeader)

// Inserir no tbody da tabela a lista de alunos e suas médias
function render() {
    document.querySelector('[data-table-alunos] tbody').innerHTML = ''

    alunos.forEach(aluno => {
    let htmlRow = document.createElement('tr')
    htmlRow.innerHTML = `<td>${aluno.nome}</td>`

    let htmlRowMaterias = Object.keys(aluno.notas).map(materia => {
        return `<td>${aluno.media[materia]}</td>`
    }).join('')
    htmlRow.innerHTML += htmlRowMaterias
    document.querySelector('[data-table-alunos] tbody').appendChild(htmlRow)
})
}


// Inserir aluno
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault()
    const nome = document.getElementById('first_name').value 
    const newAluno = {
        _id: 0, 
        nome,
        notas: {
            backend_1: [6, 6, 6, 6],
            frontend_2: [7, 7, 7, 7],
            bancodados: [8, 8, 8, 8],
            ferramentas: [9, 9, 9, 9]
        },
    }

    newAluno.media = {}
    for(let materia in newAluno.notas) {
    newAluno.media[materia] = average(...newAluno.notas[materia])
    };

    alunos.push(newAluno);
    render();
})