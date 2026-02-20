import { neon } from "@neondatabase/serverless"

let sqlInstance: any = null

export function getSql() {
  if (!sqlInstance) {
    const databaseUrl = process.env.DATABASE_URL

    if (!databaseUrl) {
      throw new Error(
        "DATABASE_URL environment variable is not set. " +
        "Please check your .env file."
      )
    }

    sqlInstance = neon(databaseUrl)
  }

  return sqlInstance
}
