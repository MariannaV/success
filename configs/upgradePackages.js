const path = require('path'),
  fs = require('fs'),
  ncu = require('npm-check-updates')

require('events').EventEmitter.defaultMaxListeners = 30

function findFiles(folder, pattern = /.*/, callback) {
  const flist = []

  fs.readdirSync(folder).forEach(e => {
    const fname = path.join(folder, e),
      fstat = fs.lstatSync(fname)

    if (fstat.isDirectory()) Array.prototype.push.apply(flist, findFiles(fname, pattern, callback))
    else if (pattern.test(fname)) {
      flist.push(fname)
      if (callback) callback(fname)
    }
  })

  return flist
}

async function updateAllPackages() {
  for (const packageFile of findFiles('./', /^((?!node_modules|libs).)*package.json$/gm)) {
    console.log(`Checking file ${packageFile} for updates...`)
    await ncu
      .run({ packageFile, interactive: true, upgrade: true })
      .then(changes =>
        console.log(
          `File ${packageFile} ${
            Object.keys(changes).length
              ? `has been updated:\n${JSON.stringify(changes, null, 2)}`
              : `does not need to be updated.`
          }\n`
        )
      )
  }
}

updateAllPackages()
