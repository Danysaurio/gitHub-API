<template>
  <div class="header">
      <img src="../assets/Octocat.png" alt="Logo gitHub" class="header__logo">
      <h1 class="header__title mb-4">Search Github</h1>
      <div class="row justify-content-center">
        <div class="col-md-5">
          <Search></Search>
        </div>
      </div>
  </div>
</template>

<script>
import Search from './search'
export default {
  name: 'Header',
  components:{
    Search
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="scss">
@import '../assets/scss/imports/variables.scss';
.header{
  &__logo{
    max-width: 10rem;
  }
  &__title{
    font-weight: 100;
    font-size: 3rem;
    margin-top: .5rem;
    color: $mainColor;
  }
}
</style>
