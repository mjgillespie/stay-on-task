<template>
  <div class="home">
    
    <Student />
  </div>
</template>

<script>
// @ is an alias to /src
import Student from '@/components/Student.vue'

export default {
  name: 'Home',
  components: {
    Student
  }
}
</script>
