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
            Tutorials
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
            :items="tutorials"
            :items-per-page="50"
          >
          <template v-slot:[`item.actions`]="{ item }">  
            <div>   
            <v-icon
              small
              class="mx-4"
              @click="editTutorial(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              class="mx-4"
              @click="viewTutorial(item)"
            >
              mdi-format-list-bulleted-type
            </v-icon>
            <v-icon
              small
              class="mx-4"
              @click="deleteTutorial(item)"
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
  import OfficeServices from "../services/officeServices";
  import Utils from '@/config/utils.js'
  
  export default {
    name: "officehours-list",
    data() {
      return {
        search: '',
        officehours: [],
        currentHours: null,
        currentIndex: -1,
        title: "",
        user: {},
        message : "Search, Edit or Delete Tutorials",
        headers: [{text: 'SectionId', value: 'sectionId'},
                  {text: 'OfficeId', value: 'officeId'},
                  {text: 'WeekDay', value: 'weekDay'}, 
                  {text: 'StartTime', value: 'startTime'},
                  {text: 'EndTime', value: 'endTime'},],
      };
    },
    mounted() {
      this.user = Utils.getStore('user');
      this.retrieveTutorials();
    },
    methods: {
      editTutorial(tutorial) {
        this.$router.push({ name: 'edit', params: { id: tutorial.id } });
      },
      viewTutorial(tutorial) {
        this.$router.push({ name: 'view', params: { id: tutorial.id } });
      },
      deleteTutorial(tutorial) {
        OfficeServices.delete(tutorial.id)
          .then( () => {
            this.retrieveTutorials()
          })
          .catch(e => {
            this.message = e.response.data.message;
          });
      },
      retrieveTutorials() {
        OfficeServices.getAllForUser(this.user.userId)
          .then(response => {
            this.tutorials = response.data;
          })
          .catch(e => {
            this.message = e.response.data.message;
          });
      },
      refreshList() {
        this.retrieveTutorials();
        this.currentTutorial = null;
        this.currentIndex = -1;
      },
      setActiveTutorial(tutorial, index) {
        this.currentTutorial = tutorial;
        this.currentIndex = tutorial ? index : -1;
      },
      removeAllTutorials() {
        OfficeServices.deleteAll()
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