// import { run } from 'runjs'
// eslint-disable-next-line import/no-unassigned-import
import 'babel-polyfill'
import { crear } from './tasks/diccionario'
import { saveAsYaml } from './tasks/files'

require('dotenv').config()

export const diccionarioCrear = async () => {
  const diccionario = await crear()
  saveAsYaml(diccionario, process.env.DICCIONARIO_DEST_FILE)
}
