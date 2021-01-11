<template>
  <div >
    
    <div id="app" class="container">
      <div class="row tasktable" v-show="userInfo && userInfo.role == 'admin'">
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
       <div class="row tasktable"  >
        <div class="col col-2" v-show = "selectedStudent != null && userInfo && userInfo.role == 'admin'">
          <div class="form-check">
          <input class="form-check-input" type="checkbox" value=""  v-on:change="changeStudent" v-model="showGraded" id="flexCheckDefault">
          <label class="form-check-label" for="flexCheckDefault"  >
            Show Graded
          </label>
        </div>
        </div>
         <div class="col col-10">
          <a class="btn btn-info" target="_blank" :href="'/?studentid=' + selectedStudent">Print Agenda</a>
        </div>
      </div>
      <div class="row tasktable" v-show="selectedStudent != null">
        <div class="col col-4">Task</div>
        <div class="col col-2">Subject</div>
        <div class="col col-1">Due Date</div>
        <div class="col col-2">Status</div>
        <div class="col col-1"></div>
        <div class="col col-2"></div>
      </div>
      <div v-for="task in TaskItems" v-bind:key="task.hash" v-bind:value="task.hash">
        <div class="row tasktable">
          <div class="col col-4">
            <label v-show = "editIndex != task.hash || userInfo.role != 'admin'"> {{task.name}} </label>
            <input class="taskfield" name="taskname" 
             v-show = "editIndex == task.hash && userInfo.role == 'admin'"
             v-model = "task.name" >
          </div>
          <div class="col col-2">
            <label v-show = "editIndex != task.hash || userInfo.role != 'admin'"> {{resolveSubject(task.subject)}} </label>

            <select class="taskfield" v-model="task.subject"  v-show = "editIndex == task.hash && userInfo.role == 'admin'" >
              <option v-for="subject in Subjects" v-bind:key="subject.hash" v-bind:value="subject.hash">{{ subject.name }}</option>
            </select>
          </div>
          <div class="col col-1">
            <label v-show = "editIndex != task.hash || userInfo.role != 'admin'"> {{task.dueDate}} </label>

            <input class="taskfield" name="taskDueDate" 
                 v-show = "editIndex == task.hash && userInfo.role == 'admin'" 
                 v-model = "task.dueDate" >                  
          </div>
          <div class="col col-2"> 
            <label v-show = "editIndex != task.hash"> {{mapStatus(task.status)}} </label>
            <select class="taskfield" v-model="task.status"  v-show = "editIndex == task.hash" >
              <option v-for="item in statusValues" v-bind:key="item.key" v-bind:value="item.key">{{ item.value }}</option>
            </select>
          </div>
          <div class="col col-1" v-show = "editIndex != task.hash">
             <button  v-show = "showNotes != task.hash" v-on:click="showNotes = task.hash" type="button" class="btn btn-white">
              <span v-show = "task.notes == ''" class="glyphicon glyphicon glyphicon-remove" aria-hidden="true">Notes
              </span>
              <span v-show = "task.notes != ''" class="glyphicon glyphicon glyphicon-remove" aria-hidden="true">Notes*
              </span>
            </button>
             <button  v-show = "showNotes == task.hash" v-on:click="showNotes =''" type="button" class="btn btn-white"><span class="glyphicon glyphicon glyphicon-remove" aria-hidden="true">Close</span></button>
          
            
          </div>
          <div class="col col-2">
              <button  v-show = "editIndex != task.hash" v-on:click="editTask(task)" type="button" class="btn btn-primary"><span class="glyphicon glyphicon glyphicon-pencil" aria-hidden="true">Edit</span></button>
              <button  v-show = "editIndex != task.hash && userInfo.role == 'admin'" v-on:click="deleteTask(task, true)" type="button" class="btn btn-white"><span class="glyphicon glyphicon glyphicon-remove" aria-hidden="true">Delete</span></button>
              <button  v-show = "editIndex == task.hash" v-on:click="updateTask(task)" type="button" class="btn btn-primary"><span class="glyphicon glyphicon glyphicon-pencil" aria-hidden="true">Save</span></button>
              <button  v-show = "editIndex == task.hash " v-on:click="cancelTask(task)" type="button" class="btn btn-white"><span class="glyphicon glyphicon glyphicon-remove" aria-hidden="true">Cancel</span></button>
          </div>
        </div>
        <div class="row tasknotes" v-show = "(editIndex != task.hash || userInfo.role != 'admin') && showNotes == task.hash">
              <div class="col col-11 tasknote" >
                <vue-markdown :key="task.notes">{{ task.notes }} </vue-markdown>
              </div>
              <div class="col col-1"/>

        </div>
        <div class="row tasknotes" v-show = "editIndex == task.hash && userInfo.role == 'admin'">
              <div class="col col-11" >
                 <textarea v-model="task.notes" rows="10" style="width: 100%; height: auto;overflow-y: scroll;" placeholder="Task Notes"/>
              </div>
        </div>
      </div>
    </div>
    
    
    
    
   
    <div class="row" v-show = "selectedStudent != null && userInfo && userInfo.role == 'admin'">
      <div class="col col-1">
        </div>
        <div class="col col-2">
          <input type="text" v-model="taskName" placeholder="Task Name"/>
        </div>
        <div class="col col-2">
            <select class="taskfield" v-model="taskSubject"  >
              <option v-for="subject in Subjects" v-bind:key="subject.hash" v-bind:value="subject.hash">{{ subject.name }}</option>
            </select>
        </div>
       <div class="col col-2">
         <input type="text" v-model="taskDueDate" placeholder="Due date"/>
       </div>
       <div class="col col-2">
         <select class="form-select mb-3" v-model="taskStatus">
             <option v-for="item in statusValues" v-bind:key="item.key" v-bind:value="item.key">{{ item.value }}</option>
         </select>
      </div>
    </div>
    <div class="row" v-show = "selectedStudent != null && userInfo && userInfo.role == 'admin'">
      <div class="col col-1">
        </div>
      <div class="col col-8">
          <textarea v-model="taskNotes" style="width: 100%" placeholder="Task Notes"/>
        </div>
      <div class="col col-2">
         <button v-on:click="createTask" class="btn btn-primary">Create Task</button>
      </div>
   </div>
    <Subject :studentid="selectedStudent" v-show = "selectedStudent != null && userInfo && userInfo.role == 'admin'" v-on:add="changeStudent()"></Subject>
  </div>
</template>

<script>
import { API } from 'aws-amplify';
import { createStudent } from '../graphql/mutations';
import { createTask } from '../graphql/mutations';
import { listStudents } from '../graphql/queries';
import { listTasks } from '../graphql/queries';
import { deleteTask } from '../graphql/mutations';
import { listSubjects } from '../graphql/queries';
import Subject from '@/components/Subject.vue'
import VueMarkdown from 'vue-markdown'
import { Auth } from 'aws-amplify'
import { getUser } from '../graphql/queries';
import { createUser } from '../graphql/mutations';
import { updateUser } from '../graphql/mutations';


export default {
  name: 'Student',
  async created() {
    
    var currentUser = await Auth.currentAuthenticatedUser();

    this.userInfo = await this.getUserInfo(currentUser.attributes.email);
    this.$session.set('userInfo', this.userInfo);



    if (this.$route.query.studentid) {
      this.$router.push({'name': 'Print', params: { studentid: this.$route.query.studentid}});
    }
    
    this.getStudents();
  },
  components: {
    Subject: Subject,
    VueMarkdown: VueMarkdown
  },
  data() {
    return {
      name: '',
      userInfo: null,
      taskName: '',
      taskDueDate: '',
      taskStatus: '',
      taskSubject: '',
      editIndex: '',
      showNotes: '',
      taskNotes: '',
      selectedStudent: null,
      Students: [],
      TaskItems: [],
      Subjects: [],
      origTask: {},
      showGraded: false,
      statusValues: [
          {'key': 'NOT_STARTED','value': 'Not Started'},
          {'key': 'IN_PROGRESS','value': 'In Progress'},
          {'key': 'SUBMITTED','value': 'Submitted'}]
    }
  },
  methods: {
    async getUserInfo(email) {
      var userInfo = await API.graphql({
        query: getUser,
        variables: {id: email},
      });

      userInfo = userInfo.data.getUser;

      if (userInfo.role == 'admin') {
        this.statusValues.push({'key': 'COMPLETED','value': 'Verified'})
        this.statusValues.push({'key': 'ZZZ_GRADED','value': 'Graded'})
      }

      if (userInfo == null) {
        userInfo = {
          "id": email,
          "role": "readonly",
          "students": []
        }
        await API.graphql({
          query: createUser,
          variables: {
            input: userInfo
          }
        });
      }
      return userInfo;
    },
    resolveSubject(hash){
      for (var i in this.Subjects) {
        if (this.Subjects[i].hash == hash) {
          return this.Subjects[i].name;
        }
      }
      
      return '';
    },
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

      
      await this.deleteTask(this.origTask, false);
      await API.graphql({
        query: createTask,
        variables: {input: {
          name: task.name,
          studentId: task.studentId, 
          status: task.status,
          subject: task.subject,
          dueDate: task.dueDate,
          notes: task.notes,
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

      const Subjects = await API.graphql({
        query: listSubjects,
        variables: {
        'studentId':this.selectedStudent
        }
      });
      this.Subjects = Subjects.data.listSubjects.items;
      this.Subjects.sort(function (first, second) {
        if (first.name < second.name) return -1;
        if (first.name > second.name) return 1;
        return 0;
      });

      this.TaskItems = TaskItems.data.listTasks.items;
      
      var me = this;

      this.TaskItems.sort(function (first, second) { 
        if (me.resolveSubject(first.subject) < me.resolveSubject(second.subject)) return -1;
        if (me.resolveSubject(first.subject) > me.resolveSubject(second.subject)) return 1;
        return Date.parse(first.dueDate ) -  Date.parse(second.dueDate ) 

      });
      
    },
    async createTask() {
      const { taskName , taskDueDate, taskStatus, taskSubject } = this;
      
      if (!taskName || !taskDueDate || !taskStatus) return;
      const Task = {studentId: this.selectedStudent, name: taskName, dueDate: this.formatDate(taskDueDate), status: taskStatus, hash: this.makeid(16), subject: taskSubject, notes: this.taskNotes};
      
     
 
      this.TaskItems = [...this.TaskItems, Task];
      await API.graphql({
        query: createTask,
        variables: {input: Task},
      });
      this.taskName = '';
      this.taskDueDate = '';
      this.taskStatus = '';
      this.taskSubject = '';
      this.taskNotes = '';
    },
    async createStudent() {
      const { name } = this;
      if (!name) return;
      const Student = { name };
      
      var newStudent = await API.graphql({
        query: createStudent,
        variables: {input: Student},
      });
      newStudent = newStudent.data.createStudent;

      console.log('newStudent', newStudent);

      this.Students = [...this.Students, newStudent];
      

      var currentUser = this.$session.get('userInfo');
      
      currentUser.students.push(newStudent.id);

      await API.graphql({
        query: updateUser,
        variables: {input: {
            id: currentUser.id,
            role: currentUser.role,
            students: currentUser.students
          }}
      });
      


      this.name = '';
    },
    async getStudents() {

      var currentUser = this.$session.get('userInfo');

      var students = [{id: {eq: 'XXX'}}];

      for (var i=0; i < currentUser.students.length; i++){
        students.push({id: {eq: currentUser.students[i]}});
      }

      const Students = await API.graphql({
        query: listStudents,
        variables: {
          filter: {
            'or': students
          }
        }
      });
      this.Students = Students.data.listStudents.items;

      if (this.Students.length >= 1) {
        this.selectedStudent = this.Students[0].id;
        this.changeStudent() 
      }

      console.log('this.selectedStudent', this.selectedStudent)
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