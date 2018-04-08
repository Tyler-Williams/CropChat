<template>
  <form>
    <div class="mdl-grid">
      <div class="mdl-cell mdl-cell--8-col">
        <div class="card-image__picture">
          <img :src="this.catUrl" />
        </div>
      </div>
      <div class="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet">
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-upgraded is-dirty">
          <input id="username" v-model="title" type="text" class="mdl-textfield__input" />
          <label for="username" class="mdl-textfield__label">Describe me</label>
        </div>
        <div class="actions">
          <a @click.prevent="postCat" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
            POST A CAT
          </a>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
  import parse from 'xml-parser'
  import postCat from '../mixins/postCat'
  export default {
    mixins: [postCat],
    data () {
      return {
        'catUrl': null,
        'title': ''
      }
    },
    mounted () {
      this.$http.get('http://thecatapi.com/api/images/get?format=xml&results_per_page=1').then(res => {
        const catUrl = parse(res.body).root.children['0'].children['0'].children['0'].children['0'].content
        let img = new Image()
        img.onload = () => { this.catUrl = catUrl }
        img.src = catUrl
      })
    },
    methods: {
      postCat () {
        this.$root.$firebaseRefs.cat.push(
          {
            'url': this.catUrl,
            'comment': this.title,
            'info': 'Posted by me as a test',
            'createdAt': -1 * new Date().getTime()
          }
        ).then(this.$router.push('/'))
      }
    }
  }
</script>

<style scoped>
  .waiting {
    padding: 10px;
    color: #555;
  }
</style>
