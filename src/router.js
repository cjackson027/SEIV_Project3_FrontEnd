import Vue from 'vue'
import Router from 'vue-router'

import Login from "./views/Login.vue"
import CourseCatalog from "./views/CourseCatalog.vue"
import ViewCourse from "./views/ViewCourse.vue"
import ChairCourseList from "./views/ChairCourseList.vue"
import ViewChairCourse from "./views/ViewChairCourse.vue"
import EditChairCourseList from "./views/EditChairCourseList.vue"
import AddChairCourseList from "./views/AddChairCourseList.vue"
import AddSection from "./views/AddSection.vue"
import EditSection from "./views/EditSection.vue"
import ViewOfficeHours from "./views/ViewOfficeHours.vue"
import EditOfficeHours from "./views/EditOfficeHours.vue"
import AddOfficeHours from "./views/AddOfficeHours.vue"
import ViewSemesterSchedule from "./views/ViewSemesterSchedule.vue"

Vue.use(Router)

const router =  new Router({
  mode: 'hash',
  linkExactActiveClass: 'active',
  base:
//    process.env.NODE_ENV === 'development'? "/" : "/tutorScheduling/", - for AWS
    process.env.NODE_ENV === 'development'? "/" : "/",
  routes: [
    {
      path: "/",
      name: "login",
      component: Login
    },
    {
      path: "/courses",
      name: "courses",
      component: CourseCatalog
    },
    {
      path: "/viewcourse/:id",
      name: "viewcourse",
      component: ViewCourse,
      props: true
    },
    {
      path: "/courselists",
      name: "courselists",
      component: ChairCourseList
    },
    {
      path: "/viewchaircourse/:courseId",
      name: "viewchaircourse",
      component: ViewChairCourse,
      props: true
    },
    {
      path: "/editcourses/:id",
      name: "editcourse",
      component: EditChairCourseList,
      props: true
    },
    {
      path: "/addcourses",
      name: "addcourse",
      component: AddChairCourseList
    },
    {
      path: "/addSection/:courseId",
      name: "addSection",
      component: AddSection,
      props: true
    },
    {
      path: "/editSection/:courseId/:sectionId",
      name: "editSection",
      component: EditSection,
      props: true
    },
    {
      path: "/viewoffice",
      name: "viewoffice",
      component: ViewOfficeHours,
    },
    {
      path: "/addoffice/:id",
      name: "addoffice",
      component: AddOfficeHours,
      props: true
    },
    {
      path: "/editoffices/:id",
      name: "editoffice",
      component: EditOfficeHours,
      props: true
    }, 
    {
      path: "/calendar",
      name: "calendar",
      component: ViewSemesterSchedule
    },

  ]
})

export default router;
