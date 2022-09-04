<template>
  <div v-if="this.$store.state.auth.user.roles.includes('ROLE_ADMIN')">
    <div id="backButton" class="form-inline">
      <button class="col-md-3 btn btn-outline-secondary" type="button"
              @click="toUserlist">Назад до списку
      </button>
      <label class="col-md-7"><b>{{ def_username }}</b></label>
      <label id="id-label" class="col-md-1" for="id">ID</label>
      <input id="id" class="form-control col-md-1" readonly
             type="text" v-bind:value="this.$route.params.id">
    </div>
    <div v-if="currentUser" class="edit-form">
      <form @change="onEdit">
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="username">Ім'я користувача</label>
            <input id="username" v-model="currentUser.username" class="form-control "
                   placeholder="Обов'язкове поле" required type="text">
            <div id="username-validation" class="invalid-feedback">Користувач з таким іменем користувача вже існує!
            </div>
          </div>
          <div class="form-group col-md-6">
            <label for="email">E-mail</label>
            <input id="email" v-model="currentUser.email" class="form-control "
                   placeholder="Обов'язкове поле" required type="text">
            <div id="email-validation" class="invalid-feedback">Користувач з таким E-mail вже існує!</div>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-12">
            <label for="name">ПІБ користувача</label>
            <input id="name" v-model="currentUser.name" class="form-control"
                   placeholder="" type="text">
          </div>
          <div id="switch-form" class="form-group col-md-9">
            <label>Рівень доступу</label>
            <div class="form-check">
              <div class="form-check">
                <input class="form-check-input" type="radio" id="ROLE_ADMIN" value="ROLE_ADMIN" v-model="role"/>
                <label class="form-check-label" for="ROLE_ADMIN">Адміністратор</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" id="ROLE_MANAGER" value="ROLE_MANAGER" v-model="role"/>
                <label class="form-check-label" for="ROLE_MANAGER">Клієнт-менеджер</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" id="ROLE_RISK" value="ROLE_RISK" v-model="role"/>
                <label class="form-check-label" for="ROLE_RISK">Ризик-менеджер</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" id="ROLE_MARKETING" value="ROLE_MARKETING" v-model="role"/>
                <label class="form-check-label" for="ROLE_MARKETING">Маркетинг-менеджер</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" id="ROLE_COLLECTOR" value="ROLE_COLLECTOR" v-model="role"/>
                <label class="form-check-label" for="ROLE_COLLECTOR">Менеджер по стягненю</label>
              </div>
              <!--              <input id="ROLE_ADMIN" v-model="isAdmin" class="form-check-input" type="checkbox" value="ROLE_ADMIN">-->
              <!--              <label class="form-check-label" for="ROLE_ADMIN">Адміністратор</label>-->
            </div>
          </div>
        </div>
      </form>
      <div class="form-row" style="margin: 0 0 0 0">
        <button id="sub-btn" class="col-md-3 btn btn-success " type="submit" v-bind:disabled="!edited"
                @click="updateUser">Зберегти
        </button>
        <label id="alert-message" class="col-md-8 alert fade">{{ message }}
          <button id="alert-hide" aria-label="fade" class="close" type="button" @click="hideAlert">&times;</button>
        </label>
      </div>
    </div>
    <div v-else class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <div v-else>
    <br/>
    <p>ДОСТУП ЗАБОРОНЕНО</p>
  </div>
</template>

<script>
import UserService from "../../services/user.service";
import $ from 'jquery';

export default {
  name: "user",
  data() {
    return {
      role: '',
      def_username: '',
      currentRoles: ['ROLE_USER'],
      currentUser: {},

      message: '',
      code: true,
      edited: false
    };
  },
  methods: {
    getUser(id) {
      UserService.get(id)
          .then(response => {
            this.currentUser = response.data;
            this.currentRoles = this.currentUser.roles.flatMap(r => r.name);
            this.role = this.currentRoles[0];
            this.def_username = this.currentUser.username;
          }, error => {
            this.message = 'Не вдалось завантажити дані користувача!';
            this.showAlert(false);
            // eslint-disable-next-line
            console.log(error.response);
          });
    },
    updateUser() {
      if (this.preValidation(this.currentUser.username, this.currentUser.email)) {
        this.currentUser.roles = Array.of(this.role);
        UserService.update(this.currentUser.id, this.currentUser)
            .then(response => {
              this.postValidation(response.data, true);
            }, error => {
              this.postValidation(error.response.data.message, false);
            });
      }
    },
    toUserlist() {
      this.$router.push('./');
    },
    showAlert(code) {
      $('#alert-message').removeClass('alert-success' + 'alert-danger').addClass(code ? 'alert-success' : 'alert-danger').removeClass('fade');
    },
    hideAlert() {
      $('#alert-message').addClass('fade');
    },
    preValidation(username, email) {
      if (username === '' || email === '') {
        this.message = 'Поля \'Ім`я користувача\' та \'E-mail\' не можуть бути пустими';
        this.showAlert(false);
        return false;
      } else if (!UserService.validateEmail(email)) {
        this.message = 'Вказаний некоректний E-mail';
        this.showAlert(false);
      } else {
        $('#username').addClass('is-valid');
        $('#email').addClass('is-valid');
        return true;
      }
    },
    postValidation(message, ans) {
      if (ans) {
        this.message = 'Дані користувача оновлені успішно';
        this.showAlert(true);
        $('#username').removeClass('is-invalid').addClass('is-valid');
        $('#email').removeClass('is-invalid').addClass('is-valid');
      } else {
        this.message = 'Не вдалось зберегти дані користувача';
        this.showAlert(false);
        if (message.includes('USERNAME')) $('#username').removeClass('is-valid').addClass('is-invalid');
        else if (message.includes('EMAIL')) $('#email').removeClass('is-valid').addClass('is-invalid');
      }
    },
    onEdit() {
      this.edited = true;
    }

  },
  mounted() {
    this.getUser(this.$route.params.id);
  }
};
</script>


<style>

/*  General form */

.form-switch {
  margin-left: 4%;
}

.edit-form {
  margin-top: 10px;
  margin-left: 13%;
  max-width: 70%;
}

/*  Top and bot forms */

#backButton {
  margin-left: 13%;
  max-width: 70%;
  margin-top: 10px;
  padding: 0 0 0 0;
}

#sub-btn {
  padding: .3rem .3rem .3rem .3rem;
  margin-bottom: initial;
}

#alert-message {
  padding: .3rem .3rem .3rem .5rem;
  margin: 0 0 0 8%;
}

#alert-hide {
  padding-right: .5rem;
}

</style>
