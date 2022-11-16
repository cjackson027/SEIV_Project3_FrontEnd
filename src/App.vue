<template>
  <v-app>
    <MenuBar></MenuBar>
    <PDFJSViewer :path='`${path}`' :fileName='`${name}`'/>
    <v-main >
        <router-view />
    </v-main> 
  </v-app>
</template>

<script>
import MenuBar from '@/components/MenuBar.vue'
import PDFJSViewer from './components/PDFJSViewer'

export default {
  name: 'App',
  components: {
    MenuBar,
    PDFJSViewer
  },
  data() {
    return {
      name: 'my-pdf-file.pdf', //change which pdf file loads
      path: 'lib/pdfjs-2.3.200-dist/web/viewer.html' //path of the PDF.js viewer.html
    }
  },  
  methods: {
  },

}

</script>

