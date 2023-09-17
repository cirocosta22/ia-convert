import { transcriptionExample } from "./utils/transcription.js"
import { Pipeline, pipeline } from "@xenova/transformers"
export async function transcribe(audio) {
  try {
    console.log("realizando transcrição do video ")
    const transcribe = await pipeline(
      "automatic-speech-recognition",
      "Xenova/whisper-small"
    )
    const transcription = await transcribe(audio, {
      chunk_length_s: 30,
      stride_length_s: 5,
      languages: "portuguese",
      task: "transcribe",
    })

    console.log("transcrição finalizada")
    return transcription?.text.replace("[Música]", "")
  } catch (error) {
    throw new Error()
  }
}
