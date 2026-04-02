import { readFile, writeFile } from "fs/promises"
import path from "path"

const filePath = path.join(process.cwd(), "data", "files.json")

export async function GET(request) {
    const nome = request.nextUrl.searchParams.get('nome')
    const data = await readFile(filePath, "utf-8")
    const files = JSON.parse(data)

    const file = files.find(f => f.nome === nome)

    return Response.json(file)
}

export async function POST(req) {
    const body = await req.json()
    
    const data = await readFile(filePath, "utf-8")
    const files = JSON.parse(data)

    const file = files.find(f => f.nome === body.nome)

    if (!file) {
        return Response.json({ error: "Arquivo não encontrado" }, { status: 404 })
    }

    const newNote = {
        descricao: body.descricao,
        data: Date.now(),
        check: body.check
    }

    console.log(file)
    file.notes.push(newNote)

    await writeFile(filePath, JSON.stringify(files, null, 2))

    return Response.json(file)
}

export async function DELETE(req) {
    const body = await req.json()

    const { nome, index } = body
    const indexNumber = Number(index)

    if (index === undefined) {
        return Response.json({ error: "Index não enviado" }, { status: 400 })
    }

    if (isNaN(indexNumber)) {
        return Response.json({ error: "Index inválido" }, { status: 400 })
    }

    const data = await readFile(filePath, "utf-8")
    const files = JSON.parse(data)

    const file = files.find(f => f.nome === nome)

    if (!file) {
        return Response.json({ error: "Arquivo não encontrado" }, { status: 404 })
    }

    if (!file.notes || indexNumber < 0 || indexNumber >= file.notes.length) {
        return Response.json({ error: "Nota não encontrada" }, { status: 404 })
    }

    const removedNote = file.notes.splice(indexNumber, 1)

    await writeFile(filePath, JSON.stringify(files, null, 2))

    return Response.json(file)
}

export async function PUT(req) {
    const body = await req.json()

    const { nome, index, descricao, check } = body
    const indexNumber = Number(index)

    if (!nome) {
        return Response.json({ error: "Nome não enviado" }, { status: 400 })
    }

    if (isNaN(indexNumber)) {
        return Response.json({ error: "Index inválido" }, { status: 400 })
    }

    const data = await readFile(filePath, "utf-8")
    const files = JSON.parse(data)

    const file = files.find(f => f.nome === nome)

    if (!file) {
        return Response.json({ error: "Arquivo não encontrado" }, { status: 404 })
    }

    if (!file.notes || indexNumber < 0 || indexNumber >= file.notes.length) {
        return Response.json({ error: "Nota não encontrada" }, { status: 404 })
    }

    if (descricao !== undefined) {
        file.notes[indexNumber].descricao = descricao
    }

    if (check !== undefined) {
        file.notes[indexNumber].check = check
    }

    await writeFile(filePath, JSON.stringify(files, null, 2))

    return Response.json(file)
}