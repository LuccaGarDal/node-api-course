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
  <div class="container">
    <h1>Cadastro de usuários</h1>
    <form @submit.prevent="enviarFormulario">
      <div class="campo">
        <input
          type="text"
          v-model="form.nome"
          placeholder="Nome completo"
        />
      </div>
      <div class="campo">
        <input
          type="email"
          v-model="form.email"
          placeholder="E-mail"
        />
      </div>
       <div class="campo">
        <select
          v-model.number="form.cursoId"
          :disabled="carregandoCursos"
        >
          <option :value="null" disabled>
            Selecione o curso
          </option>

          <option
            v-for="curso in cursos"
            :key="curso.id"
            :value="curso.id"
          >
            {{ curso.nome }}
          </option>
        </select>
      </div>
      <button type="submit">Enviar</button>
    </form>
  </div>
</template>

<style scoped>

input,
select,
button {
  box-sizing: border-box;
}

.container {
  width: 100%;
  max-width: 380px;
  padding: 30px;
  border-radius: 14px;
  background: #ffffff;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
}

h1 {
  text-align: center;
  margin-bottom: 25px;
  color: #2c3e50;
}

.campo {
  margin-bottom: 18px;
}

input,
select {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 0.95rem;
  transition: 0.2s ease;
}

input:focus,
select:focus {
  border-color: #42b883;
  outline: none;
  box-shadow: 0 0 0 3px rgba(66, 184, 131, 0.2);
}

button {
  width: 100%;
  padding: 12px;
  border: 1px solid transparent; /* 👈 adiciona isso */
  border-radius: 8px;
  background: #42b883;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s ease;
}

button:hover {
  background: #369f6b;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
