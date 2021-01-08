<template>
  <div >
    
    <div id="app" class="container">
      <div class="row  s">
        <div class="col col-2"><h3>Subject</h3></div>
        <div class="col col-4">
          <input type="text" v-model="subjectName" placeholder="Subject Name"/>
        </div>
        <div class="col col-2">
          <button  class="btn btn-primary" v-on:click="createSubject">Create Subject</button>
        </div>
      </div>
   </div>
  </div>
</template>

<script>
import { API } from 'aws-amplify';
import { createSubject } from '../graphql/mutations';

export default {
  name: 'Subject',
  async created() {
  },
  props: ['studentid'],
  data() {
    return {
      subjectName: '',
      subjectHash: ''
    }
  },
  methods: {
    async createSubject() {
      if (!this.subjectName) return;
      const Subject = {studentId: this.studentid, name: this.subjectName, hash: this.makeid(6) };
      
      await API.graphql({
        query: createSubject,
        variables: {input: Subject},
      });

      this.$emit('add', Subject)

      this.subjectName = '';
      this.subjectHash = '';
    },
    makeid(length) {
       var result           = '';
       var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
       var charactersLength = characters.length;
       for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
       }
       return result;
    }
  }
}
</script>