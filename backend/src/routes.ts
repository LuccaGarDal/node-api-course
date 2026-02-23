import { json, Router } from "express";
import { randomUUID } from "node:crypto";

const router = Router();

class User {
    id: string;
    nome: string;
    email: string;
    cursoId: number;

    constructor(nome: string, email: string, cursoId: number) {
        this.id = randomUUID();
        this.nome = nome;
        this.email = email;
        this.cursoId = cursoId;
    }
}

function validarDados (body: any) {
    if (!body || typeof body !== "object") return "Body inválido";
    if (typeof body.nome !== "string" || body.nome.trim().length < 2) return "Nome inválido";
    if (typeof body.email !== "string" || !body.email.includes("@")) return "Email inválido";
    if (typeof body.cursoId !== "number" || body.cursoId < 1) return "Curso inválido";
    return null;
} 

const cursos = [
    { id: 1, nome: "Engenharia de Software" },
    { id: 2, nome: "Ciência da Computação" },
    { id: 3, nome: "Sistemas de Informação" },
    { id: 4, nome: "Análise e Desenvolvimento de Sistemas" },
    { id: 5, nome: "Redes de Computadores" },
    { id: 6, nome: "Segurança da Informação" },
];

router.get("/", (req, res) => {
    res.json({ message: "API funcionando" });
})

router.get("/cursos", (req, res) => {
    res.json(cursos);
});

router.post("/matricula", (req, res) => {
    const { nome, email, cursoId } = req.body;
    console.log(req.body);

    const erro = validarDados(req.body);
    if (erro) {
        return res.status(400).json({ error: erro });
    }

    const cursoExiste = cursos.some(c => c.id === cursoId);
    if (!cursoExiste) {
        return res.status(400).json({ error: "Curso não encontrado" });
    }

    const newUser = new User(nome, email, cursoId);

    return res.status(201).json(newUser);
});

export default router;