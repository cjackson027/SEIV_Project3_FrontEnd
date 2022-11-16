<template>
    <div>
      <v-container>
        <v-toolbar>
          <v-toolbar-title>Office Hours Edit</v-toolbar-title>
          <!-- <v-spacer></v-spacer>
          <v-toolbar-title>{{this.message}}</v-toolbar-title> -->
        </v-toolbar>
        <br>
        <h4>{{ message }}</h4>
        <br>
        <h4>User: {{userId}} Semester: {{semesterId}} Office Hours: {{officeId}}</h4>
        <br>
        <v-form 
          ref="form" 
          v-model="valid"
          lazy validation
        >
        <v-text-field
            v-model="office.officeWeekDay"
            id="officeWeekDay"
            :counter="50"
            label="WeekDay"
            required
        ></v-text-field>
        <v-text-field
            v-model="office.officeStartTime"
            id="officeStartTime"
            :counter="50"
            label="Start Time"
            required
        ></v-text-field>

        <v-text-field
            v-model="office.officeEndTime"
            id="officeEndTime"
            :counter="50"
            label="End Time"
            required
        ></v-text-field>
  
          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="saveOfficeHours()"
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
  import OfficeServices from "../services/officeServices";
  
  export default {
    name: "edit-office",
    props: [ 'id' ],
    data() {
      return {
        valid: false,
        office: {},
        message: "Enter data and click save"
      };
    },
    methods: {
      retrieveOfficeHours() {
        OfficeServices.get(this.id)
          .then(response => {
            this.office = response.data;
          })
          .catch(e => {
            this.message = e.response.data.message;
          });
  
      },
      saveOfficeHours() {
        var data = {
          officeId: this.id,
          weekDay: this.office.officeWeekDay,
          startTime: this.office.officeStartTime,
          EndTime: this.office.officeEndTime,
          userId : this.office.userId,
          semesterId : this.office.semesterId
        };
        OfficeServices.updateOfficeHours(this.id, data)
          .then(response => {
            this.id = response.data.id;
          
           this.$router.push({ name: 'viewofficehours' , params: { userId: this.office.userId}} );
          })
          .catch(e => {
            this.message = e.response.data.message;
          });
      },
      cancel(){
          this.$router.push({ name: 'viewofficehours' , params: { userId: this.office.userId}} );
      }
    },
      mounted() {
        this.retrieveOfficeHours();
    }
  }
  
  </script>
  <style>
  
  </style>