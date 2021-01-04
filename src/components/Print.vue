<template>
  <div >
    
    <div id="app" class="container">
      <div class="row">
        <div class="col col-2"><h3>Print {{ studentid }} </h3></div>
        <div class="col col-4">
          
        </div>
      </div>
   </div>
  </div>
</template>

<script>
import { API } from 'aws-amplify';
import { listTasks } from '../graphql/queries';




export default {
  name: 'App',
  async created() {
    console.log('created');
    this.loadTasks();
  },
  props: ['studentid'],
  data() {
    return {
      selectedStudent: ''
    }
  },
  methods: {
    async loadTasks() {
      
      const TaskItems = await API.graphql({
        query: listTasks,
        variables: {
            'studentId':this.selectedStudent,
            'status': {
              'ne': 'ZZZ_GRADED'
            }
        }
      });

      this.TaskItems = TaskItems.data.listTasks.items;
      
      this.TaskItems.sort(function (first, second) {
        return Date.parse(first.dueDate ) -  Date.parse(second.dueDate ) 

      }) 
    }
  }
}
</script>