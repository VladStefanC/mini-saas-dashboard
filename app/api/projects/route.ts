import { NextResponse } from "next/server"
import { supabase } from "@/app/lib/supabase"

export async function GET() {
  const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data);

}

export async function POST(req: Request) {
  const body = await req.json()
  console.log(body)
  const payload = {
    name: body.name,
    status: body.status,
    deadline: body.deadline,
    assigned_to: body.assignedTo,
    budget: body.budget,
  }
  const { data, error } = await supabase.from("projects").insert(payload).select().single();

  if (error) {
    console.error("POST /projects error:", error)
    return NextResponse.json({ error: error.message }, { status: 505 })
  }

  return NextResponse.json(data, { status: 201 })

}
