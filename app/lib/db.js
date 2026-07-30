import { promises as fs } from 'fs'
import path from 'path'

const JSON_FALLBACK = path.join(process.cwd(), 'data', 'leadSubmissions.json')
const SQLITE_PATH = path.join(process.cwd(), 'data', 'leads.sqlite')

let sqliteAvailable = false
let sqlite3 = null
try {
  // try to require better-sqlite3 first
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  sqlite3 = require('better-sqlite3')
  sqliteAvailable = true
} catch (e) {
  try {
    // try sqlite3 verbose (callback based)
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    sqlite3 = require('sqlite3')
    sqliteAvailable = true
  } catch (e2) {
    sqliteAvailable = false
  }
}

async function ensureJson() {
  try {
    await fs.mkdir(path.dirname(JSON_FALLBACK), { recursive: true })
    await fs.access(JSON_FALLBACK)
  } catch {
    await fs.writeFile(JSON_FALLBACK, '[]', 'utf8')
  }
}

export async function saveLeadFallback(record) {
  await ensureJson()
  const raw = await fs.readFile(JSON_FALLBACK, 'utf8')
  const arr = JSON.parse(raw || '[]')
  arr.unshift(record)
  await fs.writeFile(JSON_FALLBACK, JSON.stringify(arr, null, 2), 'utf8')
  return record.id
}

export function dbAvailable() {
  return sqliteAvailable
}

export function initSqlite() {
  if (!sqliteAvailable) return null
  try {
    if (sqlite3 && sqlite3.Database) {
      // node-sqlite3
      const sqlite = sqlite3
      const db = new sqlite.Database(SQLITE_PATH)
      db.serialize(() => {
        db.run(
          `CREATE TABLE IF NOT EXISTS leads (id TEXT PRIMARY KEY, email TEXT, createdAt TEXT)`
        )
      })
      return { type: 'node-sqlite3', db }
    } else if (typeof sqlite3 === 'function') {
      // better-sqlite3
      const db = new sqlite3(SQLITE_PATH)
      db.prepare(
        `CREATE TABLE IF NOT EXISTS leads (id TEXT PRIMARY KEY, email TEXT, createdAt TEXT)`
      ).run()
      return { type: 'better-sqlite3', db }
    }
  } catch (e) {
    console.error('initSqlite error', e)
    return null
  }
  return null
}

export async function saveLead(record) {
  if (sqliteAvailable) {
    const conn = initSqlite()
    if (conn) {
      try {
        if (conn.type === 'better-sqlite3') {
          conn.db.prepare('INSERT INTO leads (id,email,createdAt) VALUES (?,?,?)').run(record.id, record.email, record.createdAt)
          return record.id
        } else if (conn.type === 'node-sqlite3') {
          return new Promise((resolve, reject) => {
            conn.db.run('INSERT INTO leads (id,email,createdAt) VALUES (?,?,?)', [record.id, record.email, record.createdAt], function(err) {
              if (err) return reject(err)
              resolve(record.id)
            })
          })
        }
      } catch (e) {
        console.error('sqlite save error', e)
        // fallback to json
        return saveLeadFallback(record)
      }
    }
  }
  return saveLeadFallback(record)
}
