<template>
    <div>
      <v-container>
        <v-toolbar>
          <v-toolbar-title>Hello!</v-toolbar-title>
          <!-- <v-spacer></v-spacer>
          <v-toolbar-title>{{this.message}}</v-toolbar-title> -->
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
            <!-- <v-icon
              small
              class="mx-4"
              @click="editCourse(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              class="mx-4"
              @click="deleteCourse(item)"
            >
            mdi-trash-can
            </v-icon> -->
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
        headers: [{text: 'courseId', value: 'id'},
                  {text: 'courseNumber', value: 'courseNumber'},
                  {text: 'courseName', value: 'courseName'},
                  {text: 'courseHour', value: 'courseHour'},
                  {text: 'courseLevel', value: 'courseLevel'},
                  {text: 'courseRestrict', value: 'courseRestrict'},
                  {text: 'courseYearly', value: 'courseYearly'},
                  {text: 'courseSession', value: 'courseSession'},
                  {text: 'courseDescription', value: 'courseDescription'},],
        };
    },
    mounted() {
      this.user = Utils.getStore('user');
      this.retrieveCourses();
    },
    methods: {
    //   editCourse(course) {
    //     this.$router.push({ name: 'editcourse', params: { id: course.courseId } });
    //   },
        viewCourseInfo(course) {
          this.$router.push({ name: 'viewCourse', params: { id: course.id } });
        },
    //   deleteCourse(course) {
    //     CourseServices.delete(course.courseId)
    //       .then( () => {
    //         this.retrieveCourses()
    //       })
    //       .catch(e => {
    //         this.message = e.response.data.message;
    //       });
    //   },
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
    //   removeAllCourses() {
    //     CourseServices.deleteAll()
    //       .then(response => {
    //         console.log(response.data);
    //         this.refreshList();
    //       })
    //       .catch(e => {
    //         this.message = e.response.data.message;
    //       });
    //   },
      
    }
  };
  </script>