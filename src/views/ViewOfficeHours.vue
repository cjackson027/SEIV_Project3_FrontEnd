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
            Office Hours
            <v-spacer></v-spacer>
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
            ></v-text-field>
            <v-btn class="mx-2" color="primary" @click="addOfficeHours()">Add Office Hours</v-btn>
          </v-card-title>
          <v-card-text>
            <b>{{ message }}</b>
          </v-card-text>
          <v-data-table
            :headers="headers"
            :search="search"
            :items="officehours"
            :items-per-page="50"
          >
          <template v-slot:[`item.actions`]="{ item }">  
            <div>   
            <v-icon
              small
              class="mx-4"
              @click="editOfficeHours(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              class="mx-4"
              @click="deleteOfficeHours(item)"
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
        message : "Search, Edit or Delete Office Hours",
        headers: [{text: 'OfficeId', value: 'id'},
                  {text: 'SemesterId', value: 'semesterId'},
                  {text: 'WeekDay', value: 'officeWeekDay'}, 
                  {text: 'StartTime', value: 'officeStartTime'},
                  {text: 'EndTime', value: 'officeEndTime'},
                  {text: 'Actions', value: 'actions', sortable: false },],
      };
    },
    mounted() {
      this.user = Utils.getStore('user');
      this.retrieveOfficeHours();
    },
    methods: {
      editOfficeHours(officehour) {
        this.$router.push({ name: 'editoffice', params: { id: officehour.id } });
      },
      addOfficeHours() {
      this.$router.push({ name: 'addoffice', params: { id: this.user.userId } });
      },
      deleteOfficeHours(officehour) {
        OfficeServices.delete(officehour.id)
          .then( () => {
            this.retrieveTutorials()
          })
          .catch(e => {
            this.message = e.response.data.message;
          });
      },
      retrieveOfficeHours() {
        OfficeServices.getAllForUser(this.user.userId)
          .then(response => {
            this.officeHours = response.data;
          })
          .catch(e => {
            this.message = e.response.data.message;
          });
      },
      refreshList() {
        this.retrieveOfficeHours();
        this.currentHours = null;
        this.currentIndex = -1;
      },
      setActiveTutorial(OfficeHour, index) {
        this.currentHours = OfficeHour;
        this.currentIndex = OfficeHour ? index : -1;
      },
      removeAllOfficeHours() {
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
