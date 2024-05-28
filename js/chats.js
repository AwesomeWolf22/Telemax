var input = document.getElementById('input');
var chat = document.getElementById('responses');
var stage = 0;
var disponivel = null;
var name = null;

//Verifica se o input esta em foco, e ao clicar em Enter
//e o input estiver diferente de vazio executa a função

input.addEventListener('keydown', function (e) {
    if(e.code === "Enter") {
        var response = input.value;
        if(response != "") {
            send(response)
        }
    }
});

function send(text) {
    const mesage = document.createElement('p');
    mesage.className = "user-response";
    mesage.textContent = text;
    document.getElementById('responses').appendChild(mesage);

    input.value = "";
    response(text.toLowerCase())
}

function end(){
    stage = 999;
    input.className = "lock"
    input.disabled = true;
    input.placeholder = "Conversa encerrada!"
}

function response(text) {

    console.log(stage);
    console.log(disponivel);

    setTimeout(function(){
        var response = "Desculpe, eu não entendi"
        var response2 = null;
        var link = null;

        if(stage === 0 && disponivel === null) {
            if(text === "08290-110" || text === "08290110") {
                response = "Olá! Temos uma boa notícia: o plano escolhido está disponível para sua região."
                stage++;
                disponivel = true;
                response2 = "Para continuar seu atendimento, por favor nos informe seu Nome"
            } else {
                response = "Cep indisponivel, deseja tentar verificar novamente?"
                disponivel = false;
            }
        }else if(stage === 1 && disponivel === true) {
            name = text;
            response = "Se você gostaria de consultar um dos nossos funcionários para obter mais informações, digite Sim ou Não para encerrar o atendimento"
            stage++;
        }else if(stage === 2 && disponivel === true) {
            if(text === "sim") {
                response = "Para continuar com o seu atendimento, vou te encaminhar para o WhatsApp de um de nossos atendentes. Clique no link abaixo para prosseguir com o seu atendimento."
                link = "https://wa.me/27997257509"
                end();
            } else if(text === "não" || text === "nao") {
                response = "Uma pena que decidiu não seguir com os serviços da TeleMax. Volte sempre, estaremos de braços abertos para atendê-lo."
                end();
            }

        }else if(stage === 0 && disponivel === false) {
            if(text === "sim") {
                response = "Poderia escrever seu CEP novamente"
                disponivel = null;
            }
        }else if(text === "não" || text === "nao") {
            response = "Uma pena que decidiu não seguir com os serviços da TeleMax. Volte sempre, estaremos de braços abertos para atendê-lo"
            end();
        }else if(stage === 999) {
            end();
        }

        

        const mesage = document.createElement('p');
        mesage.className = "response";
        mesage.textContent = response;
        document.getElementById('responses').appendChild(mesage);

        setTimeout(function(){
            if(response2 != null) {
                const mesage = document.createElement('p');
                mesage.className = "response";
                mesage.textContent = response2;
                document.getElementById('responses').appendChild(mesage);
            }else if(link != null){
                const mesage = document.createElement('a');
                mesage.className = "response";
                mesage.href = link;
                mesage.textContent = "> Fale com um dos nossos vendedores <";
                document.getElementById('responses').appendChild(mesage);
            }
        }, 800)

    }, 800)

    
    
}

//!! Coloclar resposta para não
//!! Botão do "Eu quero" para ir pro chat
//!! A cor da letra do "Eu quero é Branco"
//!! Fluxo do chat está na documentação página 2
//!! https://docs.google.com/document/d/1TMD-lZI2fhgOqnMgMX80wMlBkX94X9-AAd6QBCPwQeo/edit#heading=h.z6ne0og04bp5
//!! link https://wa.me/27997257509