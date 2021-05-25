<template>
  <div class="container">
    <div class="jumbotron">
      <h1 class="display-4">ABC | ОКБС</h1>
      <p><a href="https://github.com/SigSauer">by SigSauer</a></p>
      <p class="lead">Accounting of Bank Clients | Облік клієнтів банківскої системи</p>
      <hr class="my-4">
      <p>Даний програмний продукт призначений для обліку клієнтів банківської системи.
        Використання даного програмного забезпечення має здійснюватись у відповідності до Закону України
        «Про захист персональних даних» та виключно в рамках діючого Законодавства України</p>
      <p v-if="!currentUser">Для початку роботи з системою,
        <router-link to="/login">авторизуйтесь</router-link>
      </p>

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
