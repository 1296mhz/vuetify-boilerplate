<template>
    <div>
        <v-overlay :value="!loading">
            <v-progress-circular indeterminate size="64">Loading</v-progress-circular>
        </v-overlay>
        <v-app id="inspire">
            <v-navigation-drawer v-model="leftNavBarDrawer" app disable-resize-watcher disable-route-watcher temporary>
                <template v-slot:prepend>
                    <v-list-item two-line>
                        <v-list-item-avatar>
                            <img src="../assets/users.png" />
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title>{{
                                authCustomer
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
                <v-btn v-if="title === 'Reports'" icon @click="drawerReports = !drawerReports">
                    <v-icon>mdi-file-tree</v-icon>
                </v-btn>
                <!-- <v-breadcrumbs :items="breadCrumbs">
                    <template v-slot:item="{ item }">
                        <v-breadcrumbs-item :href="item.href" :disabled="item.disabled" exact>
                            {{ item.text }}
                        </v-breadcrumbs-item>
                    </template>
                </v-breadcrumbs> -->
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
                <!-- <v-toolbar-title>{{ authUser }}</v-toolbar-title>
                <v-btn icon @click="exit()">
                    <v-icon>exit_to_app</v-icon>
                </v-btn> -->
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
import { filter } from 'lodash'
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
        }
    },
    computed: {
        ...mapGetters({
            lastError: 'alert/lastError',
            errorsCount: 'alert/errorsCount',
            lastMessage: 'alert/lastMessage',
            messagesCount: 'alert/messagesCount',
            loading: 'loading/getLoading'
        }),
        // loading() {
        //     return false
        // },
        menuItems() {
            const loggedIn = localStorage.getItem('user')
            const loggedInJSON = JSON.parse(loggedIn)
            return filter(
                this.$router.options.routes[1].children,
                (v) => {
                    return !(
                        !v.meta.authorize.includes(loggedInJSON.data.role)
                    )
                }
            )
        },
        // breadCrumbs() {
        //     if (typeof this.$route.meta.breadCrumb === 'function') {
        //         return this.$route.meta.breadCrumb.call(this, this.$route)
        //     }
        //     return this.$route.meta.breadCrumb
        // },
        leftNavBarDrawer: {
            get: function () {
                return false
                //return this.$store.state.leftNavBarDrawer
            },
            set: function (newVal) {
                this.$store.commit(`setLeftNavBarDrawer`, newVal)
            },
        },
        title() {
            return this.$route.name
        },
        authUser() {
            return 'xxx@xxx'
        },
        authCustomer() {
            return 'xxx'
        },
        unreadRequests() {
            return []
            // return Vue._.filter(
            //     this.$store.getters[`message/${MESSAGE_GETTER.GET_REQUESTS}`],
            //     (value) => !value.read
            // ).slice(-3)
        },
        requests() {
            return []
            // return this.$store.getters[`message/${MESSAGE_GETTER.GET_REQUESTS}`]
        },
        unreadRequestsCount() {
            return []
            // return this.$store.getters[
            //     `message/${MESSAGE_GETTER.GET_UNREADREQUESTS}`
            // ]
        },
    },

    watch: {
        // errorsCount: function () {
        //     this.errorBar = true
        // },
        // messagesCount: function () {
        //     this.messageBar = true
        // },
    },

    methods: {
        closeMenu() {
            this.leftNavBarDrawer = false
        },
        exit() {
            this.$store.dispatch('auth/logout')
            this.$router.push('/login')
        },
    },
    beforeDestroy() {

    },
    created() {
    },
    async mounted() {
        console.log(this)
    },
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
