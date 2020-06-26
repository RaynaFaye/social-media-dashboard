new Vue({
  el: '#app',
  data: {
    checkState: false,
  },
  watch: {
    checkState() {
      if (this.checkState === true) {
        document.documentElement.setAttribute('data-mode', 'light');
      } else {
        document.documentElement.setAttribute('data-mode', '');
      }
    },
  },
});
