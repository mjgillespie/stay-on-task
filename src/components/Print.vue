<template>
  <div >
    
    <div id="app" class="container">
      <div class="row">
        <div class="col col-12"><h3>Schedule for {{ studentInfo.name }} on {{ todaysDate }} </h3>
        </div>
      </div>
      <div class="row">
        <div class="col col-6">Subject/Task </div>
          <div class="col col-4"> Due Date </div>
          <div class="col col-2"> Status </div>
       </div>
<hr/>
       <div v-for="subject in Subjects" v-bind:key="subject.name"  class="row" >
          <div class="col col-2"> <h4> {{ subject.name }} </h4></div>
          <div v-for="task in subject.tasks" v-bind:key="task.hash"  class="row" >
            <div class="col col-6"> {{ task.name }} </div>
            <div class="col col-4"> {{ task.dueDate }} ({{ dateMapping(task.dueDate) }}) </div>
            <div class="col col-2"> {{ mapStatus(task.status) }} </div>
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
import { listSubjects } from '../graphql/queries';


export default {
  name: 'App',
  async created() {
    console.log('created');
    this.loadSubjects();
    this.loadTasks();
  },
  props: ['studentid'],
  data() {
    return {
      TaskItems: {},
      studentInfo: {},
      todaysDate: "",
      Subjects: [],
      statusValues: [
          {'key': 'NOT_STARTED','value': 'Not Started'},
          {'key': 'IN_PROGRESS','value': 'In Progress'},
          {'key': 'SUBMITTED','value': 'Submitted'},
          {'key': 'COMPLETED','value': 'Completed'},
          {'key': 'ZZZ_GRADED','value': 'Graded'}]
    }
  },
  methods: {
    resolveSubject(hash){
      for (var i in this.Subjects) {
        if (this.Subjects[i].hash == hash) {
          return this.Subjects[i].name;
        }
      }
      
      return '';
    },
    dateMapping(dueDate) {
      var due = Date.parse(dueDate);

      var t = new Date().setHours(0,0,0,0);

      if (due < t)
        return "Overdue";

      var diff = (due - t)/ (1000 * 60 * 60 * 24);

      return diff + ' days';
    },
    mapStatus(status) {
      
      for (var item in this.statusValues) {
        if (this.statusValues[item].key == status) {
          return this.statusValues[item].value;
        }
      }
      
      return '';
    },
    async loadSubjects() {
      console.log('studentid', this.studentid);

      const Subjects = await API.graphql({
        query: listSubjects,
        variables: {
        'studentId':this.studentid
        }
      });
      this.Subjects = Subjects.data.listSubjects.items;
      this.Subjects.sort(function (first, second) {
        if (first < second) return -1;
        if (first > second) return 1;
        return 0;
      }) 
    },
    async loadTasks() {
      
      this.todaysDate = new Date().toLocaleDateString();
      
      console.log('studentid', this.studentid);

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

      console.log('this.TaskItems');
      
      for (var i in this.Subjects) {
        var subject = this.Subjects[i];

        var tasks = []

        for (var taskIdx in this.TaskItems) {
          var task = this.TaskItems[taskIdx];

          if (subject.hash == task.subject) {

            tasks.push(task)
          }
          
        }

        this.$set(this.Subjects[i], 'tasks', tasks);
      }
    }
  }
}
</script>