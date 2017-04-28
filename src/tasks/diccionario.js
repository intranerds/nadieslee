import request from 'request-promise'
import cheerio from 'cheerio'
import _ from 'lodash'

const isExcluded = text => {
  return _.includes(['Traducciones', 'Véase también'], text)
}

export const buscarSignificado = async palabra => {
  const significados = []
  const html = await request(`http://localhost:9454/${palabra}.html`)
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
    if (elem.name === 'h2' && text !== 'Español') {
      break
    }
    if (elem.name === 'h3') {
      if (Object.prototype.hasOwnProperty.call(currSig, 'etimologia')) {
        significados.push(currSig)
        currSig = newSig()
      }
      currSig.etimologia = text
    }
    if (elem.name === 'h4' && !isExcluded(text)) {
      currSig.tipo = text
    }
    if (elem.name === 'dl' && !isExcluded(text)) {
      currSig.acepciones.push($elem.find('dd').text().trim())
    }
    if ($elem.is('table.inflection-table')) {
      currSig.infleccion = {
        singular: $($elem.find('td')[0]).text().trim(),
        plural: $($elem.find('td')[1]).text().trim()
      }
    }
  }
  significados.push(currSig)
  currSig = newSig()
  console.log(significados)
}
