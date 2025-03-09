const apiKey = 'R5fwh1O0R3YYAeYs5i0Kw70Z0Fmc6IgDhK6TieIF';
const appId = 'tkjFBrhcX0rN9AlcdyzgFUjwroLm0NZ8xWnntqBi';

const validateHash = '459d311e53524b5da176ebd1c856bbf6';

const url_atas  = 'https://parseapi.back4app.com/classes/atas';
const url_doc_relat_bimestral = 'https://parseapi.back4app.com/classes/doc_relat_bimestral';
const url_repertorios = 'https://parseapi.back4app.com/classes/repertorios';
const url_doc_sef = 'https://parseapi.back4app.com/classes/doc_sef';


//--------------  consulta dados

function apiQueryData( p_url, populateTable, paramsQuery ) {
    new_url = p_url;

    if ( paramsQuery !== undefined  ) {
        const query = {};
        query.where = JSON.stringify(paramsQuery);
        new_url = `${p_url}?${new URLSearchParams(query)}`;
    }

    fetch(new_url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Parse-REST-API-Key': apiKey,
            'X-Parse-Application-Id': appId
        }
    })
    .then(response => {
        if (!response.ok) {
            console.error(response);
            
            throw new Error(`Erro: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        populateTable(data);
    })
    .catch(error => {
        console.error(error);
        
    });
}

//--------------  atualizando dados

function apiQueryUpdate(p_url, p_objectId, p_data, onUpdate) {
    fetch(p_url + "/" + p_objectId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Parse-REST-API-Key': apiKey,
            'X-Parse-Application-Id': appId
        },
        body: JSON.stringify(p_data)
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(errorData => {
                const status_cod = 1;
                const status_msg = `Erro: ${errorData.error}`;
                if (onUpdate !== undefined) {
                    onUpdate(status_cod, status_msg);
                }
            });
        }
        const status_cod = 0;
        const status_msg = "Sucesso";
        if (onUpdate !== undefined) {
            onUpdate(status_cod, status_msg);
        }
    })
    .catch(error => {
        console.error(error);
        if (onUpdate !== undefined) {
            onUpdate(1, `Erro: ${error.message}`);
        }
    });
}



//--------------  excluido dados

function apiQueryDelete(p_url, p_objectId, onDelete) {
    fetch(p_url + "/" + p_objectId, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-Parse-REST-API-Key': apiKey,
            'X-Parse-Application-Id': appId
        }
    })
    .then(response => {
        let status_cod = 0;
        let status_msg = "Sucesso";
        
        if (!response.ok) {
            return response.json().then(errorData => {
                status_cod = 1;
                status_msg = `Erro: ${errorData.error}`;
                if (onDelete !== undefined) {
                    onDelete(status_cod, status_msg);
                }
            });
        }
        
        if (onDelete !== undefined) {
            onDelete(status_cod, status_msg);
        }
    })
    .catch(error => {
        console.error(error);
        if (onDelete !== undefined) {
            onDelete(1, `Erro: ${error.message}`);
        }
    });
}



//--------------  inserindo dados

function apiQueryInsert(p_url, p_data, onInsert) {
    fetch(p_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Parse-REST-API-Key': apiKey,
            'X-Parse-Application-Id': appId
        },
        body: JSON.stringify(p_data)
    })
    .then(response => {
        let status_cod = 0;
        let status_msg = "Sucesso";
        
        if (!response.ok) {
            return response.json().then(errorData => {
                status_cod = 1;
                status_msg = `Erro: ${errorData.error}`;
                if (onInsert !== undefined) {
                    onInsert(status_cod, status_msg);
                }
            });
        }
        
        return response.json().then(dados => {
            status_msg = dados.objectId;
            if (onInsert !== undefined) {
                onInsert(status_cod, status_msg);
            }
        });
    })
    .catch(error => {
        console.error(error);
        if (onInsert !== undefined) {
            onInsert(1, `Erro: ${error.message}`);
        }
    });
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

//------------------------------------------------------------------------
//--------------  criptografias
//------------------------------------------------------------------------


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


function setObjEditable(obj, is_editable) {
    document.getElementById(obj).style.pointerEvents = is_editable ? "auto" : "none";
    document.getElementById(obj).style.userSelect    = is_editable ? "auto" : "none";
}

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

//------------------------------------------------------------------------
// formulario de login generico
//------------------------------------------------------------------------


function login( f ) {
    soc = window.sessionStorage.getItem("soc_user");
    sen = window.sessionStorage.getItem("soc_pass");
    
    if ( soc == null ) {
        alert("Faça Login no App");
        window.location.href = 'login.html';
        return;
    }
    
    if ( encriptarCesar( sen.toLowerCase() ) != s_keys[ soc.toLowerCase() ] ) {
        alert("Senha invalida para sociedade " + soc);
        window.location.href = 'login.html';
        return;
    }

    f();
}


function logged( sociedade, funcOnLogin ) {
    islogged = 1;
    
    soc = window.sessionStorage.getItem("soc_user");
    sen = window.sessionStorage.getItem("soc_pass");
    
    if ( soc == null ) {
        islogged = 0;
    }
    
    else if ( encriptarCesar( sen.toLowerCase() ) !== s_keys[ soc.toLowerCase() ] ) {
        islogged = 0;
    }    
    
    else if ( soc.toLowerCase() != sociedade.toLowerCase() && soc.toLowerCase() !== "conselho" ) {
        islogged = 0;
    }    

    if ( islogged == 0 ) {
        alert("Necessario efetuar login como " + sociedade);
        window.location.href = 'login.html';
    } else {
        funcOnLogin();
    }
}




document.addEventListener("DOMContentLoaded", () => {
    if ( window.location.href.indexOf("atas_view") < 0 ) {
        usr = window.sessionStorage.getItem("soc_user")
        msg = (  usr == null  ) ? "Nao Logado.": `Logado como <b>${usr}</b>`;
        document.body.innerHTML += `<br><hr><div class="top-right-text">${msg}</div><hr>`;
    }
});
