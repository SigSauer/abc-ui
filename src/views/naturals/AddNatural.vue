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
          <div class="form-group col-md-4">
            <label for="mobile">Мобільний телефон</label>
            <input id="mobile" v-model="client.mobile" class="form-control"
                   placeholder="Обов'язкове поле" required type="text">
            <div id="mobile-validate" class="invalid-feedback">Цей номер телефона вже зареєстровано</div>
          </div>
          <div class="form-group col-md-8">
            <label for="name">ПІБ</label>
            <input id="name" v-model="client.name" class="form-control"
                   placeholder="Обов'язкове поле" required type="text">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-5">
            <label for="email">E-mail</label>
            <input id="email" v-model="client.email" class="form-control"
                   placeholder="" type="text">
          </div>
          <div class="form-group col-md-4">
            <label for="dob">Дата народження</label>
            <input id="dob" v-model="client.dob" class="form-control"
                   placeholder="Обов'язкове поле" required type="date">
          </div>
          <div class="form-group col-md-3">
            <label for="sex">Стать</label>
            <select id="sex" v-model="client.sex" aria-label="Sex" class="form-select" required>
              <option v-bind:value="true">Чоловіча</option>
              <option v-bind:value="false">Жіноча</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-3">
            <label for="tin">ІПН</label>
            <input id="tin" v-model="client.tin" class="form-control"
                   placeholder="Обов'язкове поле" required type="text">
            <div id="tin-validate" class="invalid-feedback">Цей ІПН вже зареєстровано</div>
          </div>
          <div class="form-group col-md-4">
            <label for="docNumber">Номер паспорту</label>
            <input id="docNumber" v-model="client.docNumber" class="form-control"
                   placeholder="Обов'язкове поле" type="text">
            <div id="doc-validate" class="invalid-feedback">Цей номер паспорту вже зареєстровано</div>
          </div>
          <div class="form-group col-md-5">
            <label for="docIssuers">Дата та орган видачі</label>
            <input id="docIssuers" v-model="client.docIssuers" class="form-control"
                   placeholder="Обов'язкове поле" type="text">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-12">
            <label for="regAddress">Адреса реєстрації</label>
            <input id="regAddress" v-model="client.regAddress" class="form-control"
                   placeholder="(Країна), область, місто (село), вулиця, будинок, квартира"
                   type="text">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-12">
            <label for="resAddress">Адреса проживання</label>
            <input id="resAddress" v-model="client.resAddress" class="form-control"
                   placeholder="(Країна), область, місто (село), вулиця, будинок, квартира"
                   type="text">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="work">Посада</label>
            <input id="work" v-model="client.work" class=" form-control"
                   placeholder="Згідно трудової книжки/договору" type="text">
          </div>
          <div class="form-group col-md-6">
            <label for="workName">Назва компанії</label>
            <input id="workName" v-model="client.workName" class="form-control"
                   placeholder="Юридична назва компанії" type="text">
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
import NaturalClientService from "../../services/natural-client.service";
import $ from "jquery";

export default {
  name: "add-natural",
  data() {
    return {
      message: '',
      client: {
        id: null,
        mobile: "",
        name: "",
        email: "",
        sex: "",
        dob: "",
        tin: "",
        docNumber: "",
        docIssuers: "",
        regAddress: "",
        resAddress: "",
        work: "",
        workName: "",
      },
    };
  },
  methods: {
    createClient() {
      if (this.preValidation(this.client)) {
        let data = {
          mobile: this.client.mobile,
          name: this.client.name,
          email: this.client.email,
          sex: this.client.sex,
          dob: this.client.dob,
          tin: this.client.tin,
          docNumber: this.client.docNumber,
          docIssuers: this.client.docIssuers,
          regAddress: this.client.regAddress,
          resAddress: this.client.resAddress,
          work: this.client.work,
          workName: this.client.workName,
        };
        NaturalClientService.create(data)
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
      this.$router.push('./natural');
    },
    toCreatedClient() {
      this.$router.push('./natural/' + this.client.id);
    },
    showAlert(code) {
      $('#alert-message').removeClass('alert-success' + 'alert-danger').addClass(code ? 'alert-success' : 'alert-danger').removeClass('fade');
    },
    hideAlert() {
      $('#alert-message').addClass('fade');
    },
    preValidation(client) {
      $('#mobile').removeClass('is-invalid').removeClass('is-valid');
      $('#tin').removeClass('is-invalid').removeClass('is-valid');
      $('#docNumber').removeClass('is-invalid').removeClass('is-valid');
      if (client.name === '' || client.sex === '' || client.dob === '' || client.docNumber === '' ||
          client.docIssuers === '' || client.mobile === '' || client.tin === '') {
        this.message = 'Обов`язкові поля не можуть бути пустими';
      } else if (client.mobile.length !== 12 || client.mobile.substring(0, 3) !== "380") {
        this.message = 'Некоректно вказаний номер телефону (380 XX XXX XX XX)';
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
        this.message = 'Клієнт успішно створений';
        this.showAlert(true);

        this.client.id = message.id;
        this.toCreatedClient();
      } else {
        this.message = 'Не вдалось додати клієнта';
        this.showAlert(false);
        if (message.includes('MOBILE')) $('#mobile').removeClass('is-valid').addClass('is-invalid');
        else if (message.includes('TIN')) $('#tin').removeClass('is-valid').addClass('is-invalid');
        else if (message.includes('DOCNUMBER')) $('#docNumber').removeClass('is-valid').addClass('is-invalid');
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
