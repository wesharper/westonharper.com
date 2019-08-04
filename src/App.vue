<template>
  <div id="app">
    <MainContent />
  </div>
</template>

<script>
import MainContent from './components/MainContent.vue'

export default {
  name: 'app',
  components: {
    MainContent
  }
}
</script>

<style>
#app {
  font-family: 'Roboto Mono', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  margin-top: 60px;
  height: 100vh;
}

body {
  animation: colorchange 15s infinite;
  -webkit-animation: colorchange 15s infinite; /* Chrome and Safari */
}

@keyframes colorchange
{
  0%   {background: #ca5fa6;}
  25%  {background: #f36886;}
  50%  {background: #fa8282;}
  75%  {background: #ffaf65;}
  100% {background: #ca5fa6;}
}

@-webkit-keyframes colorchange /* Safari and Chrome - necessary duplicate */
{
  0%   {background: #ca5fa6;}
  25%  {background: #f36886;}
  50%  {background: #fa8282;}
  75%  {background: #ffaf65;}
  100% {background: #ca5fa6;}
}
</style>
