const config = {
  name: 'docs.connorlittleton',
  exec_mode: 'cluster',
  instances: 'max',
  script: 'node_modules/next/dist/bin/next',
  args: 'start',
}

module.exports = config
