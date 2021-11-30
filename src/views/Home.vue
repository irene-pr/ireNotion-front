<template>
  <main class="home-page">
    <div class="full-height-div full-height-div--top">
      <UserArea />
      <h1 class="home-logo">IRE<span>N</span>OTION</h1>
    </div>
    <section class="text-section text-section--light">
      <h2>About the website</h2>
      <p>
        This is my final project for the ISDI Coders fulltime bootcamp, I hope
        to show everything I've learned and that it doesn't just work in my
        computer. It's an app that registers users and offers them boards to
        store different sorts of data. The name ireNotion was born in the
        imagination of Pia Borges, there is no copyright claim because neither
        of us believes in it.
      </p>
    </section>
    <div class="medium-height-div medium-height-div--first"></div>
    <section class="text-section text-section--dark">
      <h2>Technologies I've used</h2>
      <p>
        It's a Full Stack development project written with Typescript. The
        Frontend it's a VUE SPA with ???. In the Backend I've used the framework
        express to make a REST API to store the users information and theirdata.
        Everything is tested with Jest and Cypress.
      </p>
    </section>
    <div class="medium-height-div medium-height-div--second"></div>
    <section class="text-section text-section--light">
      <h2>Message of Thanks</h2>
      <p>
        I thank all of my teachers and classmates for everything I've learned
        and experienced during the bootcamp. I've had the time of my life while
        suffering like never before. I also thanked my mother for supporting me,
        I couldn't have done it woithout her.
      </p>
    </section>
    <div class="full-height-div full-height-div--bottom">
      <h1 class="home-logo">IRE<span>N</span>OTION</h1>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UserArea from "@/components/Home/NavHome.vue";

export default defineComponent({
  name: "Home",
  components: {
    UserArea,
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
    background-color: $dark-color-home-opacity;
    color: $light-color-home;
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
    background: url("../assets/background-2.webp");
    background-size: cover;
    background-attachment: fixed;
  }
  &--second {
    background: url("../assets/background-3.jpg");
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
    background-color: $light-color-home;
    color: $dark-color-home;
  }

  &--dark {
    background-color: $dark-color-home;
    color: $light-color-home;
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
