<template>
    <div>
      <v-container>
        <v-toolbar>
          <v-toolbar-title>Section Edit</v-toolbar-title>
          <!-- <v-spacer></v-spacer>
          <v-toolbar-title>{{this.message}}</v-toolbar-title> -->
        </v-toolbar>
        <br>
        <h4>{{ message }}</h4>
        <br>
        <h4>Course: {{courseId}}</h4>
        <br>
        <v-form 
          ref="form" 
          v-model="valid"
          lazy validation
        >
        <v-text-field
            v-model="section.startDate"
            id="startDate"
            :counter="50"
            label="StartDate"
            required
          ></v-text-field>

          <v-text-field
            v-model="section.endDate"
            id="endDate"
            :counter="50"
            label="EndDate"
            required
          ></v-text-field>

          <v-text-field
            v-model="section.startTime"
            id="startTime"
            :counter="50"
            label="StartTime"
            required
          ></v-text-field>

          <v-text-field
            v-model="section.endTime"
            id="endTime"
            :counter="50"
            label="EndTime"
            required
          ></v-text-field>

          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="saveSection()"
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
  import SectionServices from "../services/sectionServices";

  export default {
    name: "add-section",
    props: ['courseId'],
    data() {
      return {
        valid: true,
        section: {
          id: null,
          startDate: "",
          endDate: "",
          startTime: "",
          endTime: "",
        },
        message: "Enter data and click save"
      };
    },
    methods: {
      saveSection() {
        var data = {
            startDate: this.section.startDate,
            endDate: this.section.endDate,
            startTime : this.section.startTime,
            endTime : this.section.endTime,
            courseId : this.section.courseId,
        };
        SectionServices.createSection(this.courseId, data)
          .then(response => {
            this.section.sectionId = response.data.id;
          
            this.$router.push({ name: 'viewchaircourse' , params: { id: this.courseId }} );
          })
          .catch(e => {
            this.message = e.response.data.message;
          });
      },
      cancel(){
          this.$router.push({ name: 'viewchaircourse' , params: { id: this.courseId }} );
      }
    }
  }
  
  </script>
  <style>
  
  </style>