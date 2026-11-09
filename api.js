const validateHash = '459d311e53524b5da176ebd1c856bbf6';
const url_atas  = 'atas';
const url_repertorios = 'repertorio';
const url_doc_sef = 'doc_sef';
const applicationId = "te9QqZVo3HJ51JT9JFhFgz9kbNhENh8KroHGlohe";
const apiRestKey = "PsteTWDkTPQiKw1s5Nq8XadII9Gmla4DEpuGkX2A";


//################################################################################################
// OPERACOES COM O BANCO DE DADOS
//################################################################################################

// SELECT

async function apiQueryData(p_url, populateTable, paramsQuery = {}) {
    const limit = 1000;
    let skip = 0;
    let allResults = [];
    let results;
    try {
        do {
            const params = new URLSearchParams({
                limit: limit,
                skip: skip,
                ...paramsQuery
            });

            const response = await fetch(
                `https://parseapi.back4app.com/classes/${p_url}?${params}`,
                {
                    method: "GET",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "X-Parse-Application-Id": applicationId,
                        "X-Parse-REST-API-Key": apiRestKey
                    }
                }
            );

            if (!response.ok) {
                const result = await response.json();
                populateTable(1, `${response.status} - ${result.error}`, {});
                return;
            }
            const data = await response.json();
            results = data.results || [];
            allResults.push(...results);
            console.log(`Registros encontrados: ${allResults.length}`);
            skip += results.length;
        } while (results.length === limit);

        populateTable(0, 'Sucesso', { results: allResults });
    } catch (error) {
        populateTable(1, error.message, {});
    }
}

// UPDATE

async function apiQueryUpdate(p_url, p_objectId, p_data, onUpdate) {
    try {
        const response = await fetch(
            `https://parseapi.back4app.com/classes/${p_url}/${p_objectId}`,
            {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "X-Parse-Application-Id": applicationId,
                    "X-Parse-REST-API-Key": apiRestKey
                },
                body: JSON.stringify(p_data)
            }
        );
        if (!response.ok) {
           const result = await response.json();
           onUpdate(1, `${response.status} - ${result.error}`);
           return;
        }
        onUpdate(0,`${response.status} - Atualizado com sucesso!`);
    } catch (error) {
        onUpdate(1, error.message);
    }
}


// DELETE

async function apiQueryDelete(p_url, p_objectId, onDelete) {
    try {
        const response = await fetch(
            `https://parseapi.back4app.com/classes/${p_url}/${p_objectId}`,
            {
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "X-Parse-Application-Id": applicationId,
                    "X-Parse-REST-API-Key": apiRestKey
                }
            }
        );
        if (!response.ok) {
           const result = await response.json();
           onDelete(1, `${response.status} - ${result.error}`) ;
           return;
        }
        onDelete(0,`${response.status} - Deletado com sucesso!`);
    } catch (error) {
        onDelete(1, error.message);
    }        
}


// INSERT

async function apiQueryInsert(p_url, p_data, onInsert) {
    try {
        const response = await fetch(
            `https://parseapi.back4app.com/classes/${p_url}`,
            {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "X-Parse-Application-Id": applicationId,
                    "X-Parse-REST-API-Key": apiRestKey
                },
                body: JSON.stringify(p_data)
            }
        );
        if (!response.ok) {
           const result = await response.json();
           onInsert(1, `${response.status} - ${result.error}`) ;
           return;
        }
        onInsert(0,`${response.status} - Inserido com sucesso!`);
    } catch (error) {
        onInsert(1, error.message);
    }     
}




//################################################################################################
//
//################################################################################################



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


window.onload = function() {
    if ( window.location.href.indexOf("atas_view") < 0 ) {
        usr = window.sessionStorage.getItem("soc_user")
        msg = (  usr == null  ) ? "Nao Logado.": `Logado como <b>${usr}</b>`;
        el = document.getElementById("usuarioLogado");
        if ( el != null ) {
          el.innerHTML = `<br><hr><div class="top-right-text">${msg}</div><hr>`;
        }
    }
};

