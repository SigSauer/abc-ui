<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a class="navbar-brand" href="/">CRM Banking</a>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/home">
            <font-awesome-icon icon="home"/>
            Домашня сторінка
          </router-link>
        </li>
        <li class="nav-item">
          <router-link v-if="currentUser" class="nav-link" to="/clients/natural">
            <font-awesome-icon icon="users"/>
            Фізичні особи
          </router-link>
        </li>
        <li class="nav-item">
          <router-link v-if="currentUser" class="nav-link" to="/clients/legal">
            <font-awesome-icon icon="hospital-user"/>
            Юридичні особи
          </router-link>
        </li>
      </div>

      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/login">
            <font-awesome-icon icon="sign-in-alt"/>
            Авторизація
          </router-link>
        </li>
      </div>

      <div v-if="currentUser" class="navbar-nav ml-auto">
        <li v-if="showAdminBoard" class="nav-item">
          <router-link class="nav-link" to="/admin/users">
            <font-awesome-icon icon="crown"/>
            Панель адміністратора
          </router-link>
        </li>
        <li v-if="showMarketingBoard" class="nav-item">
          <router-link class="nav-link" to="/admin/users">
            <font-awesome-icon icon="archive"/>
            Продукти
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/profile">
            <font-awesome-icon icon="user"/>
            {{ currentUser.username }}
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt"/>
            Вийти
          </a>
        </li>
      </div>
    </nav>

    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_ADMIN');
      }
      return false;
    },
    showMarketingBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_MARKETING');
      }
      return false;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>

