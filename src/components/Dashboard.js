const token = localStorage.getItem('token');

const response = await axios.get('http://localhost:5000/api/protected', {
  headers: { Authorization: token }
});

console.log(response.data);
