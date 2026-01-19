import { NextResponse } from "next/server"
import { mockProjectsData } from "@/app/lib/mockProjectData"
import { Project } from "@/app/src/types/project";

export async function GET() {
  return NextResponse.json(mockProjectsData)
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const newProject: Project = {
      id: crypto.randomUUID(),
      ...body,
    };

    mockProjectsData.push(newProject)
    return NextResponse.json(newProject, { status: 201 });
  } catch (err) {
    throw new Error(`POST REQEUST: ${err}`)

  }
};



