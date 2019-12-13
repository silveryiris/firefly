import fs from "fs"
import program from "commander"
import chalk from "chalk"
import convert from "./libs/csv.js"

const saparate = (times = 50) => {
  const base = "-"
  console.log()
  console.log(base.repeat(times))
  console.log()
}

const parseLangaugeCodeString = codeString => {
  return codeString.split(",").map(x => x.trim())
}

const printStartTime = () => {
  console.log(new Date())
}

export const cli = async argsArray => {
  program
    .version("0.0.1")
    .name(chalk.redBright("firefly"))
    .description(
      chalk.cyanBright("Load csv file to json Object style files for i18n.") +
        chalk.blueBright(" by Wen Wei,Chang 2019/12")
    )

  program.usage(chalk.cyanBright("parse <csvFilePath> [ langCode1, langCode2, ... ]"))

  program
    .command("parse <source> [codeString]")
    .description("Parse csv to json by value_[langCode] columns on csv file. [codeString] is saparete by ','")
    .action(async (source, codeString) => {
      printStartTime()

      const defaultLanguageCodes = ["tw", "en", "cn"]
      const languageCodes = codeString ? parseLangaugeCodeString(codeString) : defaultLanguageCodes

      const result = await convert(source, languageCodes)

      console.log(chalk.greenBright("\nStart process with: "), chalk.yellow(languageCodes.join(" , ")))

      saparate()

      languageCodes.forEach((code, index) => {
        fs.writeFile(`${code}.json`, JSON.stringify(result[index]), "utf8", err => {
          if (err) throw err
          console.log(chalk.yellow(code), " is converted to json file.")
        })
      })
    })

  program.parse(argsArray)

  if (argsArray.length < 3) {
    program.help()
  }
}
