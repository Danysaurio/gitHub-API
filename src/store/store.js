import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state:{
        repos: [],
        selectedRepo: ''
    },
    mutations:{
        setRepos(state, repos){
            state.repos = repos
        },
        setSelectRepo(state,repo){
            state.selectedRepo = repo
        }
    }
})