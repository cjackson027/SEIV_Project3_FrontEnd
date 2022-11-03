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
    <v-dialog v-model="dialog" max-width="500">
        <v-card>
          <v-container>
            <v-form @submit.prevent="addEvent">
              <v-text-field v-model="name" type="text" label="event name (required)"></v-text-field>
              <v-text-field v-model="details" type="text" label="detail"></v-text-field>
              <v-text-field v-model="start" type="date" label="start (required)"></v-text-field>
              <v-text-field v-model="end" type="date" label="end (required)"></v-text-field>
              <v-text-field v-model="color" type="color" label="color (click to open color menu)"></v-text-field>
              <v-btn type="submit" color="primary" class="mr-4" @click.stop="dialog = false">
                create event
              </v-btn>
            </v-form>
          </v-container>
        </v-card>
      </v-dialog>
    
    <!-- The Calendar itself  -->
      <v-sheet height="500">
        <v-calendar
        ref="calendar"
         v-model="focus"
          :events="events"
          :event-color="getEventColor"
          color="primary"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="updateRange"
        ></v-calendar>

<!-- Delete button to the tool bar -->
<v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          full-width
          offset-x
        >
<v-card color="grey lighten-4" :width="350" flat>
  <v-toolbar :color="selectedEvent.color" dark>
    <v-btn @click="deleteEvent(selectedEvent.id)" icon>
      <v-icon>mdi-delete</v-icon>
    </v-btn>
    <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
    <div class="flex-grow-1"></div>
  </v-toolbar>
<v-card-text>
    <form v-if="currentlyEditing !== selectedEvent.id">
      {{ selectedEvent.details }}
    </form>
    <form v-else>
      <textarea-autosize
        v-model="selectedEvent.details"
        type="text"
        style="width: 100%"
        :min-height="100"
        placeholder="add note">
      </textarea-autosize>
    </form>
  </v-card-text>

<v-card-actions>
    <v-btn text color="secondary" @click="selectedOpen = false">
      close
    </v-btn>
    <v-btn v-if="currentlyEditing !== selectedEvent.id" text @click.prevent="editEvent(selectedEvent)">
      edit
    </v-btn>
    <v-btn text v-else type="submit" @click.prevent="updateEvent(selectedEvent)">
      Save
    </v-btn>
  </v-card-actions>
</v-card>
</v-menu>


<!-- <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card
            color="grey lighten-4"
            min-width="350px"
            flat
          >
            <v-toolbar
              :color="selectedEvent.color"
              dark
            >
              <v-btn icon>
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <span v-html="selectedEvent.details"></span>
            </v-card-text>
            <v-card-actions>
              <v-btn
                text
                color="secondary"
                @click="selectedOpen = false"
              >
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>         -->

      </v-sheet>
    </v-col>
  </v-row>
</template>



<script>
import TutorialServices from "../services/tutorialServices";
import LessonServices from "../services/lessonServices";
import CourseServices from "../services/courseServices";


  export default {
    data: () => ({
        focus: '',
      type: 'month',
      typeToLabel: {
        month: 'Month',
        week: 'Week',
        day: 'Day',
        // '4day': '4 Days',
      },
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      mounted () {
      this.$refs.calendar.checkChange()
    },
// ==============Random test data============
events: [],
colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
// ==============end of test data============
      drawer: null,
        items: [
          { title: 'Home', icon: 'mdi-view-dashboard' },
          { title: 'Add Event', icon: 'add_task' },
          { title: 'Edit Event', icon: 'edit' },
          { title: 'Remove Event', icon: 'remove' },
          { title: 'Print', icon: 'print' },
          { title: 'Logout', icon: 'logout' },

        ],
    }),

    mounted () {
        this.$refs.calendar.checkChange()
    },
    methods: {
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

        nativeEvent.stopPropagation()
      },

// ====================Test Data For How Calendar Would Look When Populated====================
// The code here populates the calendar with random events taken from the "Random Test Data" section and 
// randomly assotiates them with time and date. 

    //   updateRange ({ start, end }) {
    //     const events = []

    //     const min = new Date(`${start.date}T00:00:00`)
    //     const max = new Date(`${end.date}T23:59:59`)
    //     const days = (max.getTime() - min.getTime()) / 86400000
    //     const eventCount = this.rnd(days, days + 20)

    //     for (let i = 0; i < eventCount; i++) {
    //       const allDay = this.rnd(0, 3) === 0
    //       const firstTimestamp = this.rnd(min.getTime(), max.getTime())
    //       const first = new Date(firstTimestamp - (firstTimestamp % 900000))
    //       const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
    //       const second = new Date(first.getTime() + secondTimestamp)

    //       events.push({
    //         name: this.names[this.rnd(0, this.names.length - 1)],
    //         start: first,
    //         end: second,
    //         color: this.colors[this.rnd(0, this.colors.length - 1)],
    //         timed: !allDay,
    //       })
    //     }

    //     this.events = events
    //   },
    //   rnd (a, b) {
    //     return Math.floor((b - a + 1) * Math.random()) + a
    //   },
    },
    retrieveCourse() {
      CourseServices.get(this.courseid)
        .then(response => {
          this.course= response.data;
        })
        .catch(e => {
          this.message = e.response.data.message;
        });

    },
    retrieveLessons() {
      TutorialServices.get(this.id)
      .then(response => {
        this.tutorial = response.data;
        LessonServices.getAllLessons(this.id)
        .then(response => {
          this.lessons = response.data
        })
        .catch(e => {
            this.message = e.response.data.message;
        });
      })
      .catch(e => {
        this.message = e.response.data.message;
      });
}
  }
</script>