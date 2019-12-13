import csv from "csvtojson"
import deepMerge from "./deepMerge.js"

const parseCsvFile = async (filePath, targetLangCodes) => {
  const rawJson = await csv({
    noheader: false,
    trim: true
  }).fromFile(filePath)

  const result = []

  for (let i = 0; i < targetLangCodes.length; i++) {
    const langCode = targetLangCodes[i]
    const langValueKey = `value_${langCode}`

    const json = rawJson.map(x => {
      const { namespace, prefix, key } = x
      const currentData = { [namespace]: { [prefix]: { [key]: x[langValueKey] } } }
      return currentData
    })

    const data = deepMerge(...json)

    result.push(data)
  }

  return result
}

export default parseCsvFile
