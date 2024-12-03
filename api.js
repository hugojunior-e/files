const apiKey = 'R5fwh1O0R3YYAeYs5i0Kw70Z0Fmc6IgDhK6TieIF';
const appId = 'tkjFBrhcX0rN9AlcdyzgFUjwroLm0NZ8xWnntqBi';

const url_atas = 'https://parseapi.back4app.com/classes/atas';



async function apiQueryData( p_url, populateTable, paramsQuery ) {
    new_url = p_url;

    if ( paramsQuery !== undefined ) {
        const query = {
            where: JSON.stringify(paramsQuery)
        };
    
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


async function apiQueryUpdate(p_url, p_objectId, p_data) {
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
        alert(`Erro: ${errorData.error}`);
    } else {
        alert('Salvo com Sucesso!');
    }
}


async function apiQueryInsert(p_url, p_data, retornoObjectId) {
    const response = await fetch(p_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Parse-REST-API-Key': apiKey,
            'X-Parse-Application-Id': appId
        },
        body: JSON.stringify( p_data )
    });

    if (!response.ok) {
        const errorData = await response.json();
        alert(`Erro: ${errorData.error}`);
    } else {
        const dados = await response.json();
        alert('Salvo com Sucesso! Id: ' +  dados.objectId  );

        if ( retornoObjectId !== undefined) {
            retornoObjectId(dados.objectId);
        }
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
