const postCat = {
  methods: {
    postCat (catUrl, title) {
      this.$root.$firebaseRefs.cat.push(
        {
          'url': catUrl,
          'comment': title,
          'info': 'Posted as a test',
          'created_at': -1 * new Date().getTime()
        }
      ).then(
        this.$router.go('/')
      )
    }
  }
}

export default postCat
