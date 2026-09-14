const fs = require('node:fs')
const path = require('node:path')

const root = path.resolve(__dirname, '..')
const packagePath = path.join(root, 'package.json')
const lockPath = path.join(root, 'package-lock.json')
const requestedVersion = process.argv[2]

function fail(message) {
  console.error(`Version bump failed: ${message}`)
  process.exit(1)
}

function parseVersion(version) {
  const match = /^(\d+)\.(\d+)\.(\d+)$/.exec(version)

  if (!match) {
    return null
  }

  return match.slice(1).map(Number)
}

function nextVersion(currentVersion, requested) {
  const current = parseVersion(currentVersion)

  if (!current) {
    fail(`package.json has an invalid version: ${currentVersion}`)
  }

  if (requested === 'major') {
    return `${current[0] + 1}.0.0`
  }

  if (requested === 'minor') {
    return `${current[0]}.${current[1] + 1}.0`
  }

  if (requested === 'patch') {
    return `${current[0]}.${current[1]}.${current[2] + 1}`
  }

  if (parseVersion(requested)) {
    return requested
  }

  fail(`use a version like 1.2.3, or use major, minor, or patch`)
}

if (!requestedVersion) {
  fail(`missing version; use "npm run bump-version -- patch"`)
}

const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'))
const version = nextVersion(packageJson.version, requestedVersion)

if (version === packageJson.version) {
  fail(`version is already ${version}`)
}

packageJson.version = version
fs.writeFileSync(packagePath, `${JSON.stringify(packageJson, null, 2)}\n`)

if (fs.existsSync(lockPath)) {
  const packageLock = JSON.parse(fs.readFileSync(lockPath, 'utf8'))
  packageLock.version = version

  if (packageLock.packages && packageLock.packages['']) {
    packageLock.packages[''].version = version
  }

  fs.writeFileSync(lockPath, `${JSON.stringify(packageLock, null, 2)}\n`)
}

console.log(`Version bumped to ${version}`)
