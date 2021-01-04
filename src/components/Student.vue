<template>
  <div >
    
    <div id="app" class="container">
<button  class="btn btn-primary" v-on:click="callApi">Call API</button>
      <div class="row">
        <div class="col col-2"><h3>Students</h3></div>
        <div class="col col-4">
          <select class="form-select mb-3" aria-label="Default Student" v-model="selectedStudent" v-on:change="changeStudent">
            <option  v-for="student in Students" v-bind:key="student.id" v-bind:value="student.id">
              {{ student.name }}
            </option>
           </select>
        </div>
        <div class="col col-2">
          Create New Student:
        </div>
        <div class="col col-2">
          <input type="text" v-model="name" placeholder="Student name"/>
        </div>
        <div class="col col-2">
          <button  class="btn btn-primary" v-on:click="createStudent">Create Student</button>
        </div>
      </div>
       <div class="row">
        <div class="col col-2">
          <div class="form-check">
          <input class="form-check-input" type="checkbox" value=""  v-on:change="changeStudent" v-model="showGraded" id="flexCheckDefault">
          <label class="form-check-label" for="flexCheckDefault">
            Show Graded
          </label>
        </div>
        </div>
         <div class="col col-10">
           </div>
      </div>
      <div class="row" v-show="selectedStudent != null">
        <div class="col col-12">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Task</th>
                <th scope="col">Subject</th>
                <th scope="col">Due Date</th>
                <th scope="col">Status</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="task in TaskItems" v-bind:key="task.hash" v-bind:value="task.hash">
                <td>
                  <div v-show = "editIndex != task.hash">
                    <label> {{task.name}} </label>
                  </div>
                    <input name="taskname" 
                         v-show = "editIndex == task.hash" 
                         v-model = "task.name" >
                </td>
                <td>
                  <div v-show = "editIndex != task.hash">
                    <label> {{task.subject}} </label>
                  </div>
                    <input name="tasksubject" 
                         v-show = "editIndex == task.hash" 
                         v-model = "task.subject" >
                </td>
                <td>
                  <div v-show = "editIndex != task.hash">
                    <label> {{task.dueDate}} </label>
                  </div>
                    <input name="taskDueDate" 
                         v-show = "editIndex == task.hash" 
                         v-model = "task.dueDate" >                  
                </td>
                <td>
                  <div v-show = "editIndex != task.hash">
                    <label> {{mapStatus(task.status)}} </label>
                  </div>
                  <select v-model="task.status"  v-show = "editIndex == task.hash" >
                         <option v-for="item in statusValues" v-bind:key="item.key" v-bind:value="item.key">{{ item.value }}</option>
                   </select>
                </td>
                <td>
                  <button  v-show = "editIndex != task.hash" v-on:click="editTask(task)" type="button" class="btn btn-primary"><span class="glyphicon glyphicon glyphicon-pencil" aria-hidden="true">Edit</span></button>
                  <button  v-show = "editIndex != task.hash" v-on:click="deleteTask(task, true)" type="button" class="btn btn-white"><span class="glyphicon glyphicon glyphicon-remove" aria-hidden="true">Delete</span></button>
                  <button  v-show = "editIndex == task.hash" v-on:click="updateTask(task)" type="button" class="btn btn-primary"><span class="glyphicon glyphicon glyphicon-pencil" aria-hidden="true">Save</span></button>
                  <button  v-show = "editIndex == task.hash" v-on:click="cancelTask(task)" type="button" class="btn btn-white"><span class="glyphicon glyphicon glyphicon-remove" aria-hidden="true">Cancel</span></button>
                </td>
              </tr>
              </tbody>
          </table>
        </div>
      </div>
    </div>
    
    
    
    
   
    <div class="row" v-show = "selectedStudent != null">
      <div class="col col-1">
        </div>
        <div class="col col-2">
          <input type="text" v-model="taskName" placeholder="Task Name"/>
        </div>
        <div class="col col-2">
         <input type="text" v-model="taskSubject" placeholder="Task Subject"/>
        </div>
       <div class="col col-2">
         <input type="text" v-model="taskDueDate" placeholder="Due date"/>
       </div>
       <div class="col col-2">
         <select class="form-select mb-3" v-model="taskStatus">
             <option v-for="item in statusValues" v-bind:key="item.key" v-bind:value="item.key">{{ item.value }}</option>
         </select>
      </div>
      <div class="col col-2">
         <button v-on:click="createTask" class="btn btn-primary">Create Task</button>
      </div>
   </div>
  </div>
</template>

<script>
import { API } from 'aws-amplify';
import { createStudent } from '../graphql/mutations';
import { createTask } from '../graphql/mutations';
import { listStudents } from '../graphql/queries';
import { listTasks } from '../graphql/queries';
import { deleteTask } from '../graphql/mutations';



export default {
  name: 'App',
  async created() {
    this.getStudents();
  },
  data() {
    return {
      name: '',
      taskName: '',
      taskDueDate: '',
      taskStatus: '',
      taskSubject: '',
      editIndex: '',
      selectedStudent: null,
      Students: [],
      TaskItems: [],
      origTask: {},
      showGraded: false,
      statusValues: [
          {'key': 'NOT_STARTED','value': 'Not Started'},
          {'key': 'IN_PROGRESS','value': 'In Progress'},
          {'key': 'SUBMITTED','value': 'Submitted'},
          {'key': 'COMPLETED','value': 'Completed'},
          {'key': 'ZZZ_GRADED','value': 'Graded'}]
    }
  },
  methods: {
    mapStatus(status) {
      
      for (var item in this.statusValues) {
        if (this.statusValues[item].key == status) {
          return this.statusValues[item].value;
        }
      }
      
      return '';
    },
    async callApi() {
      const apiName = 'StayOnTaskAPIGateway';
      const path = '/task/83832?pdf=true';
      const myInit = { // OPTIONAL
        headers: {}, // OPTIONAL
      };
    
      var response = await API.get(apiName, path, myInit);
      console.log('response', response)
      window.open(response.documentUrl, '_blank');
    },
    editTask(task) {
      this.origTask = {
        studentId: task.studentId,
        hash: task.hash,
        name: task.name,
        subject: task.subject,
        dueDate: task.dueDate,
        status: task.status
      }
      
       this.editIndex = task.hash;
    },
    async deleteTask(deleteItem, clear) {
      
      await API.graphql({
        query: deleteTask,
        variables: {input: {
          studentId: deleteItem.studentId, 
          status: deleteItem.status,
          dueDate: deleteItem.dueDate,
          hash: deleteItem.hash}
        }
      });
     
     if (clear) {
        var i = this.TaskItems.length - 1;
        while (i >= 0) {
          if (this.TaskItems[i].hash === deleteItem.hash) {
            this.TaskItems.splice(i, 1);
          } 
          i--;
        }
     }


      this.origTask = {
        hash: ''
      };
      this.editIndex = '';
    },
    cancelTask(task) {
      task.name = this.origTask.name;
      task.dueDate = this.origTask.dueDate;
      task.status = this.origTask.status;
      task.subject = this.origTask.subject;
      
      this.editIndex = '';
      this.origTask = {
        hash: ''
      };
    },
    async updateTask(task) {
      task.dueDate = this.formatDate( task.dueDate)

      if (!task.name || !task.dueDate || !task.status) return;

      
      this.deleteTask(this.origTask, false);
      await API.graphql({
        query: createTask,
        variables: {input: {
          name: task.name,
          studentId: task.studentId, 
          status: task.status,
          subject: task.subject,
          dueDate: task.dueDate,
          hash: task.hash}
        },
      });
    },
    async changeStudent() {
      
      
      var variables = {
        'studentId':this.selectedStudent
      }
      
       if (!this.showGraded) {
         variables['filter'] = {
          'status': {
            'ne': 'ZZZ_GRADED'
          }
        };
       }


      
      const TaskItems = await API.graphql({
        query: listTasks,
        variables: variables,
      });

      this.TaskItems = TaskItems.data.listTasks.items;
      
      this.TaskItems.sort(function (first, second) {
        return Date.parse(first.dueDate ) -  Date.parse(second.dueDate ) 

      }) 
      
    },
    async createTask() {
      const { taskName , taskDueDate, taskStatus, taskSubject } = this;
      
      if (!taskName || !taskDueDate || !taskStatus) return;
      const Task = {studentId: this.selectedStudent, name: taskName, dueDate: this.formatDate(taskDueDate), status: taskStatus, hash: this.makeid(16), subject: taskSubject };
      
     
 
      this.TaskItems = [...this.TaskItems, Task];
      await API.graphql({
        query: createTask,
        variables: {input: Task},
      });
      this.taskName = '';
      this.taskDueDate = '';
      this.taskStatus = '';
      this.taskSubject = '';
    },
    async createStudent() {
      const { name } = this;
      if (!name) return;
      const Student = { name };
      this.Students = [...this.Students, Student];
      await API.graphql({
        query: createStudent,
        variables: {input: Student},
      });
      this.name = '';
    },
    async getStudents() {
      const Students = await API.graphql({
        query: listStudents
      });
      this.Students = Students.data.listStudents.items;
    },
    makeid(length) {
       var result           = '';
       var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
       var charactersLength = characters.length;
       for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
       }
       return result;
    },
    formatDate(date) {
      var d = new Date(Date.parse(date.replaceAll('-','/')));
      
      console.log(d);
      
      var month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();
  
      if (month.length < 2) 
          month = '0' + month;
      if (day.length < 2) 
          day = '0' + day;

     return [ month, day, year].join('/');
    }

  }
}
</script>