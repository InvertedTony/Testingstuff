<template>
  <div id="cardcontent" class="w-full relative"></div>
</template>

<script>
import Vue from 'vue'
import PostListCard from '@/components/cards/PostListCard.vue'

export default {
  props: {
    posts: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      contentWidth: 0,
      cardComponentRefs: [],
      cards: []
    }
  },
  computed: {
    cardWidth() {
      return Math.floor(this.contentWidth / this.cardsPerRow)
    },
    cardHeight() {
      return this.cardWidth / 2 + 84
    },
    cardsPerRow() {
      return this.contentWidth < 750 ? 1 : 2
    }
  },
  methods: {
    buildCard(post, index) {
      var w = this.cardWidth
      var h = this.cardHeight

      var row = Math.floor(index / this.cardsPerRow)
      var col = index % this.cardsPerRow

      var x = col * w
      var y = row * h

      var cardHeight = h
      var cardWidth = w

      var offsetX = x
      var offsetY = y
      this.cards.push({
        x,
        y,
        post,
        w,
        h
      })

      var ComponentClass = Vue.extend(PostListCard)

      var instance = new ComponentClass({
        propsData: {
          post,
          index,
          width: cardWidth,
          height: cardHeight
        },
        created() {}
      })

      this.cardComponentRefs[index] = instance

      instance.$mount()
      instance.$el.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0px)`
      var el = document.getElementById('cardcontent')
      el.appendChild(instance.$el)
    },
    constructCards() {
      this.cardComponentRefs = new Array(this.posts.length)
      for (let i = 0; i < this.posts.length && i < 15; i++) {
        // console.log('Build post', this.posts[i])
        this.buildCard(this.posts[i], i)
      }

      window.cardcontent.style.height = `${Math.ceil(this.posts.length / this.cardsPerRow) * this.cardHeight}px`
    },
    destroyCards() {
      this.cardComponentRefs.forEach((ref) => {
        if (ref) {
          if (ref.$el) {
            ref.$el.remove()
          }
        }
      })
      this.cards = []
    },
    resize() {
      this.contentWidth = window.cardcontent.clientWidth - 16

      this.destroyCards()
      this.constructCards()
    }
  },
  updated() {
    this.contentWidth = window.cardcontent.clientWidth - 16

    if (!this.cardComponentRefs.length) {
      this.constructCards()
    }
  },
  mounted() {
    window.addEventListener('resize', this.resize)

    this.contentWidth = window.cardcontent.clientWidth - 16

    this.constructCards()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize)
  }
}
</script>