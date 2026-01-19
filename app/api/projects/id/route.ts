import { NextResponse } from "next/server";
import { mockProjectsData } from "@/app/lib/mockProjectData";

interface Params {
  params: {
    id: string,
  }
}

export async function PUT(req: Request, { params }: Params) {
  const body = await req.json()
  const index = mockProjectsData.findIndex((p) => p.id === params.id);

  if (index === -1) {
    return NextResponse.json({ message: "Not found" }, { status: 404 })
  }

  mockProjectsData[index] = {
    ...mockProjectsData[index],
    ...body,
  };

  return NextResponse.json(mockProjectsData[index])

}


export async function DELETE(_: Request, { params }: Params) {
  const index = mockProjectsData.findIndex((p) => p.id === params.id)
  if (index === -1) {
    return NextResponse.json({ message: "Not found" }, { status: 404 })
  }

  const deleted = mockProjectsData.splice(index, 1)
  return NextResponse.json(deleted[0])
}


