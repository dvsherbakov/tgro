fetch('http://localhost:8080/todo', {
  method: 'POST',
  body: JSON.stringify({
    description: 'One bottle of milk',
    body: 'bar',
    userId: 1,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((res) => res.json())
  .then(console.log)
