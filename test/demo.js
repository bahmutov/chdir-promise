const la = require('lazy-ass')
const check = require('check-more-types')
const folders = require('..')
// const join = require('path').join
// const parentFolder = join(process.cwd(), '..')

la(check.object(folders), 'expected folders to be an object', folders)
la(check.fn(folders.to), 'expected folders.to to be a function', folders)

folders
  .to(__dirname)
  .then(folders.back)
  .then(() => folders.to(__dirname))
  .then(folders.from)
  .then(() => folders.to(__dirname))
  .then(function () {
    return 'foo'
  })
  .tap(folders.back)
  .then(function (result) {
    la(result === 'foo', 'incorrect result', result)
    console.log('result', result)
  })
  .done()

// .back() returns a promise
// folders
//   .to(parentFolder)
//   .then(function () {
//     return folders.back().then(function () {})
//   })
//   .done()
