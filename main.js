class Despesa {
    constructor(data, tipo, descricao, valor, nome) {
        this.data = data
        this.tipo = tipo
        this.descricao = descricao
        this.nome = nome
        this.valor = valor
    }

    validarDados() {

        for (let atributo in this) {
            console.log(atributo, this[atributo])
            if (this[atributo] === undefined || this[atributo] === '' || this[atributo] === null) {
                return false
            }
        }

        return true
    }
    limparCamposformulario() {
        let inputs = document.querySelectorAll(".inputForm")
        inputs.forEach(input => {
            input.value = ""
        })
    }

    classeObrigatorio() {
        let inputs = document.querySelectorAll('.inputForm')
        inputs.forEach(input => {
            if (input.value === "") {
                input.classList.add('obrigatorio')
            } else {
                input.classList.remove('obrigatorio')
            }
        })
    }
}


class Bd {

    constructor() {
        let id = localStorage.getItem('id')
        if (id === null) {
            localStorage.setItem('id', 0)
        }
    }

    pegarProximoId() {
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }
    gravar(despesa) {
        let id = this.pegarProximoId()
        localStorage.setItem('id', id)
        localStorage.setItem(id, JSON.stringify(despesa))
    }

    recuperarTodosRegistros(){
        let despesas = Array()
        let id = localStorage.getItem('id')

        //recupera TODAS as despesas
        for(let i = 1; i <= id; i++){
            let despesa = JSON.parse(localStorage.getItem(i))
            if(despesa === null){
                continue
            }
            despesas.push(despesa)
        }

        return despesas

        }

        pesquisar(consulta){
            let despesasFiltradas = Array()
            despesasFiltradas = this.recuperarTodosRegistros()

            if(consulta.tipo !=""){
                despesasFiltradas = despesasFiltradas.filter (d =>d.tipo === consulta.tipo )
            }
            if(consulta.data !=""){
                despesasFiltradas = despesasFiltradas.filter (d =>d.data === consulta.data )
            }
            if(consulta.descricao !=""){
                despesasFiltradas = despesasFiltradas.filter (d =>d.descricao.toLowerCase().includes( consulta.descricao.toLowerCase() ))
            }
            if(consulta.nome !=""){
                despesasFiltradas = despesasFiltradas.filter (d =>d.nome.toLowerCase().includes( consulta.nome.toLowerCase() ))
            }
            if(consulta.valor !=""){
                despesasFiltradas = despesasFiltradas.filter (d =>d.valor === consulta.valor )
            }
            return despesasFiltradas
            

        }
}




//variaveis dos inputs
let bd = new Bd()
let data = document.getElementById('data')
let tipo = document.getElementById('tipo')
let descricao = document.getElementById("descricao")
let nome = document.getElementById('nome')
let valor = document.getElementById('valor')
let modalReigstroDespesa = new bootstrap.Modal(document.getElementById('modalReigstroDespesa'))



//finção para lidar com o evento do envio do formulário
document.getElementById('form-despesas').addEventListener('submit', function (event) {
    event.preventDefault()


    let despesa = new Despesa(
        data.value,
        tipo.value,
        descricao.value,
        valor.value,
        nome.value
    )


        despesa.classeObrigatorio()
    
    if (despesa.validarDados()) {
        bd.gravar(despesa)
        document.getElementById("titulo-modal").innerHTML = "Salvo com sucesso!"
        document.getElementById("header-modal").className = "modal-header text-success"
        document.getElementById("conteudo-modal").innerHTML = "Despesa adicionada com sucesso"
        document.getElementById("bt-voltar").className = "btn btn-success"
        modalReigstroDespesa.show()
        despesa.limparCamposformulario()



    }
    else {
        document.getElementById("titulo-modal").innerHTML = "erro ao salvar!"
        document.getElementById("header-modal").className = "modal-header text-danger"
        document.getElementById("conteudo-modal").innerHTML = "houve um erro ao salvar a despesa"
        document.getElementById("bt-voltar").className = "btn btn-danger"
        modalReigstroDespesa.show()

        modalReigstroDespesa.show()
    }

})

function carregarListaDespesas(){
    let despesas = Array()
    despesas = bd.recuperarTodosRegistros()
    let listaDespesas = document.getElementById("lista-despesas")

    //percorre o array despesas

    despesas.forEach(despesa =>{
        console.log(despesa)
        let linha =  listaDespesas.insertRow()
        linha.insertCell(0).innerHTML = despesa.data
        linha.insertCell(1).innerHTML = despesa.nome
        linha.insertCell(2).innerHTML = despesa.tipo
        linha.insertCell(3).innerHTML = despesa.descricao
        linha.insertCell(4).innerHTML = despesa.valor
    })
    }

    function pesquisarDespesas(){
        console.log("clicou!")
        let data = document.getElementById("data").value
        let tipo = document.getElementById("tipo").value
        let descricao = document.getElementById("descricao").value
        let valor = document.getElementById("valor").value
        let nome = document.getElementById("nome").value

        let consulta = new Despesa(data,tipo,descricao,valor,nome)
        let despesas = bd.pesquisar(consulta)

        let listaDespesas = document.getElementById("lista-despesas")
        listaDespesas.innerHTML = ""
    //percorre o array despesas

    despesas.forEach(despesa =>{
        console.log(despesa)
        let linha =  listaDespesas.insertRow()
        linha.insertCell(0).innerHTML = despesa.data
        linha.insertCell(1).innerHTML = despesa.nome
        linha.insertCell(2).innerHTML = despesa.tipo
        linha.insertCell(3).innerHTML = despesa.descricao
        linha.insertCell(4).innerHTML = despesa.valor
    })
    }
    








