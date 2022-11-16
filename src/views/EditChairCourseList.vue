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
          v-model="course.courseNumber"
          id="courseNumber"
          :counter="50"
          label="Course Number"
          required
        ></v-text-field>
        <v-text-field
          v-model="course.courseName"
          id="courseName"
          :counter="50"
          label="Course Name"
          required
        ></v-text-field>
        <v-text-field
          v-model="course.courseHour"
          id="courseHour"
          :counter="50"
          label="Course Hour"
          required
        ></v-text-field>
        <v-text-field
          v-model="course.courseLevel"
          id="courseLevel"
          :counter="50"
          label="Course Level"
          required
        ></v-text-field>
        <v-text-field
          v-model="course.courseRestrict"
          id="courseRestrict"
          :counter="50"
          label="Course Restriction"
          required
        ></v-text-field>
        <v-text-field
          v-model="course.courseYearly"
          id="courseYearly"
          :counter="50"
          label="Course Yearly"
          required
        ></v-text-field>
        <v-text-field
          v-model="course.courseSession"
          id="courseSession"
          :counter="50"
          label="Course Session"
          required
        ></v-text-field>
        <v-text-field
          v-model="course.courseDescription"
          id="courseDescription"
          :counter="300"
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
      CourseServices.get(this.id)
        .then(response => {
          this.course= response.data;
        })
        .catch(e => {
          this.message = e.response.data.message;
        });

    },

    updateCourse() {
      var data = {
        courseId: this.id,
        courseNumber: this.course.courseNumber,
        courseName: this.course.courseName,
        courseHour: this.course.courseHour,
        courseLevel: this.course.courseLevel,
        courseRestrict: this.course.courseRestrict,
        courseYearly: this.course.courseYearly,
        courseSession: this.course.courseSession,
        courseDescription: this.course.courseDescription

      };
      CourseServices.update(this.id,data)
        .then(response => {
          this.course.id = response.data.id;
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