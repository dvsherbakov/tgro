import fetch from 'node-fetch'

const addTodo = async (description: string) => {
  const body = { description: description }
  const response = await fetch('http://localhost:8080/todo', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  console.log('status:', response.status)
  const json = await response.json()
  console.log('response', json)
}
