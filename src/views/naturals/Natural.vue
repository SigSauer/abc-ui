<template>
  <div v-if="this.$store.state.auth.user">
    <div id="backButton" class="form-inline">
      <button class="col-md-3 btn btn-outline-secondary" type="button"
              @click="toClientsList">Назад до списку
      </button>
      <label class="col-md-7"><b>{{ def_title }}</b></label>
      <label id="id-label" class="col-md-1" for="id">ID</label>
      <input id="id" class="form-control col-md-1" readonly
             type="text" v-bind:value="this.$route.params.id">
    </div>

    <div v-if="currentClient" class="edit-form">

      <div v-if="!currentClient.active" class="alert alert-danger col-md-12" role="alert">Клієнт заблокований!</div>

      <form @change="onEdit">
        <div class="form-row">
          <div class="form-group col-md-4">
            <label for="mobile">Мобільний телефон</label>
            <input id="mobile" v-model="currentClient.mobile" class="form-control"
                   placeholder="Обов'язкове поле" required type="text">
            <div id="mobile-validate" class="invalid-feedback">Цей номер телефона вже зареєстровано</div>
          </div>
          <div class="form-group col-md-8">
            <label for="name">ПІБ</label>
            <input id="name" v-model="currentClient.name" class="form-control"
                   placeholder="Обов'язкове поле" required type="text">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-5">
            <label for="email">E-mail</label>
            <input id="email" v-model="currentClient.email" class="form-control"
                   placeholder="" type="text">
          </div>
          <div class="form-group col-md-4">
            <label for="dob">Дата народження</label>
            <input id="dob" v-model="currentClient.dob" class="form-control"
                   placeholder="Обов'язкове поле" required type="date">
          </div>
          <div class="form-group col-md-3">
            <label for="sex">Стать</label>
            <select id="sex" v-model="currentClient.sex" aria-label="Sex" class="form-select" required>
              <option v-bind:value="true">Чоловіча</option>
              <option v-bind:value="false">Жіноча</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-3">
            <label for="tin">ІПН</label>
            <input id="tin" v-model="currentClient.tin" class="form-control"
                   placeholder="Обов'язкове поле" required type="text">
            <div id="tin-validate" class="invalid-feedback">Цей ІПН вже зареєстровано</div>
          </div>
          <div class="form-group col-md-4">
            <label for="docNumber">Номер паспорту</label>
            <input id="docNumber" v-model="currentClient.docNumber" class="form-control"
                   placeholder="Обов'язкове поле" type="text">
            <div id="doc-validate" class="invalid-feedback">Цей номер паспорту вже зареєстровано</div>
          </div>
          <div class="form-group col-md-5">
            <label for="docIssuers">Дата та орган видачі</label>
            <input id="docIssuers" v-model="currentClient.docIssuers" class="form-control"
                   placeholder="Обов'язкове поле" type="text">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-12">
            <label for="regAddress">Адреса реєстрації</label>
            <input id="regAddress" v-model="currentClient.regAddress" class="form-control"
                   placeholder="(Країна), область, місто (село), вулиця, будинок, квартира"
                   type="text">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-12">
            <label for="resAddress">Адреса проживання</label>
            <input id="resAddress" v-model="currentClient.resAddress" class="form-control"
                   placeholder="(Країна), область, місто (село), вулиця, будинок, квартира"
                   type="text">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-5">
            <label for="work">Посада</label>
            <input id="work" v-model="currentClient.work" class=" form-control"
                   placeholder="Згідно трудової книжки/договору" type="text">
          </div>
          <div class="form-group col-md-5">
            <label for="workName">Назва компанії</label>
            <input id="workName" v-model="currentClient.workName" class="form-control"
                   placeholder="Юридична назва компанії" type="text">
          </div>
          <div class="form-group col-md-2">
            <label class="invisible">Блокування</label>
            <button class="btn btn-danger" data-target="#blockClientSubmit"
                    data-toggle="modal" style="width: 100%" type="button"
                    v-bind:disabled="!currentClient.active">Заблокувати
            </button>
          </div>
        </div>
      </form>
      <div class="form-row" style="margin: 0 0 0 0">
        <button id="sub-btn" class="col-md-3 btn btn-success" type="submit"
                v-bind:disabled="!edited" @click="updateClient">Зберегти
        </button>
        <label id="alert-message" class="col-md-8 alert fade">{{ message }}
          <button id="alert-hide" aria-label="fade" class="close" type="button" @click="hideAlert">&times;</button>
        </label>
      </div>

      <div id="blockClientSubmit" aria-hidden="true" class="modal fade" role="dialog" tabindex="-1">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header"><h5 class="modal-title">Підтвердження</h5></div>
            <div class="modal-body"><p>Ви впевнені, що хочете заблокувати клієнта: <b>{{ currentClient.name }}</b>?
              Відмінити цю дію буде неможливо!</p></div>
            <div class="modal-footer">
              <button class="btn btn-danger" data-dismiss="modal" type="button" @click="blockClient">Заблокувати
              </button>
              <button class="btn btn-secondary" data-dismiss="modal" type="button">Закрити</button>
            </div>
          </div>
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

import NaturalClientService from "../../services/natural-client.service";
import $ from "jquery";


export default {
  name: "natural",
  data() {
    return {
      def_title: '',
      currentClient: {},

      message: '',
      code: true,
      edited: false
    };
  },
  methods: {
    getClient(id) {
      NaturalClientService.get(id)
          .then(response => {
            this.currentClient = response.data;
            this.def_title = this.currentClient.name;
          }, error => {
            this.message = 'Не вдалось завантажити дані клієнта!';
            this.showAlert(false);
            // eslint-disable-next-line
            console.log(error.response);
          });
    },
    updateClient() {
      if (this.preValidation(this.currentClient)) {
        NaturalClientService.update(this.currentClient.id, this.currentClient)
            .then(response => {
              this.postValidation(response.data, true)
            }, error => {
              this.postValidation(error.response.data.message, false)
            });
      }
    },
    blockClient() {
      NaturalClientService.block(this.currentClient.id)
          .then(response => {
            this.getClient(this.currentClient.id);
            // eslint-disable-next-line
            console.log(response.data);
          }, error => {
            this.message = 'Не вдалось заблокувати клієнта';
            this.showAlert(false);
            // eslint-disable-next-line
            console.log(error.response);
          });
    },
    toClientsList() {
      this.$router.push('./');
    },
    showAlert(code) {
      $('#alert-message').removeClass('alert-success').removeClass('alert-danger').addClass(code ? 'alert-success' : 'alert-danger').removeClass('fade');
    },
    hideAlert() {
      $('#alert-message').addClass('fade');
    },
    preValidation(client) {
      $('#mobile').removeClass('is-invalid').removeClass('is-valid');
      $('#tin').removeClass('is-invalid').removeClass('is-valid');
      $('#docNumber').removeClass('is-invalid').removeClass('is-valid');
      if (!client.active) {
        this.message = 'Неможливо змінити інформацію про заблокованого клієнта'
      } else if (client.name === '' || client.sex === '' || client.dob === '' || client.docNumber === '' ||
          client.docIssuers === '' || client.mobile === '' || client.tin === '') {
        this.message = 'Обов`язкові поля не можуть бути пустими';
      } else if (client.mobile.length !== 12 || client.mobile.substring(0, 3) !== "380") {
        this.message = 'Некоректно вказаний номер телефону';
      } else if (client.tin.length !== 10) {
        this.message = 'Некоректно вказаний ІПН';
      } else {
        $('#mobile').addClass('is-valid');
        $('#tin').addClass('is-valid');
        $('#docNumber').addClass('is-valid');
        return true;
      }
      this.showAlert(false);
      return false;
    },
    postValidation(message, ans) {
      if (ans) {
        this.message = 'Дані клієнта успішно оновлені';
        this.showAlert(true);
        $('#mobile').removeClass('is-invalid');
        $('#tin').removeClass('is-invalid');
        $('#docNumber').removeClass('is-invalid');
      } else {
        this.message = 'Не вдалось оновити дані клієнта';
        this.showAlert(false);
        if (message.includes('MOBILE')) $('#mobile').removeClass('is-valid').addClass('is-invalid');
        else if (message.includes('TIN')) $('#tin').removeClass('is-valid').addClass('is-invalid');
        else if (message.includes('DOCNUMBER')) $('#docNumber').removeClass('is-valid').addClass('is-invalid');
      }
    },
    onEdit() {
      this.edited = true;
    }
  },
  mounted() {
    this.getClient(this.$route.params.id);
  }
};
</script>

<style>

forall {
  max-height: 24px;
}

.edit-form {
  max-width: 70%;
  margin-top: 10px;
  margin-right: 5%;
  margin-left: 13%;
}

#backButton {
  margin-top: 10px;
  max-width: 70%;
  margin-left: 13%;
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
