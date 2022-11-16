import Vue from 'vue'
import Router from 'vue-router'

import Login from "./views/Login.vue"

import TutorialsList from "./views/TutorialsList.vue"
import EditTutorial from "./views/EditTutorial.vue"
import AddTutorial from "./views/AddTutorial.vue"
import ViewTutorial from "./views/ViewTutorial.vue"
import AddLesson from "./views/AddLesson.vue"
import EditLesson from "./views/EditLesson.vue"
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
      path: "/tutorials",
      name: "tutorials",
      component: TutorialsList
    },
    {
      path: "/edit/:id",
      name: "edit",
      component: EditTutorial,
      props: true
    },
    {
      path: "/add",
      name: "add",
      component: AddTutorial
    },
    {
      path: "/view/:id",
      name: "view",
      component: ViewTutorial,
      props: true
    },
    {
      path: "/addLesson/:tutorialId",
      name: "addLesson",
      component: AddLesson,
      props: true
    },
    {
      path: "/editLesson/:tutorialId/:lessonId",
      name: "editLesson",
      component: EditLesson,
      props: true
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
      props: true
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
    }
  ]
})

export default router;
