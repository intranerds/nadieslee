import fs from 'fs'
import path from 'path'

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
      if (err) {
        return reject(err)
      }
      promiseAllP(filenames,
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
