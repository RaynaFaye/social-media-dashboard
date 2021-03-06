new Vue({
  el: '#app',
  data: {
    checkState: false,
    facebookFollowers: '',
    twitterFollowers: '',
    instagramFollowers: '',
    youtubeFollowers: '',
    followers: [],
    prevFollowers: [],
    facebookDifference: '',
    twitterDifference: '',
    instagramDifference: '',
    youtubeDifference: '',
  },
  created: function () {
    function handleError(err) {
      alert('Something went wrong in fetching the data' + err);
    }
    const dataPromise = fetch('http://localhost/socialmediadashboard/fetchdata.php');
    dataPromise
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        data.forEach((element) => {
          this.followers.push(element.currentFollowers);
          this.prevFollowers.push(element.previousFollowers);
        });
      })
      .then(this.followers)
      .catch(handleError);
  },
  watch: {
    checkState() {
      if (this.checkState === true) {
        document.documentElement.setAttribute('data-mode', 'light');
      } else {
        document.documentElement.setAttribute('data-mode', '');
      }
    },
    followers() {
      this.facebookFollowers = this.followers[0];
      this.twitterFollowers = this.followers[1];
      this.instagramFollowers = this.followers[2];
      this.youtubeFollowers = this.followers[3];
    },
    prevFollowers() {
      this.facebookDifference = this.facebookFollowers - this.prevFollowers[0];
      this.twitterDifference = this.twitterFollowers - this.prevFollowers[1];
      this.instagramDifference = this.instagramFollowers - this.prevFollowers[2];
      this.youtubeDifference = this.youtubeFollowers - this.prevFollowers[3];
    },
  },
  filters: {
    aboveTenThousand(value) {
      if (value >= 1000000) {
        return value.toString().slice(0, 1) + 'M';
      }
      if (value >= 100000) {
        return value.toString().slice(0, 3) + 'k';
      }
      if (value >= 10000) {
        return value.toString().slice(0, 2) + 'k';
      }
      return value;
    },
    removeMinus(value) {
      return Math.abs(value);
    },
  },
});
