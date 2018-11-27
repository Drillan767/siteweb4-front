<template>
  <div id="app">
    <div v-for="(sm, index) in social_medias" :key="index">
      <vue-multiselect
        :options="icons"
        :close-on-select="true"
        v-model="sm.icon"
        :group-select="true"
        group-label="category"
        group-values="icons"
        track-by="name"
        label="name"
      >
        <template
          slot="singleLabel"
          slot-scope="props"
        >
      <span>
        <i :class="props.option.name"></i>
        {{ cleaned(props.option.name) }}
      </span>
        </template>
        <template
          slot="option"
          slot-scope="props"
        >
      <span v-if="props.option.$isLabel">
        {{ props.option.$groupLabel }}
      </span>
          <span :class="props.option.class" v-else>
        <i :class="props.option.name"></i>
        {{ list(props.option.name) }}
      </span>
        </template>
      </vue-multiselect>
    </div>
  </div>
</template>

<script>
new Vue({
  components: {
    Multiselect: window.VueMultiselect.default
  },
  data () {
    return {
      options: [
        {
          category: 'Accessibility',
          icons: [
            {
              name: 'fab fa-accessible-icon'
            },
            {
              name: 'fas fa-american-sign-language-interpreting'
            },
            {
              name: 'fas fa-assistive-listening-systems'
            },
            {
              name: 'fas fa-audio-description'
            },
            {
              name: 'fas fa-blind'
            },
            {
              name: 'fas fa-braille'
            }
          ]
        },
        {
          category: 'Arrows',
          icons: [
            {
              name: 'fas fa-angle-double-down'
            },
            {
              name: 'fas fa-angle-double-left'
            },
            {
              name: 'fas fa-angle-double-right'
            },
            {
              name: 'fas fa-angle-double-up'
            }
          ]
        },
        {
          category: 'Brands',
          icons: [
            {
              name: 'fab fa-btc'
            },
            {
              name: 'fab fa-bluetooth-b'
            },
            {
              name: 'fab fa-bluetooth'
            },
            {
              name: 'fab fa-blogger-b'
            },
            {
              name: 'fab fa-blogger'
            },
            {
              name: 'fab fa-blackberry'
            }
          ]
        }
      ]
    }
  },

  methods: {
    list(fa) {
      fa = fa.replace(/(fas|far|fab) fa-/gm, '')
      fa = fa.replace(/-/gm, ' ')
      fa = fa.split(' ')
        .map((s) => s.charAt(0)
          .toUpperCase() + s.substring(1))
        .join(' ')
      return fa
    },

    cleaned(fa) {
      fa = fa.replace(/(fas|far|fab) fa-/gm, '')
      fa = fa.replace(/-/gm, ' ')
      fa = fa.split(' ')
        .map((s) => s.charAt(0)
          .toUpperCase() + s.substring(1))
        .join(' ')
      return fa
    },
    addRow() {
      this.social_medias.push({ icon: '', url: '' })
    },

    removeRow(index) {
      this.social_medias.splice(index, 1)
    }
  }
}).$mount('#app')
</script>
