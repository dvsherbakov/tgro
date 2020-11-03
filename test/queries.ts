import fetch from 'node-fetch'
import { IUserInterface } from '../server/user.model'

const addTodo = async (description: string) => {
  const body = { description: description }
  const response = await fetch('http://localhost:8080/todo', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  if (response.status === 200) {
    const json = await response.json()
    console.log('response', json)
    return json
  } else {
    return false
  }
}

// addTodo('Молоко верблюжье')

const registerUser = async (body: IUserInterface) => {
  const response = await fetch('http://localhost:8080/auth/register', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  if (response.status === 201) {
    const json = await response.json()
    console.log('response', json)
    return json
  } else return false
}

// registerUser({
//   email: 'ds@tura.ru',
//   password: 'gzaktpf6',
//   firstName: 'Дмитрий',
//   middleName: 'Васильевич',
//   lastName: 'Щербаков',
// })

const auth = async (email: string, password: string) => {
  const body = { email, password }
  const response = await fetch('http://localhost:8080/api/auth', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  if (response.status === 200) {
    const json = await response.json()
    return json
  } else return false
}

// auth('ds@tura.ru', 'gzaktpf6').then((json) => {
//   const { accessToken, refreshToken, userId } = json

//   console.log(accessToken, refreshToken, userId)
// })

//npx ts-node test/queries.ts
