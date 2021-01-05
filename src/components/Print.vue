<template>
  <div >
    
    <div id="app" class="container">
      <div class="row">
        <div class="col col-12"><h3>Schedule for {{ studentInfo.name }} on {{ todaysDate }} </h3>
        </div>
      </div>
      <div class="row">
        <div class="col col-1">Subject</div>
          <div class="col col-5"> Task </div>
          <div class="col col-1"> Due Date </div>
          <div class="col col-2"> Status </div>
          <div class="col col-2"> Due in Days </div>
       </div>
<hr/>
       <div v-for="subject in subjects" v-bind:key="subject.name"  class="row" >
          <div class="col col-2"> <h4> {{ subject.name }} </h4></div>
          <div v-for="task in subject.tasks" v-bind:key="task.hash"  class="row" >
            <div class="col col-1"></div>
            <div class="col col-5"> {{ task.name }} </div>
            <div class="col col-1"> {{ task.dueDate }} </div>
            <div class="col col-2"> {{ mapStatus(task.status) }} </div>
            <div class="col col-2"> {{ dateMapping(task.dueDate) }} </div>
          </div>
          <div class="row" >&nbsp; <hr/></div>
        </div>
      </div>
   </div>

</template>

<script>
import { API } from 'aws-amplify';
import { listTasks } from '../graphql/queries';
import { getStudent } from '../graphql/queries';



export default {
  name: 'App',
  async created() {
    console.log('created');
    this.loadTasks();
  },
  props: ['studentid'],
  data() {
    return {
      TaskItems: {},
      studentInfo: {},
      todaysDate: "",
      subjects: [],
      statusValues: [
          {'key': 'NOT_STARTED','value': 'Not Started'},
          {'key': 'IN_PROGRESS','value': 'In Progress'},
          {'key': 'SUBMITTED','value': 'Submitted'},
          {'key': 'COMPLETED','value': 'Completed'},
          {'key': 'ZZZ_GRADED','value': 'Graded'}]
    }
  },
  methods: {
    dateMapping(dueDate) {
      var due = Date.parse(dueDate);

      var t = new Date().setHours(0,0,0,0);

      if (due < t)
        return "Overdue";

      var diff = (due - t)/ (1000 * 60 * 60 * 24);

      return diff;
    },
    mapStatus(status) {
      
      for (var item in this.statusValues) {
        if (this.statusValues[item].key == status) {
          return this.statusValues[item].value;
        }
      }
      
      return '';
    },
    async loadTasks() {
      
      this.todaysDate = new Date().toLocaleDateString();
      

      const studentInfo = await API.graphql({
        query: getStudent,
        variables: {
            'id': this.studentid
        }
      });


      this.studentInfo = studentInfo.data.getStudent;
      console.log('studentInfo', this.studentInfo);

      console.log('loadTasks');

      const TaskItems = await API.graphql({
        query: listTasks,
        variables: {
            'studentId':this.studentid,
            'filter': {
              'status': {
                'ne': 'ZZZ_GRADED'
              }
          }
        }
      });

      this.TaskItems = TaskItems.data.listTasks.items;
      
      this.TaskItems.sort(function (first, second) {
        if (first.subject < second.subject)
          return -1;
        else if (first.subject > second.subject)
          return 1;
        else
          return Date.parse(first.dueDate ) -  Date.parse(second.dueDate ) ;
      }) 



      var subjects = [];
      var i=-1;

      console.log('this.TaskItems');
      
      for (var taskIdx in this.TaskItems) {
          var task = this.TaskItems[taskIdx];
          if (i == -1 || subjects[i].name != task.subject) {
            console.log('task.subject');
            console.log( task.subject);
            subjects.push({"name": task.subject, "tasks": []});
            i++;
          }
          subjects[i].tasks.push(task)
      }

      this.subjects = subjects; 

    }
  }
}
</script>