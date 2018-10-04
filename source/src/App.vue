<template>
  <div id="app" class="theme-red">
    <header-component></header-component>
    <navbar-component></navbar-component>
    <content-component></content-component>
    <footer-component></footer-component>
  </div>
</template>
<script>
import {HeaderComponent, NavbarComponent, ContentComponent, FooterComponent} from './components'
export default {
  name: 'App',
  components: {
    HeaderComponent,
    NavbarComponent,
    ContentComponent,
    FooterComponent
  }
}
</script>

<style>

a:hover {
  cursor: pointer;
}
@font-face {
  font-family: 'Material Icons';
  font-style: normal;
  font-weight: 400;
  src: url(https://fonts.gstatic.com/s/materialicons/v41/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2) format('woff2');
}
.material-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
}
</style>
