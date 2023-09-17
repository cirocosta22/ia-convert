const url = document.getElementById("url")
const form = document.querySelector("#form")
const content = document.querySelector("#content")
import { server } from "./server.js"
form.addEventListener("submit", async (event) => {
  event.preventDefault()

  const videoUrl = url.value

  if (!videoUrl.includes("shorts")) {
    return (content.textContent = "esse video nao parece ser um shorts")
  }
  const [_, params] = videoUrl.split("/shorts/") //vai cortar o que vem antes e depois do short
  const [videoID] = params.split("?si")
  content.textContent = "obtendo o texto do audio"

  const transcription = await server.get("/summary/" + videoID)

  content.textContent = "realizando o resumo"

  const summary = await server.post("/summary", {
    text: transcription.data.result,
  })
  content.textContent = summary.data.result
})
