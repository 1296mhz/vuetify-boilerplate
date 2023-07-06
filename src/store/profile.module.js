import Vue from 'vue'
import { userService } from '../_services';

export const profile = {
    namespaced: true,
    state: {
        avatar: '',
    },
    mutations: {
        setAvatar(state, avatar) {
            Vue.set(state, 'avatar', avatar);
        },
    },
    actions: {
        // { dispatch, commit }
        async getProfile() { 
            try{
                const res = await userService.getProfile();
                console.log(res)
            }catch(error){
                console.log("Хуй на руль")
                console.log(error)
            }
            
        }
    },
    getters: {
        getaAvatar: state => state.avatar
    },
};