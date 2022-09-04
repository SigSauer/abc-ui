<template>
  <div v-if="this.$store.state.auth.user" class="container">
    <div id="backButton" class="form-inline">
      <label class="col-md-4 col-form-label lr"><b>Профіль користувача: </b></label>
      <label class="col-md-6 col-form-label"><b>{{ currentUser.username }}</b></label>
      <label id="id-label" class="col-md-1" for="id">ID</label>
      <input id="id" class="form-control col-md-1" readonly
             type="text" v-bind:value="currentUser.id">
    </div>
    <div v-if="currentUser" class="edit-form">
      <!--        <div class="form-row" id="first">-->
      <!--          <input type="text" readonly class="form-row form-control-plaintext col-sm-2" value="ID:">-->
      <!--          <input type="text"  class="form-row form-control-plaintext col-sm-2" id="id"-->
      <!--                       v-bind:value="currentUser.id"readonly>-->
      <!--        </div>-->
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="username">Ім'я користувача</label>
          <input id="username" class="form-control" readonly type="text" v-bind:value="currentUser.username">
        </div>
        <div class="form-group col-md-6">
          <label for="email">E-mail</label>
          <input id="email" class="form-control" readonly type="text" v-bind:value="currentUser.email">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-12">
          <label for="name">ПІБ користувача</label>
          <input id="name" class="form-control" readonly type="text" v-bind:value="currentUser.name">
        </div>
        <div class="form-group col-md-12">
          <label for="token">Токен автентифікації</label>
          <textarea id="token" class="form-control" disabled rows="3"
                    style="resize: none" type="text" v-bind:value="currentUser.accessToken"></textarea>
        </div>
        <div id="switch-form" class="form-group col-md-9">
          <label>Рівень доступу</label>
          <div class="form-check">
            <div class="form-check">
              <input class="form-check-input" type="radio" id="ROLE_ADMIN" value="ROLE_ADMIN" v-model="role" disabled/>
              <label class="form-check-label" for="ROLE_ADMIN">Адміністратор</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" id="ROLE_MANAGER" value="ROLE_MANAGER" v-model="role" disabled/>
              <label class="form-check-label" for="ROLE_MANAGER">Клієнт-менеджер</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" id="ROLE_RISK" value="ROLE_RISK" v-model="role" disabled/>
              <label class="form-check-label" for="ROLE_RISK">Ризик-менеджер</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" id="ROLE_MARKETING" value="ROLE_MARKETING" v-model="role" disabled/>
              <label class="form-check-label" for="ROLE_MARKETING">Маркетинг-менеджер</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" id="ROLE_COLLECTOR" value="ROLE_COLLECTOR" v-model="role" disabled/>
              <label class="form-check-label" for="ROLE_COLLECTOR">Менеджер по стягненю</label>
            </div>
            <!--              <input id="ROLE_ADMIN" v-model="isAdmin" class="form-check-input" type="checkbox" value="ROLE_ADMIN">-->
            <!--              <label class="form-check-label" for="ROLE_ADMIN">Адміністратор</label>-->
          </div>
        </div>
      </div>
      <div id="pass" class="form-row ">
        <div class="form-group col-md-12">
          <label for="username">Новий пароль</label>
          <div class="form-row">
            <form class="col-md-9">
              <input id="password" v-model="currentUser.password" class="form-control" type="password">
            </form>
            <button class="btn btn-primary col-md-3" type="submit" @click="updatePass">Оновити пароль</button>
          </div>
        </div>

        <div class="form-group col-md-12">
          <div v-if="message !== ''" class="alert alert-success">{{ this.message }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import UserService from "../../services/user.service";

export default {
  name: 'Profile',
  data() {
    return {
      role: '',
      currentUser: {},
      message: ''
    };
  },
  methods: {
    updatePass() {
      UserService.updatePassword(this.currentUser.id, this.currentUser.password)
          .then(response => {
            // eslint-disable-next-line
            console.log(response.data);
            this.message = 'Пароль успішно оновлено';
          }).catch(e => {
        // eslint-disable-next-line
        console.log(e);
      });

    }
  },
  mounted() {
    this.currentUser = this.$store.state.auth.user;
    this.role = this.currentUser.roles[0];
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }
};
</script>

<style>

#backButton {
  margin-left: 13%;
  max-width: 70%;
  margin-top: 10px;
  padding: 0 0 0 0;
}

.edit-form {
  margin-top: 10px;
  margin-left: 13%;
  max-width: 70%;
}

/*#check-b {*/
/*  margin-left: 4%;*/
/*}*/

.form-check-label {

}

#password {
  max-width: 100%;
}

#pass {
}


</style>
