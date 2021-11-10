<template>
  <footer>
    <Logo />
    <a href="https://github.com/dev-kjchoi" targer="_blank">
      (c){{ new Date().getFullYear() }} KJ.CHOI
    </a>
  </footer>
</template>

<script>
import Logo from "~/components/Logo";

export default {
  components: {
    Logo,
  },
};
</script>

<style lang="scss" scoped>
footer {
  padding: 70px 0;
  text-align: center;
  opacity: 0.3;
  .logo {
    display: block;
    margin-bottom: 4px;
  }
}
</style>
