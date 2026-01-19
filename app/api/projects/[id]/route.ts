import { NextResponse } from "next/server";
import { mockProjectsData } from "@/app/lib/mockProjectData";


export async function PUT(req: Request, context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const body = await req.json();

  const index = mockProjectsData.findIndex((p) => p.id === id);

  if (index === -1) {
    return NextResponse.json(
      { message: "Project not found" },
      { status: 404 }
    );
  }

  mockProjectsData[index] = {
    ...mockProjectsData[index],
    ...body,
  };

  return NextResponse.json(mockProjectsData[index]);
}

export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const index = mockProjectsData.findIndex((p) => p.id === id);

  if (index === -1) {
    return NextResponse.json(
      { message: "Project not found" },
      { status: 404 }
    );
  }

  const deleted = mockProjectsData.splice(index, 1);
  return NextResponse.json(deleted[0]);
}
