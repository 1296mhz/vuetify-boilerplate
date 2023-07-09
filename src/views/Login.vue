<template>
    <v-app id="inspire">
        <v-main>
            <v-container class="fill-height" fluid>
                <v-row justify="center">
                    <v-col cols="12" sm="8" md="4" lg="4" xs="4">
                        <v-card class="elevation-12">
                            <v-card-title primary-title class="justify-center">
                                <div id="logo-wrapper">
                                    <v-img src="../assets/logo.png" :max-height="logoImageHeight"
                                        :max-width="logoImageWidth"></v-img>
                                </div>
                            </v-card-title>
                            <v-card-text>
                                <v-form @submit.prevent="handleSubmit">
                                    <v-text-field v-model="username" label="Login" prepend-icon="person"
                                        type="text"></v-text-field>
                                    <v-text-field v-model="password" label="Password" prepend-icon="lock"
                                        type="password"></v-text-field>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="primary" type="submit">Login</v-btn>
                                    </v-card-actions>
                                </v-form>
                            </v-card-text>

                            <v-progress-linear :active="progressBar" indeterminate></v-progress-linear>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>

        <!-- Snackbar -->
        <v-snackbar v-model="errorBar" color="error">
            {{ lastError }}
            <v-btn @click="errorBar = false" dark text>Close</v-btn>
        </v-snackbar>
        <v-footer app>
            <v-col class="text-end" cols="12">
                <p>All Pigs Must Die!</p>
            </v-col>
        </v-footer>
    </v-app>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
export default Vue.extend({
    name: 'LoginView',
    data: () => ({
        username: null,
        password: null,
        submitted: false,
        progressBar: false,
        logoImageHeight: 150,
        logoImageWidth: 150,
    }),

    computed: {
        ...mapGetters({
            lastError: 'alert/lastError',
            getErrorBar: 'alert/getErrorBar',
            errorsCount: 'alert/errorsCount',
            lastMessage: 'alert/lastMessage',
            messagesCount: 'alert/messagesCount',
            loading: 'loading/getLoading',
            getLeftNavBarDrawer: 'navbar/getLeftNavBarDrawer',
        }),
        errorsCount() {
            return this.$store.getters.errorsCount
        },
        errorBar: {
            get() {
                return this.getErrorBar
            },
            async set(val) {
                const { dispatch } = this.$store;
                dispatch('alert/errorBar', val);
            }
        }
    },
    watch: {
    },
    mounted() {
    },
    methods: {
        async handleSubmit () {
            this.submitted = true;
            const { username, password } = this;
            const { dispatch } = this.$store;
            if (username && password) {
                await dispatch('loading/setLoading', true)
                await dispatch('authentication/login', { username, password });
                await dispatch('profile/getProfile')
                await dispatch('loading/setLoading', false)
            }
        }
    },
    created () {
        this.$store.dispatch('authentication/logout');
    },
})
</script>
