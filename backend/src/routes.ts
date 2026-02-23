import { Router } from "express";

const router = Router();

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


export default router;