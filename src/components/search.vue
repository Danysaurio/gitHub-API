<template>
  <div class="search">
    <form class="w-100 d-flex align-items-center  " @submit.prevent="searchRepo">
      <input type="search" name="search" id="searchRepo" v-model="searchValue" class="w-100 search__input" placeholder="Search repo" :disabled="loading">
      <button type="submit" class="search__btn ml-1" :disabled="loading">
        <i class="fas " :class="loading ? 'fa-spinner fa-spin':'fa-search' "></i>
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: 'Search',
  data(){
    return{
      searchValue: "vue",
      loading: false
    }
  },
  mounted(){},
  methods:{
    searchRepo(){
      if(this.loading)return;
      this.loading = true;
      axios.get(`https://api.github.com/search/repositories?q=${this.searchValue}`)
      .then(res=>{
        let {data:{items}} = res;
        this.loading = false;
        this.$store.commit('setRepos', items)
      }).catch(err=>{
        console.log(err)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="scss">
@import '../assets/scss/imports/variables.scss';
  .search{
    &__input{
      background-color: #fff;
      border: 1px solid #d6d6d6;
      padding: .3rem .6rem;
      font-size: 1.3rem;
      border-radius: 10px;
      font-weight: 100;
      box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
      transition: all 0.3s cubic-bezier(.25,.8,.25,1);
      &:focus{
        box-shadow: 0 4px 18px rgba(0,0,0,0.25), 0 4px 5px rgba(0,0,0,0.22);
        outline: none;
      }
    }
    &__btn{
      background-color: transparent;
      font-size: 1.3rem;
      border: none;
      color: $secondaryColor;
      border-radius: 100%;
      transition: .5s ease all;
      outline: none !important;
      &:hover{
        background-color: $secondaryColor;
        color:#fff;
      }
    }
  }
</style>
