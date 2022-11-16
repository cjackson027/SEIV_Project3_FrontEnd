<template>
    <v-row class="fill-height">
      <v-col>
        <v-sheet height="64">
          <v-toolbar
            flat
          >
          <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
          <v-btn color=”primary” dark @click.stop="dialog = true">New Event</v-btn>
            <!-- Button used to set date on calendar to Today -->
          <v-btn
              outlined
              class="mr-4"
              color="grey darken-2"
              @click="setToday"
            >
              Today
            </v-btn>

            <!-- Button used to go previous or next in day, week, or month -->
            <v-btn
              fab
              text
              small
              color="grey darken-2"
              @click="prev"
            >
              <v-icon small>
                mdi-chevron-left
              </v-icon>
            </v-btn>
            <v-btn
              fab
              text
              small
              color="grey darken-2"
              @click="next"
            >
              <v-icon small>
                mdi-chevron-right
              </v-icon>
            </v-btn>


            
            <v-toolbar-title v-if="$refs.calendar">
              {{ $refs.calendar.title }}
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-menu
              bottom
              right
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  outlined
                  color="grey darken-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  <span>{{ typeToLabel[type] }}</span>
                  <v-icon right>
                    mdi-menu-down
                  </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="type = 'day'">
                  <v-list-item-title>Day</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'week'">
                  <v-list-item-title>Week</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'month'">
                  <v-list-item-title>Month</v-list-item-title>
                </v-list-item>
                <!-- <v-list-item @click="type = '4day'">
                  <v-list-item-title>4 days</v-list-item-title>
                </v-list-item> -->
              </v-list>
            </v-menu>
            
          </v-toolbar>
        </v-sheet>

<!-- Edit button Dialogue Box -->
<v-dialog v-model="dialog" max-width="500">
<v-card>
<v-container>
  <v-form @submit.prevent="addEvent">
    <v-text-field
      v-model="name"
      type="text"
      label="event name (required)"
    >
    </v-text-field>
    <v-text-field
      v-model="details"
      type="text"
      label="detail"
    >
    </v-text-field>
    <v-text-field
      v-model="start"
      type="date"
      label="start (required)"
    >
    </v-text-field>
    <v-text-field
      v-model="end"
      type="date"
      label="end (required)"
    >
    </v-text-field>
    <v-text-field
      v-model="color"
      type="color"
      label="color (click to open color menu)"
    >
    </v-text-field>
    <v-btn
      type="submit"
      color="primary"
      class="mr-4"
      @click.stop="dialog = false"
    >
      create event
    </v-btn>
  </v-form>
</v-container>
</v-card>
</v-dialog>
    <!-- ================== Side Bar ===================== -->
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list-item>
        <!-- This adds the user's portrait from their google accounts -->
        <!-- <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar> -->
        <v-list-item-content>
          <v-list-item-title>Menu</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- ================End of Side Bar==================== -->

    

            <!-- The Calendar itself  -->
      <v-sheet height="500">
        <v-calendar
        ref="calendar"
         v-model="focus"
          :events="events"
          color="primary"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="updateRange"
        ></v-calendar>



      </v-sheet>
    </v-col>
  </v-row>
</template>



<script>
// import TutorialServices from "../services/tutorialServices";
// import LessonServices from "../services/lessonServices";
import CourseServices from "../services/courseServices";
import SectionServices from "../services/sectionServices";


  export default {
    data: () => ({
        focus: '',
      type: 'month',
        month: 'Month',
        week: 'Week',
        day: 'Day',
        // '4day': '4 Days',
        sections: [],
        courses: [], 
        SelectedOpen: false,
        weekday: [0, 1, 2, 3, 4, 5, 6],

        events: [ // example events 
          {
            name: 'Weekly Meeting',
            start: '2022-11-07 9:00', 
            end: '2022-11-07 10:00',
          },
          {
            name: `Birthday`,
            start: '2022-11-10',
          },
          {
            name: 'Test1',
            start: '2022-11-09 12:30',
            end: '2022-11-09 15:30',
          },
        ],

    }),
    mounted () {
        this.$refs.calendar.scrollToTime('08:00')
    },
    async beforeMount() {
        await this.getSections();
        //console.log(this.events)
      },

    methods: {
       async getSections(){
           await SectionServices.getAllSections()
            .then(async response => {
                this.sections = response.data;
                await this.getCourses()
                this.createEvent()
            })
        .catch(e  => {
            console.log(e);
        })
    },

   async getCourses(){
       await CourseServices.getAll()
        .then(response => {
            this.courses = response.data;

        })
        .catch(e  => {
            this.message = e.response.data.message;
        })
    },
    
createEvent() {
    


        //  this.sections.forEach(section => this.courses.forEach(course => {
        //     if (section.courseId == course.id){
        //          let relevantCourse = course
        //          console.log(relevantCourse.courseName)
        //     }
        //  }
        //  ));
         
         

    this.sections.forEach( section => {
        let relevantCourse = this.courses.find( course => course.id == section.courseId);
        // console.log(section)
        // console.log(relevantCourse)

        let name = relevantCourse.courseName;
        console.log(name)
        console.log(section.courseId)

        var dateStringStart = section.sectionStartDate;
        var splittedDate = dateStringStart.split('/');
        dateStringStart = [splittedDate[2], splittedDate[0], splittedDate[1]].join('-');
        console.log(dateStringStart)

        var dateStringEnd = section.sectionEndDate;
        splittedDate = dateStringEnd.split('/');
        dateStringEnd = [splittedDate[2], splittedDate[0], splittedDate[1]].join('-');
        console.log(dateStringEnd)

        // var day = section.sectionWeekDay;
        // splitDays = day.split(',');
        // for (var v = 0; splitDays[v]; v++){
        //     weekday[v] = splitDays[v]
        // }



        let tempEvent = {
            name: name,
            start: dateStringStart + " " + "9:00",
            end: dateStringEnd + " " + "12:00"
        }
        // let tempEvent = {
        //     name: name,
        //     start: dateStringStart,
        //     end: dateStringEnd
        // }
        this.events.push(tempEvent);
});
},

      viewDay ({ date }) {
        this.focus = date
        this.type = 'day'
      },
      getEventColor (event) {
        return event.color
      },
      setToday () {
        this.focus = ''
      },
      prev () {
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },
      
      showEvent ({ nativeEvent, event }) {
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
        }

        if (this.selectedOpen) {
          this.selectedOpen = false
          requestAnimationFrame(() => requestAnimationFrame(() => open()))
        } else {
          open()
        }
      },
 }
 }
  </Script>