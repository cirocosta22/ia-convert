import ytdl from "ytdl-core"
import fs from "fs"

export const download = (videoId) =>
  new Promise((resolve, reject) => {
    const videoUrl = "https://www.youtube.com/shorts/" + videoId
    console.log("realizando dowload do video", videoId)
    ytdl(videoUrl, { quality: "lowestaudio", filter: "audioonly" })
      .on("info", (info) => {
        const seconds = info.formats[0].approxDurationMs / 1000
        console.log(seconds)
        //console.log(info)

        if (seconds > 60) {
          throw new Error("a duração desse video é maior que 60 segundos")
        }
      })
      .on("end", () => {
        console.log("Download do video finalizado.")
        resolve()
      })
      .on("error", (error) => {
        console.log(
          "nao foi possivel fazer o download do video. detalhes do erro:",
          error
        )
        reject(error)
      })
      .pipe(fs.createWriteStream("./tmp/audio.mp4"))
  })
