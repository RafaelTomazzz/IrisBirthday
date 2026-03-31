import { readFile, writeFile } from "fs/promises"
import path from "path"

const filePath = path.join(process.cwd(), "data", "files.json")

export async function getAllLista() {
    const data = await readFile(filePath, "utf-8")
    return Response.json(JSON.parse(data))
}

export async function getListaByNome(nome) {
    const data = await readFile(filePath, "utf-8")
    const files = JSON.parse(data)

    const file = files.find(f => f.nome === nome)

    return file
}

export async function postLista(req) {
    const body = await req.json()

    const data = await readFile(filePath, "utf-8")
    const files = JSON.parse(data)

    const file = files.find(f => f.nome === body.nome)
    if (file) {
        return alert("Esta lista já existe")
    }

    const newFile = {
        nome: body.nome,
        notas: []
    }

    files.push(newFile)

    await writeFile(filePath, JSON.stringify(files, null, 2))

    return Response.json(newFile)
}

export async function postNota(req) {
    const body = await req.json()
    const fileId = Number(params.id)

    const data = await readFile(filePath, "utf-8")
    const files = JSON.parse(data)

    const file = files.find(f => f.id === fileId)

    if (!file) {
        return Response.json({ error: "Arquivo não encontrado" }, { status: 404 })
    }

    const newNote = {
        id: Date.now(),
        titulo: body.titulo,
        conteudo: body.conteudo
    }

    file.notas.push(newNote)

    await writeFile(filePath, JSON.stringify(files, null, 2))

    return Response.json(newNote)

}