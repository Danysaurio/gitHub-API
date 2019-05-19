<template>
  <section class="container mt-4">
      <div class="row">
        <div class="col-md-4" v-for="(repo,index) in reposList" :key="'repo'+index" >
          <Card :data="repo" ></Card>
        </div>
      </div>
  </section>
</template>

<script>
import Card from "./Card"
export default {
  name: 'Container',
  components:{
    Card
  },
  computed:{
    reposList(){
      return this.$store.state.repos
    }
  },
  mounted(){
    this.reposList
  },
  methods:{}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="scss">
@import '../assets/scss/imports/variables.scss';
    
</style>
