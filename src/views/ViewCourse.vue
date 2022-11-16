<template>
    <div>
      <v-container>
        <v-toolbar>
          <v-toolbar-title>Course View</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-title>{{this.message}}</v-toolbar-title>
        </v-toolbar>
        <br>
        <v-card>
          <v-card-title>
            {{ course.courseName }}
            <v-spacer></v-spacer>
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
                class="mx-4"
            ></v-text-field>
            <v-btn class="mx-2" color="primary" @click="cancel()">Return</v-btn>
          </v-card-title>
          <v-card-text>
            <b>{{ message }}</b>
          </v-card-text>
          <v-data-table
            :headers="headers"
            :search="search"
            :items="sections"
            :items-per-page="50"
          >
          <template v-slot:[`item.actions`]="{ item }">  
            <div>   
            <v-icon
              small
              class="mx-4"
              @click="editSection(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              class="mx-4"
              @click="deleteSection(item)"
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
  import SectionServices from "../services/sectionServices";
  
  export default {
    name: "view-course",
    props: ['id'],
    data() {
      return {
        search: '',
        course: {},
        sections : [],
        message: "View Section Information",
        headers: [
                  //{text: 'sectionId', value: 'id'},
                  {text: 'weekDay', value: 'sectionWeekDay'},
                  {text: 'startDate', value: 'sectionStartDate'},
                  {text: 'endDate', value: 'sectionEndDate'},
                  {text: 'startTime', value: 'sectionStartTime'},
                  {text: 'endTime ', value: 'sectionEndTime'},],
      };
    },
    mounted() {
      this.retrieveSections();
    },
    methods: {
      retrieveSections() {
        CourseServices.get(this.id)
        .then(response => {
          this.course = response.data;
          SectionServices.getAllSections(this.id)
          .then(response => {
            this.sections = response.data
          })
          .catch(e => {
              this.message = e.response.data.message;
          });
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
      },
      cancel(){
          this.$router.push({ name: 'courses' });
      }
    }
  }
  </script>
  
  <style>
  </style>