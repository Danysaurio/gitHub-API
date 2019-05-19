<template>
  <div class="header">
      <img src="../assets/Octocat.png" alt="Logo gitHub" class="header__logo">
      <h1 class="header__title">Search Github</h1>
  </div>
</template>

<script>
export default {
  name: 'Header',
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
