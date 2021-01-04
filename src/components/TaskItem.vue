<template>
  <div id="app">
    <h1>Todo App</h1>
    <input type="text" v-model="name" placeholder="Todo name">
    <input type="text" v-model="dueDate" placeholder="Due Date">
    <input type="text" v-model="status" placeholder="Status">
    <button v-on:click="createTodo">Create Todo</button>
    <div v-for="item in Todos" :key="item.id">
      <h3>{{ item.name }}</h3>
      <p>{{ item.dueDate }}</p>
      <p>{{ item.status }}</p>
    </div>
  </div>
</template>

<script>
import { API } from 'aws-amplify';
import { createTodo } from '../graphql/mutations';
import { listTodos } from '../graphql/queries';

export default {
  name: 'App',
  async created() {
    this.getTodos();
  },
  data() {
    return {
      name: '',
      description: '',
      Todos: []
    }
  },
  methods: {
    async createTodo() {
      const { name, dueDate, status } = this;
      if (!name || !dueDate || !status) return;
      const Todo = { name, dueDate, status };
      this.Todos = [...this.Todos, Todo];
      await API.graphql({
        query: createTodo,
        variables: {input: Todo},
      });
      this.name = '';
      this.description = '';
    },
    async getTodos() {
      const Todos = await API.graphql({
        query: listTodos
      });
      this.Todos = Todos.data.listTodos.items;
    }
  }
}
</script>