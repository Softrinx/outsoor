import { neon } from "@neondatabase/serverless"

// Use unpooled connection to avoid connection pooling issues with table creation
const DATABASE_URL = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL

let sqlInstance: any = null

export function getSql() {
  if (!sqlInstance) {
    if (!DATABASE_URL) {
      const error = "DATABASE_URL or DATABASE_URL_UNPOOLED is not set"
      console.error(error)
      throw new Error(error)
    }
    try {
      sqlInstance = neon(DATABASE_URL)
      if (typeof sqlInstance !== 'function') {
        throw new Error(`neon() did not return a function, got ${typeof sqlInstance}`)
      }
    } catch (error) {
      console.error("Failed to initialize neon client:", error)
      throw error
    }
  }
  return sqlInstance
}

