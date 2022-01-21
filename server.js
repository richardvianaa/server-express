const express = require('express');

const app = express();

app.use(express.json());

let usuarios = [];

app.get('/usuarios', (req, res) => {
  return res.json(usuarios);
});

app.post('/usuarios', (req, res) => {
  const { nome, sobrenome } = req.body;

  const usuario = {
    nome,
    sobrenome
  };

  usuarios.push(usuario);

  return res.json(usuarios);
});

app.patch('/usuarios/:nome', (req, res) => {
  const { nome } = req.params;

  const { nome: novoNome, sobrenome: novoSobrenome } = req.body;

  let usuario = usuarios.find((usu) => usu.nome === nome);
  
  if (novoNome) {
    usuario.nome = novoNome;
  }
  if (novoSobrenome) {
    usuario.sobrenome = novoSobrenome;
  }

  res.json(usuarios);
});

app.delete('/usuarios/:nome', (req, res) => {
  const { nome } = req.params;

  const novaLista = usuarios.filter((usu) => usu.nome !== nome);
  usuarios = novaLista;

  res.json(usuarios);
})

app.listen(3000, () => {
  console.log('Servidor aberto na porta 3000');
});