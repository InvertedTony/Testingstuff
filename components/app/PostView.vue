<template>
  <div class="w-full h-full">
    <component v-if="contentType" :is="componentName" :content="content" :stats="_stats" />
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      default: () => {}
    },
    stats: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      contentComponents: {
        Written: 'posts-written-view',
        Video: 'posts-video-view',
        Audio: 'posts-audio-view'
      }
    }
  },
  computed: {
    _stats() {
      return this.stats || {}
    },
    contentType() {
      if (!this.content || !this.content.Data) return null
      if (this.content.Data.Written) return 'Written'
      else if (this.content.Data.Video) return 'Video'
      else if (this.content.Data.Audio) return 'Audio'
      return null
    },
    componentName() {
      return this.contentComponents[this.contentType]
    }
  },
  methods: {},
  mounted() {}
}
</script>