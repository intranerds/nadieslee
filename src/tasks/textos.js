/* eslint-disable no-useless-escape */

import fs from 'fs'
import path from 'path'
import _ from 'lodash'
import S from 'string'
import frontMatter from 'front-matter'

import diccionario from '../app/content/diccionario'

import { readFiles } from './files'

require('dotenv').config()

export const getStopWords = () => {
  const text = fs.readFileSync(
    path.join(process.env.STOPWORDS_FILEPATH)
  ).toString()
  return text.split('\n')
}

const mdToJson = f => {
  const fm = frontMatter(f.contents)
  const { body, attributes } = fm
  const id = S(attributes.titulo).slugify().s

  return {
    slug: id,
    content: _.extend(
      { id },
      attributes,
      { body }
    )
  }
}

export const crearEstructura = async () => {
  const data = {}
  const files = await readFiles(process.env.TEXTOS_FOLDER)
  _.each(files, f => {
    const { slug, content } = mdToJson(f)
    data[slug] = content
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

const tokenize = f => {
  let code = ''
  const { slug, content } = mdToJson(f)
  const parrafos = content.body.split('\n\n')
  for (let i = 0; i < parrafos.length; i++) {
    const p = parrafos[i]
    const tokens = p.split(' ')
    const pcode = tokens.map(p => {
      const limpio = p.replace(puntuactionMarksRegExp, '')
      if (Object.prototype.hasOwnProperty.call(diccionario, limpio)) {
        return `\t\t<W it="${p} " />\n`
      }
      return `\t\t<T>${p} </T>\n`
    })
    code += `
\t<P>\n${pcode.join('')}\n\t</P>\n
    `
  }
  return { slug, code }
}

export const preprocesar = async () => {
  const data = {}
  const files = await readFiles(process.env.TEXTOS_FOLDER)
  _.each(files, f => {
    const { slug, code } = tokenize(f)
    const { slug2, content } = mdToJson(f)
    const parrafos = content.body.split('\n\n')
    data[slug] = data[slug] || {...content, code: ''}
    data[slug].code += code
  })
  return data
}
