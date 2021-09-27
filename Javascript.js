//Função para limpar
function limpa(){
//Realiza um refresh na página
    location.reload();
}

//Função do para cadastrar
function cadastra(){
    //Verifica se o campo Nome completo está preenchido
    if(document.getElementById("nome").value.length < 3){
        alert("Para continuar é nessário preencher o campo: Nome completo");
        document.getElementById("nome").focus();
        return false
    //Verifica se o campo CPF está preenchido e contém 11 digitos.
    } else if(document.getElementById("cpf").value.length !=11){
        alert("Para continuar é nessário preencher o campo: CPF");
        document.getElementById("cpf").focus();
        return false
    //Verifica se o campo Endereço está preenchido
    } else if(document.getElementById("endereco").value.length < 3){
        alert("Para continuar é nessário preencher o campo: Endereço");
        document.getElementById("endereco").focus();
        return false
    //Verifica se o campo Número está preenchido
    } else if(document.getElementById("numero").value.length < 1){
        alert("Para continuar é nessário preencher o campo: Número");
        document.getElementById("numero").focus();
        return false
    //Verifica se o campo Celular está preenchido
    } else if(document.getElementById("celular").value.length !=14){
        alert("Para continuar é nessário preencher o campo: Telefone celular");
        document.getElementById("celular").focus();
        return false
    //Se todas opções anteriore forem verdadeiras realiza o cadastro e retorna uma alerta
    } else {
        location.reload();
        alert("Obrigado, o cadastro foi realizado com sucesso!")
        return true
    }
}

//Máscara para nome (deixa o sobrenome com letra maiúscula)
function mascara_nome(nome) {
    var nome = document.getElementById("nome").value;
    nome = nome.toLowerCase().replace(/(?:^|\s)\S/g, function(capitalize) { return capitalize.toUpperCase(); });
    document.getElementById("nome").value=nome;''
}

//Validador de CPF
function validaCPF(cpf){
    if(cpf.length != 11){
        return false;
    } else {
        var numeros = cpf.substring(0, 9);
        var digitos = cpf.substring(9);
        var soma = 0;
        for (var i = 10; i > 1; i--) {
            soma += numeros.charAt(10 - i) * i;
        }
        console.log(soma);
        var resultado = (soma % 11) < 2 ? 0 : 11 - (soma % 11);
        //Validação do priemrio digito
        if (resultado != digitos.charAt(0)) {
            return false;
        }
        soma = 0;
        numeros = cpf.substring(0, 10);
        for (var k = 11; k > 1; k--) {
            soma += numeros.charAt(11 - k) * k;
        }
        console.log(soma);
        var resultado = (soma % 11) < 2 ? 0 : 11 - (soma % 11);
        //Validação do segundo digito
        if (resultado != digitos.charAt(1)) {
            return false;
        }          
            return true;
        }

    }

//Mensagem validação do CPF
function validacao() {
    document.getElementById('cpf_valido').style.display = 'none'; 
    document.getElementById('cpf_invalido').style.display = 'none'; 
        var cpf = document.getElementById('cpf').value;
        var reusltadoValidacao = validaCPF(cpf);
        if (reusltadoValidacao) {
            document.getElementById('cpf_valido').style.display = 'block';
        } else {
            document.getElementById('cpf_invalido').style.display = 'block';
        }
}

//Máscara RG 
function mascara_rg() {
    var rg = document.getElementById('rg')
    if(rg.value.length == 2 || rg.value.length == 6){
        rg.value += "."
    } else if(rg.value.length == 10) {
        rg.value += "-"
    }
}

//Máscara para CEP 99999-999
function mascara_cep() {
    var cep = document.getElementById('cep')
    if(cep.value.length == 5) {
        cep.value += "-"
    } 
}

//Limpa valores do formulário de CEP.
function limpa_formulário_cep() {
    document.getElementById('endereco').value=("");
    document.getElementById('bairro').value=("");
    document.getElementById('cidade').value=("");
    document.getElementById('estado').value=("");
}

//Atualiza os campos com os valores.
function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        document.getElementById('endereco').value=(conteudo.logradouro);
        document.getElementById('bairro').value=(conteudo.bairro);
        document.getElementById('cidade').value=(conteudo.localidade);
        document.getElementById('estado').value=(conteudo.uf);
    } else {
    //Se o CEP não Encontrado.
    limpa_formulário_cep();
    alert("CEP não encontrado.");
    }
}

function pesquisacep(valor) {
//Nova variável "cep" somente com dígitos.
var cep = valor.replace(/\D/g, '');
    //Verifica se campo CEP possui valor informado.
    if (cep != "") {
    //Expressão regular para validar o CEP.
    var validacep = /^[0-9]{8}$/;
    //Valida o formato do CEP.
    if(validacep.test(cep)) {
        //Preenche os campos com "..." enquanto consulta webservice.
        document.getElementById('endereco').value="...";
        document.getElementById('bairro').value="...";
        document.getElementById('cidade').value="...";
        document.getElementById('estado').value="...";
        //Cria um elemento javascript.
        var script = document.createElement('script');
        //Sincroniza com o callback.
        script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';
        //Insere script no documento e carrega o conteúdo.
        document.body.appendChild(script);
    } else {
        //cep é inválido.
        limpa_formulário_cep();
        alert("Formato de CEP inválido.");
    }} else {
    //CEP sem valor, limpa formulário.
    limpa_formulário_cep();
    }
};

//Máscara para telefone fixo
function mascara_fixo(){
    var telefone= document.getElementById('fixo').value;
    if(telefone.length==1) {
     document.getElementById('fixo').value ='(' + telefone;
    } else if (telefone.length==3){
     document.getElementById('fixo').value = telefone +')';
    } else if (telefone.length==8){
     document.getElementById('fixo').value = telefone +'-';
    }
}

//Máscara para telefone celular
function mascara_celular() {
    var celular = document.getElementById('celular').value;
    if(celular.length==1) {
     document.getElementById('celular').value ='(' + celular;
    } else if (celular.length==3){
     document.getElementById('celular').value = celular +')';
    } else if (celular.length==9){
     document.getElementById('celular').value = celular +'-';
    }
}
