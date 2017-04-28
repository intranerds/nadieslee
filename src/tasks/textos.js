import fs from 'fs'
import path from 'path'
import _ from 'lodash'
import S from 'string'
import frontMatter from 'front-matter'
import { readFiles } from './files'

export const getStopWords = () => {
  const text = fs.readFileSync(
    path.join(__dirname, './stopwords.txt')
  ).toString()
  return text.split('\n')
}

export const crearEstructura = async () => {
  const data = {}
  const files = await readFiles(path.join(__dirname, '../../content/textos/'))
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

const puntuactionMarksRegExp = new RegExp(
  // eslint-disable-next-line no-useless-escape
  '[\.’\'\[\](){}⟨⟩:,،、‒–—―…!.‹›«»‐\-?‘’“”\'";/⁄·\&*@\•^†‡°”¡¿' +
  '※#№÷×ºª%‰+−=‱¶′″‴§~_|‖¦©℗®℠™¤₳฿₵¢₡₢$₫₯֏₠€ƒ₣₲₴₭₺₾ℳ₥₦₧₱₰£៛₽₹₨₪৳₸₮₩¥]',
  'ig'
)

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

  console.log(palabras)
}
