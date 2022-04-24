<template>
  <main class="home-page">
    <div class="full-height-div full-height-div--top">
      <UserArea />
      <h1 class="home-logo">IRE<span>N</span>OTION</h1>
    </div>
    <section class="text-section text-section--light">
      <h2>About the website</h2>
      <p>
        This is my final project for the ISDI Coders fulltime software development bootcamp, I hope
        to show everything I've learned and that it doesn't just work in my
        computer. It's an app that registers users and offers them boards to
        store different sorts of data in form of post-its. The name ireNotion was born in the
        imagination of Pia Borges, there is no copyright claim because neither
        of us believes in it.
      </p>
    </section>
    <div class="medium-height-div medium-height-div--first"></div>
    <section class="text-section text-section--dark">
      <h2>Technologies I've used</h2>
      <p>
        It's a Full Stack development project written with Typescript. The
        Frontend it's a VUE SPA. In the Backend I've used the framework
        Express to make a REST API to store the users information and their data.
        Everything is tested with Jest and Cypress.
      </p>
    </section>
    <div class="medium-height-div medium-height-div--second"></div>
    <section class="text-section text-section--light">
      <h2>Message of Thanks</h2>
      <p>
        I thank all of my teachers and classmates for everything I've learned
        and experienced during the bootcamp. I've had the time of my life while
        suffering like never before. I also thank my mother for supporting me,
        I couldn't have done it without her.
      </p>
    </section>
    <div class="full-height-div full-height-div--bottom">
      <h1 class="home-logo">IRE<span>N</span>OTION</h1>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapGetters, mapState } from "vuex";
import UserArea from "@/components/Home/NavHome.vue";

export default defineComponent({
  name: "Home",
  components: {
    UserArea,
  },
  computed: {
    ...mapState(["isLoggedIn"]),
  },
  methods: {
    ...mapActions(["checkToken"]),
    ...mapGetters(["redirectToUserBoard"]),
  },
  mounted() {
    this.checkToken();
    if (this.isLoggedIn) {
      this.redirectToUserBoard();
    }
  },
});
</script>

<style lang="scss">
@import "@/styles/_variables";

.home-page {
  font-family: $Lato;
  font-style: initial;
}
.full-height-div {
  height: 100vh;
  background: url("../assets/background-1.png");
  background-size: cover;
  background-attachment: fixed;

  .home-logo {
    margin: 0;
    width: fit-content;
    position: relative;
    bottom: calc(-50vh + 70px);
    left: calc(50vw - 230px);
    background-color: $theme-dark-color-opacity;
    color: $theme-light-color;
    padding: 20px;
    padding-left: 35px;
    font-size: 36px;
    font-weight: 100;
    letter-spacing: 0.6em;
    text-align: center;

    span {
      color: $theme-pink;
      font-weight: 300;
    }

    @media only screen and (max-width: 480px) {
      width: 100%;
      left: 0%;
      font-size: 24px;
    }
  }
}
.medium-height-div {
  height: 60vh;

  &--first {
    background: url("../assets/background-4.png");
    background-size: cover;
    background-attachment: fixed;
  }
  &--second {
    background: url("../assets/background-3.webp");
    background-size: cover;
    background-attachment: fixed;
  }
}
.text-section {
  padding: 20px 70px;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  &--light {
    background-color: $theme-light-color;
    color: $theme-dark-color;
  }

  &--dark {
    background-color: $theme-dark-color;
    color: $theme-light-color;
    p {
      font-weight: 300;
    }
  }
  h2 {
    margin: 15px;
    font-family: $heading-home;
    font-weight: bold;
    font-size: 24px;
    letter-spacing: 0.17em;
    text-align: center;
  }
  p {
    margin: 15px;
    text-align: center;
    font-family: $Lato;
    font-size: 16px;
    line-height: 33px;
    letter-spacing: 0.1em;
  }

  @media only screen and (max-width: 480px) {
    padding: 20px 20px;
  }

  @media only screen and (max-width: 720px) {
    padding: 20px 35px;
  }
}
</style>
