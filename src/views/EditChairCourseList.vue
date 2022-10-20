<template>
  <div>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>Course Edit</v-toolbar-title>
        <!-- <v-spacer></v-spacer>
        <v-toolbar-title>{{this.message}}</v-toolbar-title> -->
      </v-toolbar>
      <br>
      <h4>{{ message }}</h4>
      <br>
      <v-form 
        ref="form" 
        v-model="valid"
        lazy validation
      >
      <v-text-field
          v-model="course.courseid"
          id="courseid"
          :counter="50"
          label="Course Id"
          required
        ></v-text-field>
        <v-text-field
          v-model="course.coursenumber"
          id="coursenumber"
          :counter="50"
          label="Course Number"
          required
        ></v-text-field>
        <v-text-field
          v-model="course.coursename"
          id="coursename"
          :counter="50"
          label="Course Name"
          required
        ></v-text-field>
        <v-text-field
          v-model="course.coursehour"
          id="coursehour"
          :counter="50"
          label="Course Hour"
          required
        ></v-text-field>
        <v-text-field
          v-model="course.courserestrict"
          id="courserestrict"
          :counter="50"
          label="Course Restriction"
          required
        ></v-text-field>
        <v-text-field
          v-model="course.courseyearly"
          id="courseyearly"
          :counter="50"
          label="Course Yearly"
          required
        ></v-text-field>
        <v-text-field
          v-model="course.coursesession"
          id="coursesession"
          :counter="50"
          label="Course Session"
          required
        ></v-text-field>
        <v-text-field
          v-model="course.coursedescription"
          id="coursedescription"
          :counter="50"
          label="Course Description"
          required
        ></v-text-field>

        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="updateCourse()"
        >
          Save
        </v-btn>

        <v-btn
          color="error"
          class="mr-4"
          @click="cancel()"
        >
          Cancel
        </v-btn>
      </v-form>
    </v-container>
  </div>  
</template>

<script>
import CourseServices from "../services/courseServices";

export default {
  name: "edit-course",
  props: ['id'],
  data() {
    return {
      valid: false,
      course: {},
      message: "Enter data and click save"
    };
  },
  methods: {
    retrieveCourse() {
      CourseServices.get(this.courseid)
        .then(response => {
          this.course= response.data;
        })
        .catch(e => {
          this.message = e.response.data.message;
        });

    },

    updateCourse() {
      var data = {
        courseId: this.course.courseid,
        courseNumber: this.course.coursenumber,
        courseName: this.course.coursename,
        courseHour: this.course.coursehour,
        courseRestrict: this.course.courserestrict,
        courseYearly: this.course.courseyearly,
        courseSession: this.course.coursesession,
        courseDescription: this.course.description

      };
      CourseServices.update(this.courseid,data)
        .then(response => {
          this.course.courseid = response.data.courseid;
          this.$router.push({ name: 'courselists' });
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    cancel(){
        this.$router.push({ name: 'courselists' });
    }
  },
    mounted() {
    this.retrieveCourse();
  }
}

</script>
<style>

</style>