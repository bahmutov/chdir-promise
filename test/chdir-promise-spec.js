const la = require('lazy-ass')
const is = require('check-more-types')

/* eslint-env mocha */
describe('chdir-promise', () => {
  const chdir = require('..')
  const originalFolder = process.cwd()

  const here = () =>
    la(
      process.cwd() === __dirname,
      'expected to be in',
      __dirname,
      'but was in',
      process.cwd()
    )

  const inOriginal = () =>
    la(
      process.cwd() === originalFolder,
      'expected to be in',
      originalFolder,
      'but was in',
      process.cwd()
    )

  it('has to method', () => {
    la(is.fn(chdir.to))
  })

  it('starts in original folder', () => {
    inOriginal()
  })

  it('changes folders once', () => {
    return chdir
      .to(__dirname)
      .then(here)
      .then(chdir.back)
      .then(inOriginal)
  })

  it('changes folders twice', () => {
    return chdir
      .to(__dirname)
      .then(here)
      .then(chdir.back)
      .then(inOriginal)
      .then(_ => chdir.to(__dirname))
      .then(here)
      .then(chdir.back)
      .then(inOriginal)
  })

  context('back', () => {
    it('is a function', () => {
      la(is.fn(chdir.back))
    })

    it('returns a promise', () => {
      return chdir
        .to(__dirname)
        .then(here)
        .then(_ => chdir.back().then(_ => 'foo'))
        .then(value => {
          la(value === 'foo', 'got', value)
        })
    })
  })

  context('nextTo', () => {
    it('is a function', () => {
      la(is.fn(chdir.nextTo))
    })

    it('helps hop twice', () =>
      chdir
        .to(__dirname)
        .then(here)
        .then(chdir.back)
        .then(inOriginal)
        .then(chdir.nextTo(__dirname))
        .then(here)
        .then(chdir.back)
        .then(inOriginal))

    it('helps hop twice and twice back', () =>
      chdir
        .to(__dirname)
        .then(chdir.nextTo(originalFolder))
        .then(inOriginal)
        .then(chdir.back)
        .then(here)
        .then(chdir.back)
        .then(inOriginal))
  })
})
