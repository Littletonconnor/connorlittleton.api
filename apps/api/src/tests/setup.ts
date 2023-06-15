import { execaCommand } from 'execa'
import fs from 'fs'
import fsExtra from 'fs-extra'
import path from 'path'
import { afterAll } from 'vitest'

const baseDatabaseFile = `./prisma/test/test.db`
export const BASE_DATABASE_PATH = path.join(process.cwd(), baseDatabaseFile)
export const BASE_DATABASE_URL = `file:${BASE_DATABASE_PATH}?connection_limit=1`

async function ensureDbReady() {
  if (!(await fsExtra.pathExists(BASE_DATABASE_PATH))) {
    await execaCommand('pnpm prisma:seed', {
      stdio: 'inherit',
      env: {
        ...process.env,
        DATABASE_URL: 'file:./test/test.db',
      },
    })
  }
}

async function setup() {
  await fsExtra.ensureDir(path.dirname(BASE_DATABASE_PATH))
  await ensureDbReady()
  return async function teardown() {
    //
  }
}

void setup()

afterAll(async () => {
  await fs.promises.rm(BASE_DATABASE_PATH)
})
