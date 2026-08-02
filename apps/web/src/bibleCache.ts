const DB_NAME = "emanus-bible-content"
const STORE_NAME = "content-v1"

interface Cached<T> {
  value: T
  cachedAt: string
}

let database: Promise<IDBDatabase | null> | null = null

function openDatabase(): Promise<IDBDatabase | null> {
  if (database) return database
  database = new Promise((resolve) => {
    if (typeof indexedDB === "undefined") {
      resolve(null)
      return
    }
    try {
      const request = indexedDB.open(DB_NAME, 1)
      request.onupgradeneeded = () => {
        if (!request.result.objectStoreNames.contains(STORE_NAME)) request.result.createObjectStore(STORE_NAME)
      }
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => resolve(null)
      request.onblocked = () => resolve(null)
    } catch {
      resolve(null)
    }
  })
  return database
}

export async function readBibleCache<T>(key: string): Promise<T | null> {
  const db = await openDatabase()
  if (!db) return null
  return new Promise((resolve) => {
    try {
      const request = db.transaction(STORE_NAME, "readonly").objectStore(STORE_NAME).get(key)
      request.onsuccess = () => resolve((request.result as Cached<T> | undefined)?.value ?? null)
      request.onerror = () => resolve(null)
    } catch {
      resolve(null)
    }
  })
}

export async function writeBibleCache<T>(key: string, value: T): Promise<void> {
  const db = await openDatabase()
  if (!db) return
  await new Promise<void>((resolve) => {
    try {
      const transaction = db.transaction(STORE_NAME, "readwrite")
      transaction.objectStore(STORE_NAME).put({ value, cachedAt: new Date().toISOString() }, key)
      transaction.oncomplete = () => resolve()
      transaction.onerror = () => resolve()
      transaction.onabort = () => resolve()
    } catch {
      resolve()
    }
  })
}
