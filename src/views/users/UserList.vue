<template>
  <div v-if="this.$store.state.auth.user.roles.includes('ROLE_ADMIN')" id="gen" class="list row">

    <div class="form-row">
      <div class="col-md-12">

        <div class="input-group mb-4">
          <input v-model="username" class="form-control" placeholder="Пошук за іменем користувача"
                 type="text"/>

          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" @click="searchUsername">Пошук</button>
          </div>
        </div>

      </div>
    </div>
    <div class="form-row">
      <div class="col-md-6">
        <h4>Користувачі</h4>
        <ul id="list" class="list-group">
          <li v-for="(user, index) in users"
              :key="index"
              :class="{ active: index === currentIndex }"
              class="list-group-item"
              @click="setActiveUser(user, index)">{{ user.username }}
          </li>
        </ul>
        <div class="input-group col-md-8">
          <button id="createButton" class="btn btn-primary col-md-12" type="button" @click="toCreateUser">Створити
            користувача
          </button>
        </div>
      </div>
      <div class="col-md-6">
        <div v-if="currentUser">
          <div class="card border-dark mb-3" style="width: 100%;">
            <div class="card-body">
              <h5 class="card-title"><b> {{ currentUser.username }}</b></h5>

              <div class="card-text">
                <div>
                  <label><strong>Ім'я користувача:</strong></label> {{ currentUser.username }}
                </div>
                <div>
                  <label><strong>Повне ім'я:</strong></label> {{ currentUser.name }}
                </div>
              </div>
              <router-link :to="'/admin/users/' + currentUser.id" class="btn btn-warning mb-3">Детальна інформація
              </router-link>
            </div>
          </div>
        </div>
        <div v-else>
          <br/>
          <p>Оберіть користувача для відображення картки</p>
        </div>
      </div>
    </div>

  </div>
  <div v-else>
    <br/>
    <p>ДОСТУП ЗАБОРОНЕНО</p>
  </div>
</template>

<script>

import UserService from "../../services/user.service";

export default {
  name: "user-list",
  data() {
    return {
      users: [],
      currentUser: null,
      currentIndex: -1,
      username: ''
    };
  },
  methods: {
    retrieveUsers() {
      UserService.getAll()
          .then(response => {
            this.users = response.data;
          }, error => {
            //eslint-disable-next-line
            console.log(error.response);
            this.postValidation(error.response.data.message, false);
          });
    },
    refreshList() {
      this.retrieveUsers();
      this.currentUser = null;
      this.currentIndex = -1;
    },
    setActiveUser(user, index) {
      this.currentUser = user;
      this.currentIndex = index;
    },
    toCreateUser() {
      this.$router.push('/admin/add');
    },
    searchUsername() {
      UserService.findByUsername(this.username)
          .then(response => {
            this.users = response.data;
          }, error => {
            //eslint-disable-next-line
            console.log(error.response);
          });
    }
  },
  mounted() {
    this.retrieveUsers();
  }
};
</script>

<style>

.list-group {
  border-width: .8px;
  max-height: 350px;
  margin-bottom: 10px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

#gen {
  text-align: left;
  margin-top: 10px;
  margin-left: 13%;
  max-width: 70%;
  margin-right: 1%;
}

.form-row {
  padding-right: 0;
  padding-left: 0;
  margin-left: 0;
  margin-right: 0;
}


#createButton {
  margin-top: 40px;
  margin-left: 25%;
  width: 100px;
}
</style>
