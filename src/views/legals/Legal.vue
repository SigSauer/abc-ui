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

      <div v-if="!currentClient.active" class="alert alert-danger col-md-12" role="alert">
        Клієнт заблокований!
      </div>
      <form>
        <div class="form-row">
          <div class="form-group col-md-9">
            <label for="name">Повне найменування юридичної особи</label>
            <input id="name" v-model="currentClient.name" class="form-control"
                   placeholder="Обов'язкове поле" type="text">
          </div>
          <div class="form-group col-md-3">
            <label for="edrpou">Код ЄДРПОУ</label>
            <input id="edrpou" v-model="currentClient.edrpou" class="form-control"
                   placeholder="Обов'язкове поле" type="text">
            <div id="mobile-validate" class="invalid-feedback">Цей код ЄДРПОУ вже зареєстровано</div>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-4">
            <label for="title">Коротка назва</label>
            <input id="title" v-model="currentClient.title" class="form-control"
                   placeholder="" type="text">
          </div>
          <div class="form-group col-md-8">
            <label for="address">Адреса реєстрації</label>
            <input id="address" v-model="currentClient.address" class="form-control"
                   placeholder="Обов'язкове поле" type="text">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-4">
            <label for="dor">Дата реєстрації</label>
            <input id="dor" v-model="currentClient.dor" class="form-control"
                   placeholder="Обов'язкове поле" type="date">
          </div>
          <div class="form-group col-md-8">
            <label for="leadName">ПІБ керівника</label>
            <input id="leadName" v-model="currentClient.leadName" class="form-control"
                   placeholder="Обов'язкове поле" type="text">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="leadMobile">Номер телефону керівника</label>
            <input id="leadMobile" v-model="currentClient.leadMobile" class="form-control"
                   placeholder="Обов'язкове поле" type="text">
          </div>
          <div class="form-group col-md-6">
            <label for="leadEmail">E-mail керівника</label>
            <input id="leadEmail" v-model="currentClient.leadEmail" class="form-control"
                   placeholder="" type="text">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-10">
            <label for="activity">Основний вид діяльності</label>
            <input id="activity" v-model="currentClient.activity" class="form-control"
                   placeholder="62.02 \ \ " type="text">
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
                @click="updateClient">Зберегти
        </button>
        <label id="alert-message" class="col-md-8 alert fade">{{ message }}
          <button id="alert-hide" aria-label="fade" class="close" type="button" @click="hideAlert">&times;</button>
        </label>
      </div>

      <div id="blockClientSubmit" aria-hidden="true" class="modal fade" role="dialog" tabindex="-1">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header"><h5 class="modal-title">Підтвердження</h5></div>
            <div class="modal-body"><p>Ви впевнені, що хочете заблокувати клієнта: <b>{{ currentClient.title }}</b>?
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
import LegalClientService from "../../services/legal-client.service";
import $ from "jquery";

export default {
  name: "legal",
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
      LegalClientService.get(id)
          .then(response => {
            this.currentClient = response.data;
            this.def_title = this.currentClient.title;
          }, error => {
            this.message = 'Не вдалось завантажити дані клієнта!';
            this.showAlert(false);
            // eslint-disable-next-line
            console.log(error.response);
          });
    },

    updateClient() {
      if (this.preValidation(this.currentClient)) {
        LegalClientService.update(this.currentClient.id, this.currentClient)
            .then(response => {
              this.postValidation(response.data, true)
            }, error => {
              this.postValidation(error.response.data.message, false)
            });
      }
    },
    blockClient() {
      LegalClientService.block(this.currentClient.id)
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
      $('#edrpou').removeClass('is-invalid').removeClass('is-valid');
      if (!client.active) {
        this.message = 'Неможливо змінити інформацію про заблокованого клієнта';
      } else if (client.name === '' || client.edrpou === '' || client.dor === '' || client.address === '' ||
          client.leadName === '' || client.leadMobile === '') {
        this.message = 'Обов`язкові поля не можуть бути пустими';
      } else if (client.edrpou.length !== 8) {
        this.message = 'Некоректно вказаний код ЄДРПОУ';
      } else if (client.leadMobile !== 12) {
        this.message = 'Некоректно вказаний номер телефону керівника';
      } else {
        $('#edrpou').addClass('is-valid');
        return true;
      }
      this.showAlert(false);
      return false;
    },
    postValidation(message, ans) {
      if (ans) {
        this.message = 'Дані клієнта успішно оновлені';
        this.showAlert(true);
        $('#edrpou').removeClass('is-invalid').removeClass('is-valid');
      } else {
        this.message = 'Не вдалось оновити дані клієнта';
        this.showAlert(false);
        if (message.includes('EDRPOU')) $('#edrpou').removeClass('is-valid').addClass('is-invalid');
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
