import { summaryExample } from "./utils/summary.js"
import { pipeline } from "@xenova/transformers"
export async function summarize(text) {
  try {
    console.log("realizando o resumo...")

    const generator = await pipeline(
      "summarization",
      "Xenova/distilbart-cnn-12-6"
    )
    const output = await generator(text)
    console.log("resumo concluido com sucesso")
    return output[0].summary_text
  } catch (error) {
    console.log("nao foi possivel realizar o resumo")
    throw new Error(error)
  }
}
