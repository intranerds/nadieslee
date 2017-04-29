import request from 'request-promise'
import cheerio from 'cheerio'
import _ from 'lodash'
import sort from 'sort-keys'

import { extraerPalabras, puntuactionMarksRegExp } from './textos'

require('dotenv').config()

const isExcluded = text => {
  return _.includes(['Traducciones', 'Véase también', 'Locuciones'], text)
}

export const buscarSignificado = async palabra => {
  const significados = []

  let html
  try {
    html = await request(
      `${process.env.DICCIONARIO_URL}/${encodeURI(palabra)}.html`
    )
  } catch (err) {
    console.error(`Palabra no encontrada: ${palabra}`)
    return {
      palabra,
      significados: []
    }
  }

  const $ = cheerio.load(html)
  const $content = $('#mw-content-text')[0]
  const children = $content.children

  const newSig = () => {
    return { acepciones: [] }
  }

  let currSig = newSig()
  for (let i = 1; i < children.length; i++) {
    const elem = children[i]
    const $elem = $(elem)

    const text = $elem.text().trim()
    if (elem.name === 'h1' && text !== 'Español') {
      break
    }
    if (elem.name === 'h2' && text !== 'Español') {
      break
    }
    if (elem.name === 'h3' && !isExcluded(text)) {
      if (
        // Object.prototype.hasOwnProperty.call(currSig, 'etimologia') ||
        _.isEqual(currSig, newSig())
      ) {
        if (Object.values(currSig).length > 1) { // acepciones
          significados.push(currSig)
          currSig = newSig()
        }
        // currSig.etimologia = undefined
      }
    }
    // if (elem.name === 'p' && !isExcluded(text)) {
    //   if (
    //     Object.prototype.hasOwnProperty.call(currSig, 'etimologia') &&
    //     currSig.etimologia === undefined
    //   ) {
    //     console.log(currSig.etimologia)
    //     currSig.etimologia = text
    //   }
    // }
    if (elem.name === 'h4' && !isExcluded(text)) {
      currSig.tipo = text
    }
    if (elem.name === 'dl' && !isExcluded(text)) {
      const $dd = $elem.find('dd')
      const acepcion = $dd.text().trim().toString()
      if (
        acepcion.startsWith('Forma del plural de')
      ) {
        const link = acepcion
          .replace('Forma del plural de', '')
          .replace(puntuactionMarksRegExp, '')
          .trim()
        // FIXME: linkear al significado real
        console.log('--- link to', link)
      }
      currSig.acepciones.push(acepcion)
    }
    if ($elem.is('table.inflection-table')) {
      // FIXME: inflecciones completas
      currSig.infleccion = {
        singular: $($elem.find('td')[0]).text().trim(),
        plural: $($elem.find('td')[1]).text().trim()
      }
    }
  }
  significados.push(currSig)
  currSig = newSig()

  return {
    palabra,
    significados
  }
}

export const crear = async () => {
  const diccionario = {}
  const significadosPromises = []
  const palabras = await extraerPalabras()
  _.each(palabras, p => {
    significadosPromises.push(buscarSignificado(p))
  })
  const resultados = await Promise.all(significadosPromises)
  resultados.forEach(({ palabra, significados }) => {
    diccionario[palabra] = significados
  })
  return sort(diccionario)
}
