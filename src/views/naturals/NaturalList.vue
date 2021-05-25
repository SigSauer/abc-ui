<template>
  <div v-if="this.$store.state.auth.user" id="gen" class="list row">

    <div class="form-row">
      <div class="col-md-12">

        <div class="input-group mb-4">
          <input v-model="mobile" class="form-control" placeholder="Пошук за номером телефону"
                 type="text"/>
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" @click="searchTin">Пошук</button>
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
        <h4>Клієнти: Фізичні особи</h4>
        <div>
          <ul id="list" class="list-group">
            <li v-for="(client, index) in clients"
                :key="index"
                :class="{ active: index === currentIndex }"
                class="list-group-item"
                @click="setActiveClient(client, index)">{{ client.name }}
            </li>
          </ul>
        </div>
        <div class="input-group col-md-8">
          <button id="createButton" class="btn btn-primary col-md-12" type="button" @click="toCreateClient">Створити
            клієнта
          </button>
        </div>
      </div>
      <div class="col-md-6">
        <div v-if="currentClient">
          <div class="card border-dark mb-3" style="width: 100%;">
            <div class="card-body">
              <h5 class="card-title"><b> {{ currentClient.name }}</b></h5>
              <h6 v-bind:class="[currentClient.active ? 'card-subtitle mb-2 text-success' : 'card-subtitle mb-2 text-danger']">
                <label><strong>Статус:</strong></label> {{ currentClient.active ? "Активний" : "Заблокований" }}</h6>
              <div class="card-text">
                <div>
                  <label><strong>Стать:</strong></label> {{ currentClient.sex ? "Чоловіча" : "Жіноча" }}
                </div>
                <div>
                  <label><strong>Дата народження:</strong></label> {{ currentClient.dob }}
                </div>
                <div>
                  <label><strong>Мобільний телефон:</strong></label> {{ currentClient.mobile }}
                </div>
                <div>
                  <label><strong>E-mail:</strong></label> {{ currentClient.email }}
                </div>
              </div>
              <router-link :to="'/clients/natural/' + currentClient.id" class="btn btn-warning mb-3">Детальна інформація
              </router-link>
            </div>
            <div>
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

import NaturalClientService from "../../services/natural-client.service";

export default {
  name: "natural-list",
  data() {
    return {
      sex: ['Чоловіча', 'Жіноча'],
      clients: [],
      currentClient: null,
      currentIndex: -1,
      mobile: "",
      activeOnly: false
    };
  },
  methods: {
    retrieveClients() {
      this.activeOnly ?
          NaturalClientService.getActiveOnly()
              .then(response => {
                this.clients = response.data;
              }) :
          NaturalClientService.getAll()
              .then(response => {
                this.clients = response.data;
              });
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
      this.$router.push('/clients/add-natural');
    },
    searchTin() {
      NaturalClientService.findByMobile(this.mobile)
          .then(response => {
            this.clients = response.data;
          }, error => {
            throw error;
          });
    },

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

#check-input {
  margin-left: 1%;
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
