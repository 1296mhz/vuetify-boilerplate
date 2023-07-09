import Vue from 'vue'
import { userService } from '../_services';

export const profile = {
    namespaced: true,
    state: {
        avatar: '',
        about: '',
        firstName: '',
        lastName: '',
        fatherName: ''
    },
    mutations: {
        setAvatar(state, avatar) {
            Vue.set(state, 'avatar', avatar);
        },
        setAbout(state, about){
            Vue.set(state, 'about', about);
        }
    },
    actions: {
        async getProfile({commit}) { 
            try{
                const res = await userService.getProfile();
                commit('setAvatar', res.avatar);
                commit('setAbout', res.about)
            }catch(error){
                console.log(error)
            }   
        }
    },
    getters: {
        getAvatar: state => state.avatar,
        getAbout: state => state.about,
        getUserFirstName: state => state.firstName,
        getUserLastName: state => state.lastName,
        getUserFatherName: state => state.fatherName
    },
};