<template lang="html">
    <ul v-if="totalPage > 1 && totalPage < 8" class="pagination">
        <li v-if="withNextPrev" :class="disablePrev">
            <a @click="!disablePrev ? btnPrev() : ''">
                <i v-if="!prevText" class="material-icons">keyboard_arrow_left</i>
                {{ prevText }}
            </a>
        </li>
        <li v-for="(n, index) in totalPage" :key="index" :class="n === selected ? 'active ' + activeBGColor  : ''">
            <a @click="emitBtnClick(n)" :style="customActiveBGColor && n === selected ? {background: customActiveBGColor, borderColor: customActiveBGColor} : {}">{{ n }}</a>
        </li>
        <li v-if="withNextPrev" :class="disableNext">
            <a @click="!disableNext ? btnNext() : ''">
                <i v-if="!nextText" class="material-icons">keyboard_arrow_right</i>
                {{ nextText }}
            </a>
        </li>
    </ul>

    <ul v-else-if="totalPage >= 8" class="pagination">
        <li v-if="withNextPrev" :class="disablePrev">
            <a @click="!disablePrev ? btnPrev() : ''">
                <i v-if="!prevText" class="material-icons">keyboard_arrow_left</i>
                {{ prevText }}
            </a>
        </li>
        <li v-for="(n, index) in pages" v-if="n.show" :key="index" :class="n.content === selected ? 'active ' + activeBGColor : '' + n.disable">
            <a v-if="n.disable != 'disabled'" @click="emitBtnClick(n.content)" :style="customActiveBGColor && n.content === selected ? {background: customActiveBGColor, borderColor: customActiveBGColor} : {}">{{ n.content }}</a>
            <a v-else>{{ n.content }}</a>
        </li>
        <li v-if="withNextPrev" :class="disableNext">
            <a @click="!disableNext ? btnNext() : ''">
                <i v-if="!nextText" class="material-icons">keyboard_arrow_right</i>
                {{ nextText }}
            </a>
        </li>
    </ul>
</template>

<script>
export default {
  props: {
    totalPage: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      default: 1
    },
    myData: {
      default: null
    },
    pageRange: {
      type: Number,
      default: 3
    },
    withNextPrev: {
      type: Boolean,
      default: true
    },
    nextText: {
      type: String,
      default: ''
    },
    prevText: {
      type: String,
      default: ''
    },
    activeBGColor: {
      type: String
    },
    customActiveBGColor: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      selected: this.currentPage,
      totalButton: this.pageRange + 4,
      disableNext: '',
      disablePrev: ''
    }
  },
  mounted () {
    this.disablePrevNext()
  },
  computed: {
    pages: function () {
      let items = []
      for (let i = 0; i < this.totalPage; i++) {
        let page = {
          content: i + 1,
          disable: '',
          show: false
        }
        items[i] = page
      }

      let page1 = {
        content: '...',
        disable: 'disabled',
        show: false
      }

      let page2 = {
        content: '...',
        disable: 'disabled',
        show: false
      }

      items.splice(1, 0, page1)
      items.splice(items.length - 1, 0, page2)

      for (let i = 0; i < items.length; i++) {
        if (i === 0 || i === items.length - 1) {
          items[i].show = true
        }

        // if (this.selected <= this.pageRange) {
        //   if (this.selected === this.pageRange) {
        //     if (i >= 2 && i <= this.pageRange + 1) {
        //       items[i].show = true
        //     }
        //   } else {
        //     if (i >= 2 && i <= this.pageRange) {
        //       items[i].show = true
        //     }
        //   }

        //   items[items.length - 2].show = true
        // } else if (this.selected > this.pageRange) {
        //   if (i >= this.selected - 1 && (this.selected + 2) < items.length - 2 && i <= this.selected + 1) {
        //     items[1].show = true
        //     items[items.length - 2].show = true
        //     items[i].show = true
        //   } else if (i >= items.length - 2 - this.pageRange && (this.selected + 2) >= items.length - 2) {
        //     items[1].show = true
        //     items[items.length - 2].show = false
        //     items[i].show = true
        //   }
        // }

        if (this.totalPage <= this.totalButton) {
          items[i].show = true
        } else {
          var x = parseInt(this.totalButton / 2) + 1
          var y = parseInt(this.pageRange / 2)
          if (this.selected <= x) {
            if (i >= 2 && i <= this.pageRange + 2) {
              items[i].show = true
              items[1].show = false
              items[items.length - 2].show = true
            }
          } else if (this.selected > this.totalPage - x) {
            if (i >= items.length - this.pageRange - 3 && i <= items.length - 3) {
              items[i].show = true
              items[1].show = true
              items[items.length - 2].show = false
            }
          } else {
            if (i >= this.selected - y && i < this.selected + this.pageRange - y) {
              items[i].show = true
              items[1].show = true
              items[items.length - 2].show = true
            }
          }
        }
      }
      return items
    }
  },
  methods: {
    emitBtnClick: function (n) {
      this.selected = n
      this.$emit('btnClick', this.selected, this.myData)

      this.disablePrevNext()
    },

    btnNext: function () {
      this.selected++
      this.$emit('btnClick', this.selected, this.myData)

      this.disablePrevNext()
    },

    btnPrev: function () {
      this.selected--
      this.$emit('btnClick', this.selected, this.myData)

      this.disablePrevNext()
    },

    disablePrevNext: function () {
      this.disablePrev = this.selected === 1 ? 'disabled' : ''
      this.disableNext = this.selected === this.totalPage ? 'disabled' : ''
    }
  }
}
</script>

<style scoped>
  .pagination .active a{
    z-index: 0;
  }

  .pagination > li > a {
    text-align: center;
    width: 40px;
  }

  .pagination > .disabled a {
    cursor: default;
  }

  .active.primary a{
    background: #007BFF;
    border-color: #007BFF;
  }

  .active.success a{
    background: #28A745;
    border-color: #28A745;
  }

  .active.danger a{
    /* background: #DC3545;
    border-color: #DC3545; */
    background: #F44336;
    border-color: #F44336;
  }

  .active.warning a{
    background: #FFC107;
    border-color: #FFC107;
  }

  .active.info a{
    background: #17A2B8;
    border-color: #17A2B8;
  }

  .active.dark a{
    background: #343A40;
    border-color: #343A40;
  }

</style>
