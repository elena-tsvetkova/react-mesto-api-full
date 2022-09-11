export const BASE_URL = 'https://api.elena.domainname.students.nomoredomains.sbs';

const responseCheck = (response) => response.ok ? response.json() : Promise.reject(`Ошибка ${response.status}`);

export const register = ({password, email}) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "password": password,
            "email": email
        })
    })
        .then(responseCheck)
};

export const authorize = ({password, email}) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "password": password,
            "email": email
        })
    })
        .then(responseCheck)
        .then((data) => {
            localStorage.setItem('jwt', data.token);
            return data;
        })
};

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
        .then(responseCheck)
}