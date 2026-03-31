import { readFile, writeFile } from "fs/promises"
import path from "path"

export async function GET(nome) {
    const data = await readFile(filePath, "utf-8")
    const files = JSON.parse(data)

    const file = files.find(f => f.nome === nome)

    return file
}


export async function postNota(req, { params }) {
    const body = await req.json()
    const fileNome = params.nome

    const data = await readFile(filePath, "utf-8")
    const files = JSON.parse(data)

    const file = files.find(f => f.nome === fileNome)

    if (!file) {
        return Response.json({ error: "Arquivo não encontrado" }, { status: 404 })
    }

    const newNote = {
        descricao: body.descricao,
        data: Date.now(),
        check: body.check
    }

    file.notas.push(newNote)

    await writeFile(filePath, JSON.stringify(files, null, 2))

    return Response.json(newNote)
}