<template>
  <div class="container">
    <div class="jumbotron">
      <h1 class="display-4">CRM Banking | CRM Банкінг</h1>
      <p><a href="https://github.com/SigSauer">by Daniel Plaksii</a></p>
      <p class="lead">Customer relation management "Banking" | Система керування клієнтами "Банкінг" </p>
      <hr class="my-4">
      <p>Даний програмний продукт призначений для обліку клієнтів банківської системи.
        Використання даного програмного забезпечення має здійснюватись у відповідності до Закону України
        «Про захист персональних даних» та виключно в рамках діючого Законодавства України</p>
      <p v-if="!currentUser">Для початку роботи з системою,
        <router-link to="/login">авторизуйтесь</router-link>
      </p>
      <p class="lead">DEVELOPMENT MODE</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'home',
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  data() {
    return {
      content: ''
    };
  }
}
</script>
