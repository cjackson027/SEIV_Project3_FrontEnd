<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Hello!</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-title>{{this.message}}</v-toolbar-title>
      </v-toolbar>
      <br><br>
      <v-card>
        <v-card-title>
          ChairCourseListing
          <v-spacer></v-spacer>
          <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
          ></v-text-field>
          <v-btn class="mx-2" color="primary" @click="addCourse()">Add Course</v-btn>
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
            @click="viewCourse(item)"
          >
            mdi-format-list-bulleted-type
          </v-icon>
          <v-icon
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
      message : "Search, Add, Edit or Delete Courses",
      headers: [//{text: 'Id', value: 'id'},
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
  methods: {
    editCourse(course) {
      this.$router.push({ name: 'editcourse', params: { id: course.id } });
    },
    addCourse() {
      this.$router.push({ name: 'addcourse' });
    },
    viewCourse(course) {
      this.$router.push({ name: 'viewchaircourse', params: { id: course.id } });
    },
    deleteCourse(course) {
      CourseServices.delete(course.id)
        .then( () => {
          this.retrieveCourses()
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
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
    removeAllCourses() {
      CourseServices.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    
  }
};
</script>