// import { run } from 'runjs'
// eslint-disable-next-line import/no-unassigned-import
import 'babel-polyfill'
import path from 'path'
import _ from 'lodash'

import { crear, leerAsJson } from './tasks/diccionario'
import { saveAsYaml, saveAsJs } from './tasks/files'
import { preprocesar } from './tasks/textos'

require('dotenv').config()

export const diccionarioCrear = async () => {
  const diccionario = await crear()
  saveAsYaml(diccionario, process.env.DICCIONARIO_FILEPATH)
}

export const diccionarioInstalar = async () => {
  const result = await leerAsJson()
  saveAsJs(result, process.env.DICCIONARIO_PROCESADO_FILEPATH)
}

export const textosInstalar = async () => {
  const textoComponentFile = id => {
    return path.join(process.env.TEXTOS_PROCESADOS_DIR, `${id}.js`)
  }
  const data = await preprocesar()
  _.each(_.keys(data), id => {
    const code = data[id]
    saveAsJs(
      `() => {
  const Pagina = require('../../containers/Pagina')
  const W = require('../../containers/Palabra')
  const T = require('../../containers/Token')
  return (
    <Pagina>
      ${code}
    </Pagina>
  )
}
      `,
      textoComponentFile(id)
    )
  })

  let indexContent = ''
  _.each(_.keys(data), id => {
    indexContent += `"${id}": require("${textoComponentFile(id)}"),\n`
  })

  saveAsJs(
    `{ ${indexContent} }`,
    path.join(process.env.TEXTOS_PROCESADOS_DIR, 'index.js')
  )
}
