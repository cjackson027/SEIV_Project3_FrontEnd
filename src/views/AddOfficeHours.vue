<template>
    <div>
      <v-container>
        <v-toolbar>
          <v-toolbar-title>Office Hours Add</v-toolbar-title>
          <!-- <v-spacer></v-spacer>
          <v-toolbar-title>{{this.message}}</v-toolbar-title> -->
        </v-toolbar>
        <br>
        <h4>{{ message }}</h4>
        <br>
        <h4>Office Hour: {{officelId}}</h4>
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
            @click="saveOfficeHour()"
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
    name: "add-office",
    props: ['userId', 'semesterId'],
    data() {
      return {
        valid: true,
        office: {
          officeWeekDay: "",
          officeStartTime: "",
          officeEndTime: ""
        },
        message: "Enter data and click save"
      };
    },
    methods: {
      saveOfficeHour() {
        var data = {
          weekDay: this.office.officeWeekDay,
          startTime: this.office.officeStartTime,
          endTime: this.office.officeEndTime,
          userId : this.userId,
          semesterId : this.semesterId
        };
        OfficeServices.createOffice(this.userId, this.semesterId, data)
          .then(response => {
            this.office.officeId = response.data.id;
          
            this.$router.push({ name: 'view' , params: { userId: this.userId, semesterId: this.semesterId }} );
          })
          .catch(e => {
            this.message = e.response.data.message;
          });
      },
      cancel(){
          this.$router.push({ name: 'view' , params: { userId: this.userId, semesterId: this.semesterId }} );
      }
    }
  }
  
  </script>
  <style>
  
  </style>