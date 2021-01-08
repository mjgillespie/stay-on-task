<template>
 
  <div id="app">
    <amplify-authenticator >
      <div class="no-print">
    <amplify-sign-out ></amplify-sign-out>
      </div>
    <router-view/>

  </amplify-authenticator>
  </div>
 
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
