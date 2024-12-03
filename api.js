const apiKey = 'R5fwh1O0R3YYAeYs5i0Kw70Z0Fmc6IgDhK6TieIF';
const appId = 'tkjFBrhcX0rN9AlcdyzgFUjwroLm0NZ8xWnntqBi';

const url_atas = 'https://parseapi.back4app.com/classes/atas';



async function apiQueryData( p_url, populateTable ) {
    try {
        const response = await fetch(p_url, {
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
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
}
