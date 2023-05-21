const config = {
  name: 'api.connorlittleton',
  interpreter: '/home/ubuntu/.nvm/versions/node/v18.16.0/bin/ts-node',
  exec_mode: 'cluster',
  instances: 'max',
  script: 'dist/index.js',
}

module.exports = config
