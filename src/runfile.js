// import { run } from 'runjs'
import 'babel-polyfill'
import { extraerPalabras as ep } from './tasks/textos'

export const extraerPalabras = () => {
  ep()
}
//
// export function createcomponent(name) {
//   console.log(name)
// }

// export function lint(path = '.', options = {}) {
//   options.fix ? run(`eslint ${path} --fix`) : run(`eslint ${path}`)
// }
