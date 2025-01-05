const apiKey = 'R5fwh1O0R3YYAeYs5i0Kw70Z0Fmc6IgDhK6TieIF';
const appId = 'tkjFBrhcX0rN9AlcdyzgFUjwroLm0NZ8xWnntqBi';

const validateHash = '459d311e53524b5da176ebd1c856bbf6';

const url_atas  = 'https://parseapi.back4app.com/classes/atas';
const url_repertorios = 'https://parseapi.back4app.com/classes/repertorios';
const url_doc_sef = 'https://parseapi.back4app.com/classes/doc_sef';


//--------------  consulta dados

async function apiQueryData( p_url, populateTable, paramsQuery ) {
    new_url = p_url;

    if ( paramsQuery !== undefined  ) {
        const query = {};
        query.where = JSON.stringify(paramsQuery);
        new_url = `${p_url}?${new URLSearchParams(query)}`;
    }
    
    const response = await fetch(new_url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Parse-REST-API-Key': apiKey,
            'X-Parse-Application-Id': appId
        }
    });

    if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
    }

    const data = await response.json();
    populateTable(data);
}

//--------------  atualizando dados

async function apiQueryUpdate( p_url, p_objectId, p_data, onUpdate ) {
    const response = await fetch(p_url + "/" + p_objectId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Parse-REST-API-Key': apiKey,
            'X-Parse-Application-Id': appId
        },
        body: JSON.stringify( p_data )
    });
    
    
        
    if (!response.ok) {
        const errorData = await response.json();
        status_cod = 1;
        status_msg = `Erro: ${errorData.error}`;
    } else {
        status_cod = 0;
        status_msg = "Sucesso";
    }        

    if ( onUpdate !== undefined) {
        onUpdate(status_cod, status_msg);
    }           
}


//--------------  excluido dados

async function apiQueryDelete(p_url, p_objectId, onDelete) {
    const response = await fetch(p_url + "/" + p_objectId, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-Parse-REST-API-Key': apiKey,
            'X-Parse-Application-Id': appId
        }
    });

    status_cod = 0;
    status_msg = "Sucesso";
    
    if (!response.ok) {
        const errorData = await response.json();
        status_cod = 1;
        status_msg = `Erro: ${errorData.error}`;
    } 
    
    if ( onDelete !== undefined) {
        onDelete(status_cod, status_msg);
    }        
}


//--------------  inserindo dados

async function apiQueryInsert(p_url, p_data, onInsert) {
    const response = await fetch(p_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Parse-REST-API-Key': apiKey,
            'X-Parse-Application-Id': appId
        },
        body: JSON.stringify( p_data )
    });

    status_cod = 0;
    status_msg = "Sucesso";
    
    if (!response.ok) {
        const errorData = await response.json();
        status_cod = 1;
        status_msg = `Erro: ${errorData.error}`;
    } else {
        const dados = await response.json();
        status_msg = dados.objectId;
    }
    
    if ( onInsert !== undefined) {
        onInsert(status_cod, status_msg);
    }
}






const meses = [
    "janeiro", "fevereiro", "março", "abril",
    "maio", "junho", "julho", "agosto",
    "setembro", "outubro", "novembro", "dezembro"
];

const numerosPorExtenso = [
    "zero", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove", 
    "dez", "onze", "doze", "treze", "quatorze", "quinze", "dezesseis", "dezessete", 
    "dezoito", "dezenove", "vinte", "vinte e um", "vinte e dois", "vinte e três", 
    "vinte e quatro", "vinte e cinco", "vinte e seis", "vinte e sete", "vinte e oito", 
    "vinte e nove", "trinta", "trinta e um", "trinta e dois", "trinta e três", 
    "trinta e quatro", "trinta e cinco", "trinta e seis", "trinta e sete", 
    "trinta e oito", "trinta e nove", "quarenta", "quarenta e um", "quarenta e dois", 
    "quarenta e três", "quarenta e quatro", "quarenta e cinco", "quarenta e seis", 
    "quarenta e sete", "quarenta e oito", "quarenta e nove", "cinquenta", 
    "cinquenta e um", "cinquenta e dois", "cinquenta e três", "cinquenta e quatro", 
    "cinquenta e cinco", "cinquenta e seis", "cinquenta e sete", "cinquenta e oito", 
    "cinquenta e nove"
];



const obterDataAtual = () => {
  const data = new Date();
  const dia = String(data.getDate()).padStart(2, '0'); // Garantir dois dígitos
  const mes = String(data.getMonth() + 1).padStart(2, '0'); // Meses começam em 0
  const ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
};  


//--------------  criptografias

const chave  = 3;
const s_keys = {
    "conselho":'ljuhmd5358&',
    "ump":'xpsC5358&',
    "uph":'Cxsk47:',
    "ucp":'xfsnlgv5358',
    "junta_diaconal":'plvhulfrugldC5358',
    "saf":'dx{loldgrudvClse',
    "upj":'ydlCxsm&'
};

function encriptarCesar(texto) {
    return texto.split('').map(char => {
        const codigo = char.charCodeAt(0);
        // Aplica o deslocamento na tabela ASCII
        return String.fromCharCode(codigo + chave);
    }).join('');
}

// Função para desencriptar texto usando a Cifra de César
function desencriptarCesar(textoEncriptado) {
    return textoEncriptado.split('').map(char => {
        const codigo = char.charCodeAt(0);
        // Reverte o deslocamento na tabela ASCII
        return String.fromCharCode(codigo - chave);
    }).join('');
}

function login( f ) {
    soc = window.sessionStorage.getItem("login");
    sen = window.sessionStorage.getItem("secret");
    
    if ( soc == null ) {
        alert("Faça Login no App de Atas");
        window.location.href = 'atas.html';
        return;
    }
    
    if ( encriptarCesar( sen.toLowerCase() ) != s_keys[ soc.toLowerCase() ] ) {
        alert("Senha invalida para sociedade " + soc);
        window.location.href = 'atas.html';
        return;
    }

    f();
}
