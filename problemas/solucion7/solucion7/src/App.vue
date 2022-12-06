
<template>
  <div>
    <h1>
      Tareas
    </h1>
    <form>
      <div class="column name">
        <label for="name">Nombre de la tarea</label>
        <input v-model="form.name" type="text" id="name" name="name" required />
      </div>
      <div class="column priority">
        <label for="priority">Prioridad</label>
        <select v-model="form.priority" id="priority" name="priority" required>
          <option value="alta">Alta</option>
          <option value="media">Media</option>
          <option value="baja">Baja</option>
        </select>
      </div>
      <div class="column date">
        <label for="date">Fecha</label>
        <input v-model="form.date" type="date" id="date" name="date" required />
      </div>
      <div class="column description">
        <label for="description">Descripción</label>
        <textarea v-model="form.description" id="description" name="description" rows="4" cols="50"></textarea>
      </div>
    </form>
    <button @click="addTask">Añadir</button>
    <button @click="clearForm">Limpiar formulario</button>
    <div v-if="(tasks.length > 0)" class="list">
      <h3>
        Lista de tareas
      </h3>
      <ul>
        <template v-for="task in tasks" :key="task.id">
          <li class="task">
            <button @click="editTask(task.id)">Editar Tarea</button>
            <div class="content_task">
              <h4>{{ task.name }}</h4>
              <p>{{ task.priority }}</p>
              <p>{{ task.date }}</p>
            </div>
            <div>
              <p>{{ task.description }}</p>
            </div>
            <button @click="deleteTask(task.id)">Eliminar</button>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  priority: '',
  date: '',
  description: ''
})
const tasks = ref([
  {
    id: 0,
    name: 'Tarea 1',
    priority: 'alta',
    date: '2021-05-01',
    description: 'Descripción de la tarea 1'
  },
  {
    id: 1,
    name: 'Tarea 2',
    priority: 'media',
    date: '2021-05-02',
    description: 'Descripción de la tarea 2'

  },
  {
    id: 2,
    name: 'Tarea 3',
    priority: 'baja',
    date: '2021-05-03',
    description: 'Descripción de la tarea 3'
  }])

const addTask = () => {
  if (form.value.name === '' || form.value.priority === '' || form.value.date === '') {
    alert('Rellena todos los campos')
    return
  }
  tasks.value.push({
    id: tasks.value.length,
    name: form.value.name,
    priority: form.value.priority,
    date: form.value.date,
    description: form.value.description
  })
  form.value.name = ''
  form.value.priority = ''
  form.value.date = ''
  form.value.description = ''
}

const deleteTask = (id) => {
  tasks.value = tasks.value.filter(task => task.id !== id)
}
const clearForm = () => {
  form.value.name = ''
  form.value.priority = ''
  form.value.date = ''
  form.value.description = ''
}
const editTask= (id)=>{
  const task = tasks.value.find(task => task.id === id)
  form.value.date = task.date
  form.value.description = task.description
  form.value.name = task.name
  form.value.priority = task.priority
  deleteTask(id)
}
</script>


<style scoped>
form {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;

}

.column {
  display: flex;
  flex-direction: column;
  margin: 10px;
}

.description {
  grid-column: 1 / -1;
}

.list {
  margin-top: 20px;
}

.list ul {
  list-style: none;
  padding: 0;
}

.task {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border: 1px solid black;
  padding: 10px;
  margin: 10px 0;
}
.task div {
  grid-column: 1 / -1;
}
.content_task{
  display: flex;
  justify-content: space-evenly;
}
.task button{
  grid-column: 1 / -1;
  justify-self: end;
}
.column input:required:invalid, .column input:focus:invalid,.column select:required:invalid, .column select:focus:invalid {
  border: 2px solid red;
}
.column input:required:valid, .column input:focus:valid,.column select:required:valid, .column select:focus:valid {
  border: 2px solid green;
}

</style>
