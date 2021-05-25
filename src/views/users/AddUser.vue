<template>
  <div v-if="this.$store.state.auth.user.roles.includes('ROLE_ADMIN')">
    <div id="backButton" class="col-md-12">
      <button class="col-md-3 btn btn-outline-secondary" type="button"
              @click="toUserlist">Назад до списку
      </button>
      <label class="col-md-9"><b>Створення нового користувача</b></label>
    </div>
    <div id="input-form" class="input-group">
      <form class="form-group col-md-12" style="margin-bottom: 0">

        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="username">Ім'я користувача</label>
            <input id="username" v-model="user.username" class="form-control "
                   placeholder="Обов'язкове поле" required type="text">
            <div id="username-validation" class="invalid-feedback">Користувач з таким іменем користувача вже існує!
            </div>
          </div>
          <div class="form-group col-md-6">
            <label for="email">E-mail</label>
            <input id="email" v-model="user.email" class="form-control "
                   placeholder="Обов'язкове поле" required type="text">
            <div id="email-validation" class="invalid-feedback">Користувач з таким E-mail вже існує!</div>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-12">
            <label for="name">ПІБ користувача</label>
            <input id="name" v-model="user.name" class="form-control"
                   placeholder="" type="text">
          </div>
          <div id="switch-form" class="form-group col-md-9">
            <label>Права адміністратора</label>
            <div class="form-check form-switch">
              <input id="ROLE_ADMIN" v-model="isAdmin" class="form-check-input" type="checkbox" value="ROLE_ADMIN">
              <label class="form-check-label" for="ROLE_ADMIN">Адміністратор</label>
            </div>
          </div>
        </div>
      </form>
      <div class="form-row col-md-12" style="margin: 0 0 0 0">
        <button id="sub-btn" class="col-md-3 btn btn-success " type="submit" @click="createUser">Створити</button>
        <label id="alert-message" class="col-md-8 alert fade">{{ message }}
          <button id="alert-hide" aria-label="fade" class="close" type="button" @click="hideAlert">&times;</button>
        </label>
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
import $ from "jquery";

export default {
  name: "add-user",
  data() {
    return {
      isAdmin: false,
      message: '',
      user: {
        id: null,
        username: "",
        name: "",
        email: "",
        roles: []
      },
      submitted: false
    };
  },
  methods: {
    createUser() {
      if (this.preValidation(this.user.username, this.user.email)) {
        let data = {
          username: this.user.username,
          name: this.user.name,
          email: this.user.email,
          roles: this.isAdmin ? Array.of('ROLE_ADMIN', "ROLE_USER") : Array.of("ROLE_USER")
        };
        UserService.create(data)
            .then(response => {
              this.postValidation(response.data, true);
            }, error => {
              //eslint-disable-next-line
              console.log(error.response.data.message);
              this.postValidation(error.response.data.message, false);
            });
      }
    },
    toUserlist() {
      this.$router.push('./users');
    },
    toCreatedUser() {
      this.$router.push('/admin/users/' + this.user.id);
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
        this.message = 'Користувач створений успішно';
        this.showAlert(true);
        $('#username').removeClass('is-invalid').addClass('is-valid');
        $('#email').removeClass('is-invalid').addClass('is-valid');
        this.user.id = message.id;
        this.submitted = true;
        this.toCreatedUser();
      } else {
        this.message = 'Не вдалось створити користувача';
        this.showAlert(false);
        if (message.includes('USERNAME')) $('#username').removeClass('is-valid').addClass('is-invalid');
        else if (message.includes('EMAIL')) $('#email').removeClass('is-valid').addClass('is-invalid');
      }
    }
  },
  mounted() {
    this.message = '';
  }
};
</script>

<style>

/*  General form */

.form-row {
  max-width: 100%;
  padding: 0;
}

.form-switch {
  margin-left: 8%;
  padding: 0;
}

#input-form {
  margin-top: 10px;
  margin-left: 13%;
  max-width: 65%;
  padding-right: 0;
  padding-left: 0;
}

.input-group {
  padding-right: 0;
  padding-left: 0;
}

.form-group {
  padding-right: 0;
  padding-left: 0;
}

/*  Top and bot forms */

#backButton {
  margin-left: 13%;
  max-width: 65%;
  margin-top: 10px;
  padding: 0;
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
