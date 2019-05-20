<template>
  <div class="repoModal d-flex justify-content-center align-items-center" >
      <div class="loading" v-if="loading">
          <div>
            <i class="fa fa-spinner fa-pulse"></i>
          </div>
      </div>
      <div class="repoModal__box" :class="{blur:loading}">
          <div class="repoModal__header">
              <h3 class="repoModal__title mb-0">{{selectRepo.full_name}}</h3>
              <button class="repoModal__header__close" @click="closeModal"><i class="fa fa-times"></i></button>
          </div>
          <div class="repoModal__body">
            <div class="repoModal__select">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <label class="input-group-text" for="inputGroupSelect01"><i class="fas fa-code-branch mr-1"> </i> Branch</label>
                    </div>
                    <select class="custom-select" id="inputGroupSelect01" v-model="selectBranch">
                        <option v-for="(branch, index) in branches" :key="'op-'+index" :value="branch" :selected="selectBranch == branch">{{branch}}</option>
                    </select>
                </div>
            </div>
            <div class="repoModal__commits p-3">
                <table class="table table-hover" v-if="commits">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Author</th>
                            <th>Commit</th>
                            <th>Message</th>
                            <th>Branch</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(commit, index) in commits" :key="'branch-'+index">
                            <td class="table__circle"><i class="fas fa-circle mainColor"></i></td>
                            <td>
                                <span v-text="commit.commit.author.name"></span>
                            </td>
                            <td><a :href="commit.html_url" target="_blank">{{cutIdCommit(commit.sha)}}</a></td>
                            <td style="max-width:20em;">
                                <p>{{commit.commit.message}}</p>
                            </td>
                            <td>
                               <i class="fas fa-code-branch mr-1"></i> {{selectBranch}}
                            </td>
                            <td>{{commit.commit.author.date.split('T')[0]}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
          </div>
      </div> 
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: 'Modal',
  data(){
      return{
          branches: [],
          selectBranch:'',
          commits:undefined,
          loading: true
      }
  },
  mounted(){
      this.selectBranch = this.selectRepo.default_branch;
      this.getBranches();
  },
  computed:{
    selectRepo(){
      return this.$store.state.selectedRepo
    }
  },
  methods:{
      getBranches(){
        axios.get(`https://api.github.com/repos/${this.selectRepo.owner.login}/${this.selectRepo.name}/branches`)
        .then(res=>{
            this.branches = res.data.map(branch=>branch.name)
        }).catch(()=>{
            this.$swal({
                type: 'error',
                title: 'Oops...',
                text: "Something went wrong!",
            });
        })
      }, 
      getCommits(){
        this.loading = true;
        axios.get(`https://api.github.com/repos/${this.selectRepo.owner.login}/${this.selectRepo.name}/commits?sha=${this.selectBranch}`)
        .then(res=>{
            this.commits = res.data;
            this.loading = false
        }).catch(()=>{
            this.loading = false
             this.$swal({
                type: 'error',
                title: 'Oops...',
                text: "Something went wrong!",
            });
        })
      },
      cutIdCommit(id){
          if(!id) return ""
          return id.substring(0,6)
      },
      closeModal(){
        this.$store.commit('setSelectRepo', '')
      }
  },
  watch:{
      selectBranch: function(){
          this.getCommits();
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style  lang="scss">
@import '../assets/scss/imports/variables.scss';
.loading{
    font-size: 5rem;
    color: $mainColor;
    position: absolute;
    z-index: 9999;
    width: 100%;
    background-color: rgba(#fff,.3);
    top: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}
.blur{
    filter: blur(3px)
}
.repoModal{
    position: fixed;
    background-color: rgba(0,0,0, .8);
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    &__title{
        text-transform: capitalize;
    }
    &__header{
        position: relative;
        padding: .5em;
        color: #fff;
        background: #1e5799; /* Old browsers */
        background: -moz-linear-gradient(left,  #1e5799 0%, #33c0d5 100%); /* FF3.6-15 */
        background: -webkit-linear-gradient(left,  #1e5799 0%,#33c0d5 100%); /* Chrome10-25,Safari5.1-6 */
        background: linear-gradient(to right,  #1e5799 0%,#33c0d5 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#1e5799', endColorstr='#33c0d5',GradientType=1 ); /* IE6-9 */
        &__close{
            position: absolute;
            right: .4em;
            background-color: transparent;
            border: none;
            color:#fff;
            font-size: 1.3em;
            top: 50%;
            transform: translateY(-50%)
        }
    }
    &__select{
        max-width: 25em;
        margin-top: 1.5em;
        margin-left: 1em;
    }
    &__box{
        background-color: #fff;
        width: 90%;
        max-width: 1000px;
        border-radius: .5rem;
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
        overflow: hidden;
    }
    &__commits{
        max-height: 25em;
        overflow-y: hidden;
        &:hover{
            overflow-y: scroll;
        }
    }
}
.table{
    tbody td{
        padding-bottom: .2rem;
    }
    &__avatar{
        width: 2rem;
        height: auto;
    }
    &__circle{
        position: relative;
        overflow: hidden;
        &:after{
            content: "";
            position: absolute;
            display: block;
            height: 100px;
            width: 2px;
            background: $mainColor;
            left: 50%;
            transform: translateX(-50%);
            top: 0;
        }
    }
}
</style>
