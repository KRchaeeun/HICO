import { http } from '@/axios'

const api = {
    point: '/point',
    ask : '/point/require'
}

async function point(){
    return await http.get(api.point)
}
async function ask(balance: number , frBalance : number, countryId: number) {
    const requestBody = {
        balance: balance,
        frBalance: frBalance,
        countryId: countryId
    };
    // Sending a POST request with requestBody as the payload
    return await http.post(api.ask, requestBody);
}

export{point, ask}