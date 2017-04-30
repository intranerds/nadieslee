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
    const code = data[id].code
    saveAsJs(
      `() => {
  return (
    <Pagina>
      ${code}
    </Pagina>
  )
}
      `,
      textoComponentFile(id),
`
import React from 'react'
import Pagina from '../../containers/Pagina'
import P from '../../containers/Parrafo'
import T from '../../containers/Token'
import W from '../../containers/Palabra'`
    )
  })

  let indexContent = ''
  _.each(_.keys(data), id => {
    const t = data[id]
    
    indexContent += `
"${id}": {
  titulo: '${t.titulo}',
  autor: '${t.autor}',
  anio: '${t.anio}',
  link: '${t.link}',
  palabrasCount: ${t.body.replace('\n\n', '').split(' ').length},
  component: require("./${id}.js").default,\n
},`
  })

  saveAsJs(
    `{ ${indexContent} }`,
    path.join(process.env.TEXTOS_PROCESADOS_DIR, 'index.js')
  )
}
