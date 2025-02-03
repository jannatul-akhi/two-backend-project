import express from "express"
const app = express()
const port = 4000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {

  const db_url=mongoose.connect(process.env.DB_URL)
  console.log(`Example app listening on port ${port, db_url}`)
})