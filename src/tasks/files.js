import fs from 'fs'
import path from 'path'
import _ from 'lodash'
import Yaml from 'json2yaml'

function promiseAllP(items, block) {
  const ps = []
  items.forEach((item, index) => {
    const fn = (item => {
      return new Promise((resolve, reject) => {
        return block.apply(this, [item, index, resolve, reject])
      })
    })(item, index)

    ps.push(fn)
  })
  return Promise.all(ps)
} // promiseAll

export function readFiles(dirname) {
  return new Promise((resolve, reject) => {
    fs.readdir(dirname, (err, filenames) => {
      // eslint-disable-next-line array-callback-return
      const files = filenames.filter(file => {
        if (file.indexOf('.') > -1) {
          return file
        }
      })
      if (err) {
        return reject(err)
      }
      promiseAllP(files,
        (filename, index, resolve, reject) => {
          fs.readFile(
            path.resolve(dirname, filename), 'utf-8',
            (err, content) => {
              if (err) {
                return reject(err)
              }
              return resolve({ filename, contents: content })
            }
          )
        })
        .then(results => {
          return resolve(results)
        })
        .catch(err => {
          return reject(err)
        })
    })
  })
}

export function saveAsYaml(content, filepath) {
  const contentAsYaml = Yaml.stringify(content)
  fs.writeFileSync(filepath, contentAsYaml)
}

export function saveAsJs(content, filepath) {
  const contentAsJsonStr = content
  if (!_.isString(contentAsJsonStr)) {
    const contentAsJsonStr = JSON.stringify(content, null, 2)
  }

  fs.writeFileSync(
    filepath,
`
// AUTOGENERADO - No editar
export default ${contentAsJsonStr}
`
  )
}
