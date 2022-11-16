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
        <h4>Course: {{id}} Section: {{sectionId}}</h4>
        <br>
        <v-form 
          ref="form" 
          v-model="valid"
          lazy validation
        >

        <v-text-field
            v-model="section.sectionWeekDay"
            id="sectionWeekDay"
            :counter="50"
            label="Week Day"
            required
          ></v-text-field>

          <v-text-field
            v-model="section.sectionStartDate"
            id="sectionStartDate"
            :counter="50"
            label="Start Date"
            required
          ></v-text-field>

          <v-text-field
            v-model="section.sectionEndDate"
            id="sectionEndDate"
            :counter="50"
            label="End Date"
            required
          ></v-text-field>

          <v-text-field
            v-model="section.sectionStartTime"
            id="sectionStartTime"
            :counter="50"
            label="Start Time"
            required
          ></v-text-field>

          <v-text-field
            v-model="section.sectionEndTime"
            id="sectionEndTime"
            :counter="50"
            label="End Time"
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
    name: "edit-section",
    props: [ 'id' , 'sectionId' ],
    data() {
      return {
        valid: false,
        section: {
          sectionWeekDay: "",
          sectionStartDate: "",
          sectionEndDate: "",
          sectionStartTime: "",
          sectionEndTime: "",
        },
        message: "Enter data and click save"
      };
    },
    methods: {
      retrieveSection() {
        SectionServices.getSection(this.id, this.sectionId)
          .then(response => {
            this.section= response.data;
          })
          .catch(e => {
            this.message = e.response.data.message;
          });
  
      },
      saveSection() {
        var data = {
            id: this.sectionId,
            sectionWeekDay: this.section.sectionWeekDay,
            sectionStartDate: this.section.sectionStartDate,
            sectionEndDate: this.section.sectionEndDate,
            sectionStartTime : this.section.sectionStartTime,
            sectionEndTime : this.section.sectionEndTime,
            courseId: this.id
        };
        SectionServices.updateSection(this.id,this.sectionId, data)
          .then(response => {
            this.section.sectionId = response.data.id;
          
           this.$router.push({ name: 'viewchaircourse' , params: { id: this.id }} );
          })
          .catch(e => {
            this.message = e.response.data.message;
          });
      },
      cancel(){
          this.$router.push({ name: 'viewchaircourse' , params: { id: this.id }} );
      }
    },
      mounted() {
        this.retrieveSection();
    }
  }
  
  </script>
  <style>
  
  </style>