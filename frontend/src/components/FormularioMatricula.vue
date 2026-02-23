<script setup>
import { reactive } from 'vue'

const form = reactive({
  nome: '',
  email: '',
  cursoId: 1
})

async function enviarFormulario () {
  try {
    const response = await fetch('http://localhost:3000/api/matricula', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data?.error || 'Erro ao enviar formulário')
    }

    console.log('Sucesso:', data)
  } catch (error) {
    console.error('Erro:', error)
  }
}
</script>

<template>
  <div>
    <h1>Cadastro de usuários</h1>
    <form @submit.prevent="enviarFormulario">
      <input type="text" v-model="form.nome" placeholder="Nome completo">
      <br>
      <input type="text" v-model="form.email" placeholder="E-mail">
      <br>
      <input type="number" min="1" max="6" v-model.number="form.cursoId" placeholder="ID do curso">
      <button type="submit">Enviar</button>
    </form>
  </div>
</template>
