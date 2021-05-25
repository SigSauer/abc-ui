<template>
  <div v-if="this.$store.state.auth.user" id="gen" class="list row">

    <div class="form-row">
      <div class="col-md-12">

        <div class="input-group mb-4">
          <input v-model="title" class="form-control" placeholder="Пошук за назвою"
                 type="text"/>

          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" @click="titleSearch">Пошук</button>
          </div>
        </div>
        <div id="check-input" class="input-group col-md-4">
          <div>
            <input id="activeOnly" v-model="activeOnly" class="form-check-input" type="checkbox"
                   @change="retrieveClients">
          </div>
          <label class="check-label" for="activeOnly">Тільки активні</label>
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="col-md-6">
        <h4>Клієнти: Юридичні особи</h4>
        <ul id="list" class="list-group">
          <li v-for="(client, index) in clients"
              :key="index"
              :class="{ active: index === currentIndex }"
              class="list-group-item"
              @click="setActiveClient(client, index)">{{ client.title }}
          </li>
        </ul>
        <div class="input-group col-md-8">
          <!--          <router-link :to="'/clients/add-legal'" class="btn btn-primary col-md-12">Створити клієнта</router-link>-->
          <button id="createButton" class="btn btn-primary col-md-12" type="button" @click="toCreateClient">Створити
            клієнта
          </button>
        </div>
      </div>
      <div class="col-md-6">
        <div v-if="currentClient">
          <div class="card border-dark mb-3" style="width: 100%">
            <div class="card-body">
              <h5 class="card-title"><b> {{ currentClient.title }}</b></h5>
              <h6 v-bind:class="[currentClient.active ? 'card-subtitle mb-2 text-success' : 'card-subtitle mb-2 text-danger']">
                <label><strong>Статус:</strong></label> {{ currentClient.active ? "Активний" : "Заблокований" }}</h6>
              <div class="card-text">
                <div>
                  <label><strong>Основний вид діяльності:</strong></label> {{ currentClient.activity }}
                </div>
                <div>
                  <label><strong>Керівник:</strong></label> {{ currentClient.leadName }}
                </div>
                <div>
                  <label><strong>Контактний телефон:</strong></label> {{ currentClient.leadMobile }}
                </div>
                <div>
                  <label><strong>E-mail:</strong></label> {{ currentClient.leadEmail }}
                </div>
              </div>
              <router-link :to="'/clients/legal/' + currentClient.id" class="btn btn-warning mb-3">Детальна інформація
              </router-link>
            </div>
          </div>
        </div>
        <div v-else>
          <br/>
          <p>Оберіть клієнта для відображення картки</p>
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

export default {
  name: "legal-list",
  data() {
    return {
      clients: [],
      currentClient: null,
      currentIndex: -1,
      title: "",
      activeOnly: false
    };
  },
  methods: {
    retrieveClients() {
      this.activeOnly ? LegalClientService.getActiveOnly()
              .then(response => {
                this.clients = response.data;
                // eslint-disable-next-line
                console.log(response.data);
              }).catch(e => {
                // eslint-disable-next-line
                console.log(e);
              })
          : LegalClientService.getAll()
              .then(response => {
                this.clients = response.data;
                // eslint-disable-next-line
                console.log(response);
              }).catch(e => {
                // eslint-disable-next-line
                console.log(e);
              })
    },
    refreshList() {
      this.retrieveClients();
      this.currentClient = null;
      this.currentIndex = -1;
    },
    setActiveClient(client, index) {
      this.currentClient = client;
      this.currentIndex = index;
    },
    toCreateClient() {
      this.$router.push('/clients/add-legal');
    },
    titleSearch() {
      LegalClientService.findByTitle(this.title)
          .then(response => {
            this.clients = response.data;
            // eslint-disable-next-line
            console.log(response.data);
          })
          .catch(e => {
            // eslint-disable-next-line
            console.log(e);
          });
    }
  },
  mounted() {
    this.retrieveClients();
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

#check-input {
  margin-left: 1%;
}

#createButton {
  margin-top: 40px;
  margin-left: 25%;
  width: 100px;
}
</style>

