import express from 'express'
import './database'

const app = express()

app.get('/', (req, res) => {
  return res.json('Server Running')
})

app.post('/algo', (req, res) => {
  return res.json({ message: 'Usuário violado com sucesso' })
})

app.listen(3333, () => console.log('🔥 Server Listening on http://localhost:3333'))
