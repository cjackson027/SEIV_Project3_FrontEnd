<template>
    <div>
      <VueHtml2pdf
    :show-layout="false"
    :float-layout="true"
    :enable-download="true"
    :preview-modal="true" 
    :paginate-elements-by-height="1400"
    filename=myPDF
    :pdf-quality="2"
    :manual-pagination="false"
    pdf-format="a4"
    pdf-orientation="landscape"
    pdf-content-width="800px"
    ref="html2Pdf"
>
    <section slot="pdf-content">
     <li v-for="(course, index) in courses" :key="index">
       {{ course.courseNumber }} - {{ course.courseName }}
     </li>
    </section>
</VueHtml2pdf>
    <v-btn
    color="error"
    class="mr-4"
    @click="generateReport()"
  >
    Generate PDF
  </v-btn>
      <v-container>
        <v-toolbar>
          <v-toolbar-title>Hello!</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-title>{{this.message}}</v-toolbar-title>
        </v-toolbar>
        <br><br>
        <v-card>
          <v-card-title>
            Course Catalog
            <v-spacer></v-spacer>
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
            ></v-text-field>
          </v-card-title>
          <v-card-text>
            <b>{{ message }}</b>
          </v-card-text>
          <v-data-table
            :headers="headers"
            :search="search"
            :items="courses"
            :items-per-page="50"
          >
           <template v-slot:[`item.actions`]="{ item }">  
            <div>  
            <v-icon
              small
              class="mx-4"
              @click="viewCourseInfo(item)"
              >
              mdi-format-list-bulleted-type
            </v-icon> 
            </div> 
          </template> 
          </v-data-table>
        </v-card>
      </v-container>
    </div>
  </template>
  
  <script>
  import CourseServices from "../services/courseServices";
  import Utils from '@/config/utils.js'
  import VueHtml2pdf from 'vue-html2pdf'

  export default {
    name: "courses-list",
    data() {
      return {
        search: '',
        courses: [],
        currentCourse: null,
        currentIndex: -1,
        title: "",
        user: {},
        message : "View Current Courses",
        headers: [//{text: 'courseId', value: 'id'},
                  {text: 'Number', value: 'courseNumber'},
                  {text: 'Name', value: 'courseName'},
                  {text: 'Hour', value: 'courseHour'},
                  {text: 'Level', value: 'courseLevel'},
                  {text: 'Restrict', value: 'courseRestrict'},
                  {text: 'Yearly', value: 'courseYearly'},
                  {text: 'Session', value: 'courseSession'},
                  {text: 'Description', value: 'courseDescription'},
                  {text: 'Actions', value: 'actions', sortable: false },],
        };
    },
    mounted() {
      this.user = Utils.getStore('user');
      this.retrieveCourses();
    },
    components: {
      VueHtml2pdf
    },
    methods: {
        viewCourseInfo(course) {
          this.$router.push({ name: 'viewcourse', params: { id: course.id } });
        },
      retrieveCourses() {
        CourseServices.getAll()
          .then(response => {
            this.courses = response.data;
          })
          .catch(e => {
            this.message = e.response.data.message;
          });
      },
      refreshList() {
        this.retrieveCourses();
        this.currentCourse = null;
        this.currentIndex = -1;
      },
      setActiveCourse(course, index) {
        this.currentCourse = course;
        this.currentIndex = course ? index : -1;
      },  
      generateReport () {
          this.$refs.html2Pdf.generatePdf()
      }
  
    }
  };
  </script>