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
                                <v-form @submit.prevent="submit">
                                    <v-text-field v-model="email" label="Login" prepend-icon="person"
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
                <p>HelloWorld!</p>
            </v-col>
        </v-footer>
    </v-app>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
    name: 'LoginView',
    data: () => ({
        email: null,
        password: null,
        errorBar: false,
        progressBar: false,
        logoImageHeight: 150,
        logoImageWidth: 150,
    }),

    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn
        },
        lastError() {
            return this.$store.getters.lastError
        },
        errorsCount() {
            return this.$store.getters.errorsCount
        },
    },

    watch: {
        errorsCount() {
            this.errorBar = true
        },
    },
    mounted() {
        // this.$store.dispatch('setLoading', true)
    },
    methods: {
        // Login
        async submit() {
            this.progressBar = true
            try {
                // await this.$store.dispatch('auth/login', {
                //     password: this.password,
                //     email: this.email,
                // })
                this.$router.push('/')
            } finally {
                this.progressBar = false
            }
        },
    },
})
</script>
