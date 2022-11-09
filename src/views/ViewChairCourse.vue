<template>
    <div>
      <v-container>
        <v-toolbar>
          <v-toolbar-title>Course View</v-toolbar-title>
          <!-- <v-spacer></v-spacer>
          <v-toolbar-title>{{this.message}}</v-toolbar-title> -->
        </v-toolbar>
        <br>
        <v-card>
          <v-card-title>
            {{ course.coursename }}
            <v-spacer></v-spacer>
            <!-- <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
                class="mx-4"
            ></v-text-field> -->
            <v-btn class="mx-2" color="primary" @click="editCourse()">Course Edit</v-btn>
            <v-btn class="mx-2" color="success" @click="addSection(id)">Add Section</v-btn>
            <v-btn class="mx-2" color="success" @click="cancel()">Return</v-btn>
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
        message: "Add, Edit or Delete Sections",
        headers: [{text: 'courseId', value: 'id'},
                  {text: 'sectionId', value: 'sectionid'},
                  {text: 'startDate', value: 'startdate'},
                  {text: 'endDate', value: 'enddate'},
                  {text: 'startTime', value: 'startime '},
                  {text: 'endTime ', value: 'endtime '},],
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
      editCourse() {
        this.$router.push({ name: 'editCourse', params: { id: this.id } });
      },
      editSection(section) {
        this.$router.push({ name: 'editSection', params: { courseId: this.id, sectionId: section.sectionId} });
      },
      addSection() {
        this.$router.push({ name: 'addSection', params: { courseId: this.id } });
      },
      deleteSection(section) {
        SectionServices.deleteSection(section.courseId,section.sectionId)
          .then( () => {
            this.retrieveSections()
          })
          .catch(e => {
            this.message = e.response.data.message;
          });
      },
      cancel(){
          this.$router.push({ name: 'courselists' });
      }
    }
  }
  </script>
  
  <style>
  </style>