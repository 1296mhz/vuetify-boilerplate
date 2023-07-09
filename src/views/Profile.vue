<template>
    <v-container fluid>
        <!-- <v-row justify="space-around" no-gutters>
                <v-col> -->
        <v-card :loading="loading" class="mx-auto" max-width="434" tile>
            <template slot="progress">
                <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
            </template>

            <v-img height="250" src="../assets/material.jpg"></v-img>
            <v-col>
                <v-avatar size="100" id="avatar">
                    <v-img :src="getAvatar"></v-img>
                </v-avatar>
            </v-col>
            <v-card-title>{{ userFullName }}</v-card-title>

            <v-card-text>
                <v-row align="center" class="mx-0">
                    <v-rating :value="5" color="amber" dense half-increments readonly size="14"></v-rating>

                    <div class="grey--text ms-4">
                        5 (678)
                    </div>
                </v-row>

                <div class="my-4 text-subtitle-1">
                     • USA
                </div>

                <div>{{ about }}</div>
            </v-card-text>

            <v-divider class="mx-4"></v-divider>

            <v-card-actions>
                <v-btn color="deep-purple lighten-2" text @click="reserve">
                    Reserve
                </v-btn>
            </v-card-actions>
        </v-card>
        <!-- </v-col>
            </v-row> -->

    </v-container>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
export default Vue.extend({
    name: 'ProfileView',
    data: () => ({
        loading: false,
        selection: 1,
    }),
    computed: {
        ...mapGetters({
            lastError: 'alert/lastError',
            errorsCount: 'alert/errorsCount',
            lastMessage: 'alert/lastMessage',
            messagesCount: 'alert/messagesCount',
            // loading: 'loading/getLoading',
            getLeftNavBarDrawer: 'navbar/getLeftNavBarDrawer',
            username: 'authentication/getUserName',
            lastName: 'profile/getUserLastName',
            firstName: 'profile/getUserFirstName',
            fatherName: 'profile/getUserFatherName',
            getAvatar: 'profile/getAvatar',
            about: 'profile/getAbout'
        }),
        userFullName() {
            return `${this.firstName} ${this.fatherName} ${this.lastName}`
        },
    },

    methods: {
        reserve() {
            this.loading = true
            setTimeout(() => (this.loading = false), 2000)
        },
    },
})
</script>

<style lang="css" scoped>
#avatar {
    /* background-color: #009688;
    background-size: cover; */
    position: absolute;
    top: 190px;
}
</style>