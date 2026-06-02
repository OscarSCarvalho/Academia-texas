import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { readFileSync } from "fs"
import { join } from "path"

export async function POST(req: NextRequest) {
  const serviceKey = req.headers.get("x-service-key")
  if (!serviceKey) {
    return NextResponse.json({ error: "x-service-key header obrigatório" }, { status: 400 })
  }

  const admin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    serviceKey,
    { auth: { persistSession: false } }
  )

  const sql = readFileSync(
    join(process.cwd(), "supabase/migration_completa.sql"),
    "utf-8"
  )

  // Executa cada statement separadamente
  const statements = sql
    .split(";")
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith("--"))

  const errors: string[] = []
  for (const stmt of statements) {
    const { error } = await admin.rpc("exec_sql", { query: stmt }).single()
    if (error && !error.message.includes("already exists")) {
      errors.push(`${stmt.slice(0, 60)}... → ${error.message}`)
    }
  }

  if (errors.length > 0) {
    return NextResponse.json({ status: "partial", errors }, { status: 207 })
  }

  return NextResponse.json({ status: "ok", message: "Migration executada com sucesso!" })
}
