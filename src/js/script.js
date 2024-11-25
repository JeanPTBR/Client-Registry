// Criando a funçao Factory de encapsulamento para cadastrar pessoas
function PersonFactory() {
    return {
        cadastro: function(nome, nascimento, telefone, email) {
            return {nome, nascimento, telefone, email}
        }
    }
}
console.log(PersonFactory().cadastro('Jean', '10/06/2005', '61982137459', 'jean@gmail.com'))

// Pegando elementos do arquivo HTML
const botaoCadastro = document.getElementById('botaoCadastro');
const tabelaPessoas = document.getElementById('tabelaPessoas').getElementsByTagName('tbody');

// Criando nova instancia de cadastro
const personFactory = PersonFactory();

// Funçao para salvar as pessoas no localStorage
function salvarPessoas(pessoas) {
    localStorage.setItem('pessoas', JSON.stringify(pessoas));
    atualizarTabela();
}

// Funçao para pegar as pessoas cadastradas no localStorage
function obterPessoas() {
    return JSON.parse(localStorage.getItem('pessoas')) || [];
}

// Funçao para cadastrar pessoas utilizando a biblioteca SweetAlert2
function cadastrarPessoas() {
    Swal.fire({
        title: 'Insira seus dados',
        html:
        '<input type="text" id="nome" class="swal2-input" placeholder="Nome">' +
        '<input type="date" id="nascimento" class="swal2-input" placeholder="Data de Nascimento">' +
        '<input type="text" id="telefone" class="swal2-input" placeholder="Telefone">' +
        '<input type="email" id="email" class="swal2-input" placeholder="E-mail">' ,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "Cadastrar",
        cancelButtonText: "Cancelar",
        cancelButtonColor: "red",
        preConfirm: () => {
            const nome = document.getElementById('nome').value;
            const nascimento = document.getElementById('nascimento').value;
            const telefone = document.getElementById('telefone').value;
            const email = document.getElementById('email').value;
            if (!nome || !nascimento || !telefone || !email) {
                Swal.showValidationMessage('Por favor, insira todos os dados.');
                return false;
            }
            //console.log({nome, nascimento, telefone, email})
            return {nome, nascimento, telefone, email};
        }
    }).then((result) => {
        if (result.isConfirmed) {
            /*console.log(
                result.value.nome, result.value.nascimento,
                result.value.telefone, result.value.email
            )*/
            const pessoa = personFactory.cadastro(
                result.value.nome, result.value.nascimento,
                result.value.telefone, result.value.email
            );
            console.log(pessoa);
            adicionarPessoas(pessoa);
            Swal.fire({
                title: "Dados cadastrados!",
                text: "Os dados foram cadastrados com sucesso!",
                icon: "success"
            });
        }
    });
}
// Tem um problema, ao fazer um novo cadastro, ele sobrescreve o anterior
// Irei criar uma funçao para adicionar esse cadastro/objeto dentro de uma array de objetos
function adicionarPessoas(pessoa) {
    // adicionar pessoa no final do array obtido pela funçao obterPessoas()
    const pessoas = obterPessoas();
    pessoas.push(pessoa);
    // salvando o array atualizado no localStorage
    salvarPessoas(pessoas);
}

// Criando arrow function para atualizar os dados de cada pessoa no HTML
const atualizarTabela = () => {
    const pessoas = obterPessoas();
    // antes de criar linha, precisa limpar a tabela para não mostrar as linhas duplicadas
    const linhas = document.querySelectorAll('#corpoTabelaPessoas tr');
    linhas.forEach(linha => linha.parentNode.removeChild(linha));
    pessoas.forEach(criarLinha);  // Criar linha para cada objeto dentro do array
}

// Funçao para criar a linha no HTML
const criarLinha = (pessoa, index) => {
    const novaLinha = document.createElement('tr');
    // Formatando data de nascimento para o formato (DD/MM/AAAA)
    const nascimentoFormatado = `${pessoa.nascimento.split('-')[2]} / ${pessoa.nascimento.split('-')[1]} / ${pessoa.nascimento.split('-')[0]}`;
    // console.log(nascimentoFormatado);
    // Criando os dados contidos dentro da linha HTML
    novaLinha.innerHTML = `
        <td>${pessoa.nome}</td>
        <td>${nascimentoFormatado}</td>
        <td>${pessoa.email}</td>
        <td>${pessoa.telefone}</td>
        <td>
            <button type="button" id="apagar-${index}" class="botoesApagarEditar">🗑️</button>
        </td>
        <td>
            <button type="button" id="editar-${index}" class="botoesApagarEditar">📝</button>
        </td>
    `
    // Inserindo os dados dentro do HTML pelo ID do tbody
    document.querySelector('#corpoTabelaPessoas').appendChild(novaLinha);
}

const apagarEditarPessoas = (evento) => {
    //console.log(evento.target.id);
    const pessoaIndex = evento.target.id.split('-')[1];  //["apagar", index]
    const acao = evento.target.id.split('-')[0]; // açao de apagar
    const pessoa = obterPessoas();
    if (acao == 'apagar') {
        Swal.fire({
            title: `Você realmente quer apagar "${pessoa[pessoaIndex].nome}"?`,
            text: "Essa ação não poderá ser revertida!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sim, apagar!",
            confirmButtonColor: "green",
            cancelButtonColor: "red"
        }).then((result) => {
            if (result.isConfirmed) {
                console.log(pessoa);
                pessoa.splice(pessoaIndex, 1); // Removendo a pessoa pelo indice
                salvarPessoas(pessoa);
                Swal.fire({
                    title: "Apagado!",
                    text: "A pessoa foi apagada com sucesso!",
                    icon: "success"
                });
            }
        });
    // Caso clique no botão Editar
    } else if (acao == 'editar') {
        console.log(acao);
        Swal.fire({
            title: `Editando a pessoa "${pessoa[pessoaIndex].nome}"`,
            html:
            `<input type="text" id="nome" class="swal2-input" placeholder="Nome" value="${pessoa[pessoaIndex].nome}">` +
            `<input type="date" id="nascimento" class="swal2-input" placeholder="Data de Nascimento" value="${pessoa[pessoaIndex].nascimento}">` +
            `<input type="text" id="telefone" class="swal2-input" placeholder="Telefone" value="${pessoa[pessoaIndex].telefone}">` +
            `<input type="email" id="email" class="swal2-input" placeholder="E-mail" value="${pessoa[pessoaIndex].email}">` ,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: "Editar",
            cancelButtonText: "Cancelar",
            cancelButtonColor: "red",
            preConfirm: () => {
                const nome = document.getElementById('nome').value;
                const nascimento = document.getElementById('nascimento').value;
                const telefone = document.getElementById('telefone').value;
                const email = document.getElementById('email').value;
                if (!nome || !nascimento || !telefone || !email) {
                    Swal.showValidationMessage('Por favor, insira todos os dados.');
                    return false;
                }
                //console.log({nome, nascimento, telefone, email})
                return {nome, nascimento, telefone, email};
            }
        }).then((result) => {
            if (result.isConfirmed) {
                /*console.log(
                    result.value.nome, result.value.nascimento,
                    result.value.telefone, result.value.email
                )*/
                pessoa[pessoaIndex] = result.value;
                console.log(pessoa[pessoaIndex]);
                salvarPessoas(pessoa);
                atualizarTabela();
                Swal.fire({
                    title: "Dados editados!",
                    text: "Os dados foram editados com sucesso!",
                    icon: "success"
                });
            }
        });
    }
}

atualizarTabela();

// Adicionar evento para perceber que os botões estão sendo clicados
document.querySelector('#corpoTabelaPessoas')
    .addEventListener('click', apagarEditarPessoas)
