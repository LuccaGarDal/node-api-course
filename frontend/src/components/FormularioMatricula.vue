<script setup>
import { onMounted, reactive, ref } from 'vue'

const cursos = ref([])
const carregandoCursos = ref(false)

const form = reactive({
  nome: '',
  email: '',
  cursoId: null
})

async function carregarCursos () {
  carregandoCursos.value = true
  try {
    const response = await fetch('http://localhost:3000/api/cursos')
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data?.error || 'Erro ao carregar cursos')
    }

    cursos.value = data

    } catch (error) {
      console.error('Erro:', error)
    } finally {
      carregandoCursos.value = false
    }
}

onMounted(() => {
  carregarCursos()
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
      <select v-model.number="form.cursoId" :disabled="carregandoCursos">
        <option :value="null" disabled>Selecione o curso</option>
        <option v-for="curso in cursos" :key="curso.id" :value="curso.id">
          {{ curso.nome }}
        </option>
      </select>
      <button type="submit">Enviar</button>
    </form>
  </div>
</template>
