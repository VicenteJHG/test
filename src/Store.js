import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const Store = new Vuex.Store({
    plugins: [createPersistedState()],

    state: {



        tokens: {
            token: null,
            userId: null
        },
        authenticated: false,
        currentUser: {
            name: null,
            surname: null,
            email: null,
            role: null,
            id: null
        },
        managedUser: { }
    },

    actions: {
        login(context, user) {
            return new Promise((resolve, reject) => {
                let data = {
                    email: user.email,
                    password: user.password,
                };

                axios.post(API.auth, data)
                    .then(response => {
                        let responseData = response.data.data
                        context.commit('updateTokens', responseData)                        
                        resolve(response)
                    })
                    .catch(response => {
                        reject(response)
                    })
            })
        },   

        logout( context ) {
            context.commit('cleanState'); 
        },

        getUser( context, id ) {
            return new Promise((resolve, reject) => {
                axios.get( API.users + id  )
                    .then(response => {
                        let responseData = response.data.data
                        context.commit('updateUser', responseData);
                        resolve(response)
                    })
                    .catch(response => {
                        reject(response)
                    })    
            })
        },

        setUserToModify(context, user ) {
            context.commit('updateManagedUser', user);
        }
    },

    mutations: {
        updateTokens(state, tokens) {
            state.tokens = tokens
            state.authenticated = true;
            axios.defaults.headers.common['Authorization'] = 'JWT ' + tokens.token;
        },
        updateUser(state, user) {
            state.currentUser = user;
            state.currentUser.id = user._id;
        } ,

        cleanState(state){
            state.authenticated = false;
        },

        updateManagedUser(state,user){
            state.managedUser = user;
        }
    }
})

export default Store