/* eslint-disable no-useless-escape */

import fs from 'fs'
import path from 'path'
import _ from 'lodash'
import S from 'string'
import frontMatter from 'front-matter'
import { readFiles } from './files'

require('dotenv').config()

export const getStopWords = () => {
  const text = fs.readFileSync(
    path.join(process.env.STOPWORDS_FILEPATH)
  ).toString()
  return text.split('\n')
}

export const crearEstructura = async () => {
  const data = {}
  const files = await readFiles(process.env.TEXTOS_FOLDER)
  _.each(files, f => {
    const fm = frontMatter(f.contents)
    const { body, attributes } = fm
    const id = S(attributes.titulo).slugify().s

    data[id] = _.extend(
      { id },
      attributes,
      { body }
    )
  })
  return data
}

export const puntuactionMarksRegExp =
  // eslint-disable-next-line max-len
  /[\.’'\[\](){}⟨⟩:,،、‒–—―…!.‹›«»‐\-?‘’“”\'";⁄·\&*@\•^†‡°”¡¿※#№÷×ºª%‰+−=‱¶′″‴§~_|‖¦©℗®℠™¤₳฿₵¢₡₢$₫₯֏₠€ƒ₣₲₴₭₺₾ℳ₥₦₧₱₰£៛₽₹₨₪৳₸₮₩¥]/ig

export const extraerPalabras = async () => {
  const data = await crearEstructura()
  let palabras = []
  _.each(_.values(data), texto => {
    let { body } = texto
    body = body.toLowerCase()
      .replace(puntuactionMarksRegExp, '')
      .replace(/\n/g, ' ').trim()
    let allWords = body.split(' ')
    allWords = _.without(allWords, ...getStopWords())
    palabras = _.union(palabras, allWords)
  })

  return palabras
}
