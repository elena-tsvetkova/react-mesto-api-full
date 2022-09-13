
class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status} ${res.text().then(text => { throw new Error(text) })}`)
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {...this._headers, 'authorization': `Bearer ${localStorage.getItem('token')}`}
    })
    .then(this._checkResponse)
  }

  setUserInfoApi(userData) { 
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {...this._headers, 'authorization': `Bearer ${localStorage.getItem('token')}`},
      body: JSON.stringify({
        name: userData.name,
        about: userData.about
      })
    })
    .then(this._checkResponse)
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: {...this._headers, 'authorization': `Bearer ${localStorage.getItem('token')}`}
    })
    .then(this._checkResponse)
  }

  addCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {...this._headers, 'authorization': `Bearer ${localStorage.getItem('token')}`},
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(this._checkResponse)
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: {...this._headers, 'authorization': `Bearer ${localStorage.getItem('token')}`}
    })
    .then(this._checkResponse)
  }

  like(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: 'PUT',
      headers: {...this._headers, 'authorization': `Bearer ${localStorage.getItem('token')}`}
    })
    .then(this._checkResponse)
  }

  dislike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: {...this._headers, 'authorization': `Bearer ${localStorage.getItem('token')}`}
    })
    .then(this._checkResponse)
  }

  updateAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {...this._headers, 'authorization': `Bearer ${localStorage.getItem('token')}`},
      body: JSON.stringify({
        avatar: data.avatar,
      })
    })
    .then(this._checkResponse)
  }


  getAllNeededData() {
    return Promise.all([
      this.getInitialCards(),
       this.getUserInfo(),
      ])
  }

}

const api = new Api({
  baseUrl: 'https://api.elena.domainname.students.nomoredomains.sbs',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
}); 

export default api;