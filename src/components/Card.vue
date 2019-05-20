<template>
  <article class="w-100 itemCard mb-4">
     <div class="p-3">
        <small class="itemCard__date ml-2 secondaryColor">{{getdate(data.created_at)}}</small>
        <small class="itemCard__score mr-2"><i class="fas fa-star"> </i> {{data.score}}</small>
        <img :src="data.owner.avatar_url" class="itemCard__img">
        <h4 class="itemCard__title mt-3 mb-0" v-text="data.name"></h4>
        <small class="itemCard__ mt-0">by</small>
        <a :href="data.owner.html_url" class="d-block secondaryColor">
            {{data.owner.login}}
        </a>
        <hr>
        <div class="itemCard__description">
            <p v-text="data.description"></p>
        </div>
     </div>
     <div class="itemCard__footer">
         <button class="itemCard__btn" @click="selectRepo(data)">
           <i class="far fa-eye"> </i> View repositorie
         </button>
     </div>
  </article>
</template>

<script>
export default {
  name: 'Card',
  props:['data'],
  methods:{
      getdate(date){
          let cutDate = date.split('T');
          return cutDate[0]
      },
      selectRepo(repo){
        this.$store.commit('setSelectRepo', repo)
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="scss">
@import '../assets/scss/imports/variables.scss';
    .itemCard{
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        background: #fff;
        border-radius: 10px;
        position: relative;
        overflow: hidden;
        &__img{
            max-width: 4rem;
        }
        &__date{
            position: absolute;
            left: 0;
        }
        &__title{
            font-weight: 100;
            font-weight: 400;
            text-transform: capitalize;
            color: $mainColor;
        }
        &__score{
            background-color: $mainColor;
            color:#fff;
            position: absolute;
            right: 0;
            border-radius: 3px;
            padding: 3px 6px;
            font-size: .6rem;
            font-weight: 600;
        }
        &__btn{
            width: 100%;
            color: #fff;
            background: #1e5799; /* Old browsers */
            background: -moz-linear-gradient(left,  #1e5799 0%, #33c0d5 100%); /* FF3.6-15 */
            background: -webkit-linear-gradient(left,  #1e5799 0%,#33c0d5 100%); /* Chrome10-25,Safari5.1-6 */
            background: linear-gradient(to right,  #1e5799 0%,#33c0d5 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#1e5799', endColorstr='#33c0d5',GradientType=1 ); /* IE6-9 */
            padding: .4em;
            font-weight: 400;
            outline: none !important;
            border: none;
        }
        &__description{
            min-height: 7.5rem;
            max-height: 7.5rem;
        }
    }
</style>
