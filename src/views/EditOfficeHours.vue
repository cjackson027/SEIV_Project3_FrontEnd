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
    props: [ 'userId' , 'semesterId', 'officeId' ],
    data() {
      return {
        valid: false,
        office: {},
        message: "Enter data and click save"
      };
    },
    methods: {
      retrieveOfficeHours() {
        OfficeServices.getOfficeHours(this.userId, this.semesterId, this.officeId)
          .then(response => {
            this.office= response.data;
          })
          .catch(e => {
            this.message = e.response.data.message;
          });
  
      },
      saveOfficeHours() {
        var data = {
          weekDay: this.office.officeWeekDay,
          startTime: this.office.officeStartTime,
          startTime: this.office.officeStartTime,
          userId : this.userId,
          semesterId : this.semesterId
        };
        OfficeServices.updateOfficeHours(this.office.userId, this.office.semesterId, this.office.id, data)
          .then(response => {
            this.office.id = response.data.id;
          
           this.$router.push({ name: 'view' , params: { userId: this.office.userId, semesterId: this.office.semesterId }} );
          })
          .catch(e => {
            this.message = e.response.data.message;
          });
      },
      cancel(){
          this.$router.push({ name: 'view' , params: { userId: this.office.userId, semesterId: this.office.semesterId }} );
      }
    },
      mounted() {
        this.retrieveOfficeHours();
    }
  }
  
  </script>
  <style>
  
  </style>