<template>
  <div v-if="this.$store.state.auth.user">
    <div id="backButton" class="col-md-12">
      <button class="col-md-3 btn btn-outline-secondary" type="button"
              @click="toClientlist">Назад до списку
      </button>

      <label class="col-md-6"><b>Створення нового клієнта</b></label>
    </div>
    <div id="form-input" class="input-group">
      <form class="form-group col-md-12">

        <div class="form-row">
          <div class="form-group col-md-9">
            <label for="name">Повне найменування юридичної особи</label>
            <input id="name" v-model="client.name" class="form-control"
                   placeholder="Обов'язкове поле" type="text">
          </div>
          <div class="form-group col-md-3">
            <label for="edrpou">Код ЄДРПОУ</label>
            <input id="edrpou" v-model="client.edrpou" class="form-control"
                   placeholder="Обов'язкове поле" type="text">
            <div id="mobile-validate" class="invalid-feedback">Цей код ЄДРПОУ вже зареєстровано</div>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-4">
            <label for="title">Коротка назва</label>
            <input id="title" v-model="client.title" class="form-control"
                   placeholder="" type="text">
          </div>
          <div class="form-group col-md-8">
            <label for="address">Адреса реєстрації</label>
            <input id="address" v-model="client.address" class="form-control"
                   placeholder="Обов'язкове поле" type="text">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-4">
            <label for="dor">Дата реєстрації</label>
            <input id="dor" v-model="client.dor" class="form-control"
                   placeholder="Обов'язкове поле" type="date">
          </div>
          <div class="form-group col-md-8">
            <label for="leadName">ПІБ керівника</label>
            <input id="leadName" v-model="client.leadName" class="form-control"
                   placeholder="Обов'язкове поле" type="text">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="leadMobile">Номер телефону керівника</label>
            <input id="leadMobile" v-model="client.leadMobile" class="form-control"
                   placeholder="Обов'язкове поле" type="text">
          </div>
          <div class="form-group col-md-6">
            <label for="leadEmail">E-mail керівника</label>
            <input id="leadEmail" v-model="client.leadEmail" class="form-control"
                   placeholder="" type="text">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-12">
            <label for="activity">Основний вид діяльності</label>
            <input id="activity" v-model="client.activity" class="form-control"
                   placeholder="62.02 \ \ " type="text">
          </div>
        </div>
      </form>
      <div class="form-row col-md-12" style="margin: 0 0 0 0">
        <button id="sub-btn" class="col-md-3 btn btn-success" type="submit"
                @click="createClient">Створити
        </button>
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
import LegalClientService from "../../services/legal-client.service";
import $ from "jquery";

export default {
  name: "add-legal",
  data() {
    return {
      message: '',
      client: {
        id: null,
        title: "",
        name: "",
        edrpou: "",
        dor: "",
        address: "",
        leadName: "",
        leadMobile: "",
        leadEmail: "",
      },
    };
  },
  methods: {
    createClient() {
      if (this.preValidation(this.client)) {
        let data = {
          title: this.client.title,
          name: this.client.name,
          edrpou: this.client.edrpou,
          dor: this.client.dor,
          address: this.client.address,
          leadName: this.client.leadName,
          leadMobile: this.client.leadMobile,
          leadEmail: this.client.leadEmail,
          activity: this.client.activity
        };
        LegalClientService.create(data)
            .then(response => {
              this.postValidation(response.data, true)
            }, error => {
              //eslint-disable-next-line
              console.log(error.response.data.message);
              this.postValidation(error.response.data.message, false);
            });
      }
    },
    toClientlist() {
      this.$router.push('./legal');
    },
    toCreatedClient() {
      this.$router.push('./legal/' + this.client.id);
    },
    showAlert(code) {
      $('#alert-message').removeClass('alert-success' + 'alert-danger').addClass(code ? 'alert-success' : 'alert-danger').removeClass('fade');
    },
    hideAlert() {
      $('#alert-message').addClass('fade');
    },
    preValidation(client) {
      $('#edrpou').removeClass('is-invalid').removeClass('is-valid');
      if (client.name === '' || client.edrpou === '' || client.dor === '' || client.address === '' ||
          client.leadName === '' || client.leadMobile === '') {
        this.message = 'Обов`язкові поля не можуть бути пустими';
      } else if (client.edrpou.length !== 8) {
        this.message = 'Некоректно вказаний код ЄДРПОУ';
      } else if (client.leadMobile.length !== 12) {
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
        this.message = 'Клієнт успішно створений';
        this.showAlert(true);
        this.client.id = message.id;
        this.toCreatedClient();
      } else {
        this.message = 'Не вдалось додати клієнта';
        this.showAlert(false);
        if (message.includes('EDRPOU')) $('#edrpou').removeClass('is-valid').addClass('is-invalid');

      }
    }
  }
}
</script>

<style>

forall {
  max-height: 24px;
}

.form-row {
  max-width: 100%;
  padding: 0;
}

.form-group {
  max-width: 100%;
  padding: 0;
}

#form-input {
  max-width: 70%;
  margin-top: 10px;
  margin-right: 5%;
  margin-left: 13%;
  padding: 0;
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
