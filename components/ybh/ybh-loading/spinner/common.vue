<script>
  export default {
    computed: {
      spinnerColor() {
        return this.vuex_themeColor.color || '#0081ff';
      },
	  
	  spinnerBgColor() {
	    return this.vuex_themeColor.colorCode || '#0081ff';
	  },

      spinnerSize() {
        return (this.size || 28) + 'px';
      }
    },

    props: {
      size: Number,
      color: String
    }
  };
</script>
