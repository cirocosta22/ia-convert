import cors from "cors"
import express from "express"
import { download } from "./download.js"
import { transcribe } from "./transcribe.js"
import { summarize } from "./summarize.js"
import { convert } from "./convert.js"
const app = express()
app.use(express.json()) //inicialização do express

app.use(cors()) // habilita a conexão com o frontend

app.get("/summary/:id", async (request, response) => {
  //criação de rota
  try {
    await download(request.params.id)
    const audioConvert = await convert()
    console.log(audioConvert)
    const result = await transcribe(audioConvert)
    return response.json({ result })
  } catch (error) {
    return response.json({ error })
  } //devolve resposta
})

app.post("/summary", async (request, response) => {
  const result = await summarize(request.body.text)
  return response.json({ result })
})
app.listen(3333, () => {
  //  escuta as requisições . o numero da porta pode ser qualquer uma

  console.log("server is running on port  3333")
})
