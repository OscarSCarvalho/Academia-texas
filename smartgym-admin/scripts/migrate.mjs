/**
 * Script de migration para o Supabase.
 * Executa via: node scripts/migrate.mjs
 *
 * Requer a variável SUPABASE_SERVICE_KEY no ambiente.
 * Obtenha em: Dashboard > Project Settings > API > service_role key
 *
 * Uso:
 *   $env:SUPABASE_SERVICE_KEY="sb_secret_..." ; node scripts/migrate.mjs
 */

import { readFileSync } from "fs"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))

const SUPABASE_URL = "https://xsvtmyrnxkovysdigocs.supabase.co"
const SERVICE_KEY  = process.env.SUPABASE_SERVICE_KEY

if (!SERVICE_KEY) {
  console.error("❌  Defina SUPABASE_SERVICE_KEY antes de rodar.")
  console.error("    Dashboard > Project Settings > API > service_role key")
  console.error("")
  console.error("    PowerShell:")
  console.error('    $env:SUPABASE_SERVICE_KEY="sb_secret_..." ; node scripts/migrate.mjs')
  process.exit(1)
}

const migrationFile = join(__dirname, "../supabase/migrations/20260602000001_initial_schema.sql")
const seedFile      = join(__dirname, "../supabase/seed.sql")

async function runSQL(sql, label) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_raw`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": SERVICE_KEY,
      "Authorization": `Bearer ${SERVICE_KEY}`,
    },
    body: JSON.stringify({ query: sql }),
  })

  if (!res.ok) {
    // Fallback: tentar via pg endpoint
    const res2 = await fetch(`${SUPABASE_URL}/pg/query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SERVICE_KEY,
        "Authorization": `Bearer ${SERVICE_KEY}`,
      },
      body: JSON.stringify({ query: sql }),
    })
    if (!res2.ok) {
      const body = await res2.text()
      throw new Error(`${label} falhou: ${body}`)
    }
    console.log(`✅  ${label} executado com sucesso.`)
    return
  }
  console.log(`✅  ${label} executado com sucesso.`)
}

async function main() {
  console.log("🚀  Iniciando migration SmartGym → Supabase")
  console.log("")

  const migrationSQL = readFileSync(migrationFile, "utf-8")
  const seedSQL      = readFileSync(seedFile, "utf-8")

  try {
    await runSQL(migrationSQL, "Schema (migration)")
    await runSQL(seedSQL,      "Seed de dados")
    console.log("")
    console.log("🎉  Migration concluída! Banco de dados pronto.")
  } catch (err) {
    console.error("")
    console.error("❌  Não foi possível rodar automaticamente.")
    console.error("    Execute manualmente no Supabase SQL Editor:")
    console.error("    https://supabase.com/dashboard/project/xsvtmyrnxkovysdigocs/sql/new")
    console.error("")
    console.error("    1. Cole o conteúdo de: supabase/migrations/20260602000001_initial_schema.sql")
    console.error("    2. Execute")
    console.error("    3. Cole o conteúdo de: supabase/seed.sql")
    console.error("    4. Execute")
    console.error("")
    console.error("    Detalhe do erro:", err.message)
  }
}

main()
