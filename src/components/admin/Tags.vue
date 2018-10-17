<template>
  <div class="tags">
    <div class="col-sm-12 row" v-for="(tag, index) in tags" :key="index">
      <div class="col-sm-8">
        <h4>{{tag.name}}</h4>
        <p>{{tag.description_en}}</p>
      </div>
      <div class="col-sm-4 bulk">
        <div class="btn-group btn-group-toggle" data-toggle="buttons">
          <a class="btn btn-outline-light">
            <i class="fas fa-wrench"></i>
          </a>
          <a class="btn btn-outline-light">
            <i class="fas fa-trash-alt"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tags: []
    }
  },

  mounted () {
    this.$axios.get('/tags')
      .then(response => {
        this.tags = response.data
      })
      .catch(e => console.log(e.response))
  }
}
</script>
