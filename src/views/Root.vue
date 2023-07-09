<template>
    <div>
        <v-overlay :value="loading">
            <v-progress-circular indeterminate size="64">Loading</v-progress-circular>
        </v-overlay>
        <v-app id="inspire">
            <v-app-bar app color="primary" dark>
                <!-- <div class="d-flex align-center">
                    <v-img alt="Vuetify Logo" class="shrink mr-2" contain
                        src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png" transition="scale-transition"
                        width="40" />

                    <v-img alt="Vuetify Name" class="shrink mt-1 hidden-sm-and-down" contain min-width="100"
                        src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png" width="100" />
                </div> -->

                <v-spacer></v-spacer>

                <v-btn @click="signIn()" text>
                    <span class="mr-2">Вход</span>
                    <v-icon>mdi-open-in-new</v-icon>
                </v-btn>

                <v-btn href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank" text>
                    <span class="mr-2">Latest Release</span>
                    <v-icon>mdi-open-in-new</v-icon>
                </v-btn>
            </v-app-bar>
            <v-navigation-drawer v-model="leftNavBarDrawer" app disable-resize-watcher disable-route-watcher temporary>
                <template v-slot:prepend>
                    <v-list-item two-line>
                        <v-list-item-avatar size="80">
                            <img :src="getAvatar" height="64"  width="64" />
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title>{{
                                userFullName
                            }}</v-list-item-title>
                            <v-list-item-subtitle>Logged In</v-list-item-subtitle>
                        </v-list-item-content>
                        <v-btn icon @click="leftNavBarDrawer = !leftNavBarDrawer">
                            <v-icon>mdi-chevron-left</v-icon>
                        </v-btn>
                    </v-list-item>
                    <v-divider></v-divider>
                </template>
                <v-list dense>
                    <v-list-item v-for="item in menuItems" :to="item.path" :key="item.name" link @click="closeMenu">
                        <v-list-item-icon>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>{{
                                item.name
                            }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>

            <v-app-bar app color="primary" dark fixed clipped-left>
                <v-app-bar-nav-icon @click.stop="leftNavBarDrawer = !leftNavBarDrawer"></v-app-bar-nav-icon>
                <v-toolbar-title>{{ appTitleText }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <!-- 
                <div class="text-center">
                    <v-menu offset-y :close-on-content-click="closeOnContentClick">
                        <template v-slot:activator="{ on, attrs }">
                            <v-badge color="green" :content="unreadRequestsCount" :value="unreadRequestsCount" overlap
                                offset-x="22" offset-y="22">
                                <v-btn v-bind="attrs" v-on="on" icon @click="getRequest()">
                                    <v-icon>notifications</v-icon>
                                </v-btn>
                            </v-badge>
                        </template>

                        <v-list three-line max-width="400" v-if="unreadRequestsCount">
                            <template v-for="(item, index) in unreadRequests">
                                <v-subheader v-if="item.header" :key="item.header" v-text="item.header"></v-subheader>
                                <v-list-item v-bind:class="{
                                    teal: item.read,
                                    'lighten-4': item.read,
                                }" :key="item._id" @click="makeRead(item)">
                                    <v-list-item-avatar>
                                        <v-img :src="item.user.avatar"></v-img>
                                    </v-list-item-avatar>

                                    <v-list-item-content>
                                        <v-list-item-title v-html="item.message.request"></v-list-item-title>
                                        <v-list-item-subtitle v-html="`<span class='text--primary'>${new Date(
                                            item.createdAt
                                        ).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: '2-digit',
                                            hour: 'numeric',
                                            minute: 'numeric',
                                            second: 'numeric',
                                        })}</span>`
                                            "></v-list-item-subtitle>
                                        <v-list-item-subtitle
                                            v-html="`<span class='text--primary'>${item.user.customer}</span>${item.message.t}`"></v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-divider :key="index" v-if="index < requests.length - 1"></v-divider>
                            </template>
                        </v-list>
                    </v-menu>
                </div> -->
                <v-toolbar-title>{{ username }}</v-toolbar-title>
                <v-btn icon @click="exit()">
                    <v-icon>exit_to_app</v-icon>
                </v-btn>
            </v-app-bar>

            <v-main>
                <router-view></router-view>
            </v-main>

            <v-snackbar v-model="errorBar" color="error">
                {{ lastError }}
                <v-btn @click="errorBar = false" dark text>Close</v-btn>
            </v-snackbar>

            <v-snackbar v-model="messageBar" :timeout="timeout" color="teal">
                {{ lastMessage }}
                <v-btn @click="messageBar = false" dark text>Close</v-btn>
            </v-snackbar>
        </v-app>
    </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
export default Vue.extend({
    name: 'RootView',
    data() {
        return {
            closeOnContentClick: false,
            selected: [],
            errorBar: false,
            messageBar: false,
            timeout: 3000,
            polling: null,
            mini: true,
            appTitleText: process.env.VUE_APP_TITLE_TEXT,
        }
    },
    computed: {
        ...mapGetters({
            lastError: 'alert/lastError',
            errorsCount: 'alert/errorsCount',
            lastMessage: 'alert/lastMessage',
            messagesCount: 'alert/messagesCount',
            loading: 'loading/getLoading',
            getLeftNavBarDrawer: 'navbar/getLeftNavBarDrawer',
            username: 'authentication/getUserName',
            lastName: 'authentication/getUserLastName',
            firstName: 'authentication/getUserFirstName',
            getAvatar: 'profile/getAvatar',
            getAbout: 'profile/getAbout'
        }),
        menuItems() {
            return [
                {
                    icon: 'face',
                    name: 'Profile',
                    path: '/profile'
                }
            ]
        },
        leftNavBarDrawer: {
            get: function () {
                return this.getLeftNavBarDrawer
            },
            set: function (newVal) {
                this.$store.commit(`navbar/setLeftNavBarDrawer`, newVal)
            },
        },
        title() {
            return this.$route.name
        },
        userFullName() {
            return `${this.firstName} ${this.lastName}`
        },
    },
    watch: {
    },
    methods: {
        closeMenu() {
            this.leftNavBarDrawer = false
        },
        exit() {
            this.$router.push('/login')
        },
        signIn() {
            this.$router.push('/login')
        },
    },
    beforeDestroy() { },
    created() { },
    mounted() { },
})
</script>
<style lang="css" scoped>
#avatar {
    background-color: #009688;
    background-size: cover;
    position: absolute;
    top: 150px;
}
</style>
