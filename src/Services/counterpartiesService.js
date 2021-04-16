// import Counterparties from "../components/Counterparties/Counterparties";

const URL = process.env.REACT_APP_API + 'CounterpartiesApi';

export const getAll = () => {
    return fetch(URL)
        .then(res => res.json())
        .catch((error) => {
            console.log(error)
        })
}

export const getById = (counterpartyId) => {
    return fetch(`${URL}/${counterpartyId}`)
        .then(res => res.json())
        .catch(error => console.log(error));
}

export const post = () => {
    return fetch
}