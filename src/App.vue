<template>
  <div id="app">
    <Header></Header>
    <Container></Container>
  </div>
</template>

<script>
import Header from './components/header'
import Container from './components/Container'

export default {
  name: 'app',
  components: {
    Header,
    Container
  }
}
</script>

<style>
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 3rem;
}
</style>
