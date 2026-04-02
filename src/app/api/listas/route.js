import { readFile, writeFile } from "fs/promises"
import path from "path"

const filePath = path.join(process.cwd(), "data", "files.json")

export async function GET() {
  try {
    const data = await readFile(filePath, "utf-8");
    return Response.json(JSON.parse(data));
  } catch (error) {
    console.log("ERRO API:", error);
    return Response.json({ error: "Erro interno" }, { status: 500 });
  }
}

export async function POST(req) {
    const body = await req.json()

    const data = await readFile(filePath, "utf-8")
    const files = JSON.parse(data)

    const file = files.find(f => f.nome === body.nome)
    if (file) {
        return Response.json({ error: "Esta lista já existe" }, { status: 400 })
    }

    const newFile = {
        nome: body.nome,
        notas: []
    }

    files.push(newFile)

    await writeFile(filePath, JSON.stringify(files, null, 2))

    return Response.json(newFile)
}
