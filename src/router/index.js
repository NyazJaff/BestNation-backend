import Vue from "vue";
import VueRouter from "vue-router";
import AllTexts from "../views/texts/Texts.vue";
import EditText from "../views/texts/EditText.vue";
import AllLectures from "../views/lectures/Lectures";
import EditLectures from "../views/lectures/Edit.vue";
import AllBooks from "../views/books/Books.vue";
import EditBooks from "../views/books/Edit.vue";
import EditConfigs from "../views/configs/Edit.vue";
import AllConfigs from "../views/configs/Configs.vue";

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)


Vue.use(VueRouter);

const routes = [
  {
    path: "/texts/:parentId?",
    name: "All Texts",
    component: AllTexts,
    props: true,
    meta: { title: 'Add Record' } 
  },
  {
    path: '/edit_text/:parentId?',
    name: 'Edit Text',
    component: EditText,
    props: true
  },

  {
    path: "/lectures/:parentId?",
    name: "All Lectures",
    component: AllLectures,
    props: true,
    meta: { title: 'All Lectures' } 
  },
  {
    path: '/edit/:parentId?',
    name: 'Edit Lecture',
    component: EditLectures,
    props: true
  },
  
  {
    path: "/books/:parentId?",
    name: "All Books",
    component: AllBooks,
    props: true,
    meta: { title: 'All Books' } 
  },
  {
    path: '/books/edit/:parentId?',
    name: 'Edit Books',
    component: EditBooks,
    props: true
  },

  {
    path: "/configs",
    name: "All Configs",
    component: AllConfigs,
    props: true,
    meta: { title: 'All Configs' } 
  },
  {
    path: '/configs/edit/:parentId?',
    name: 'Edit Configs',
    component: EditConfigs,
    props: true
  },
  
//   {
//     path: "/about",
//     name: "About",
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () =>
//       import(/* webpackChunkName: "about" */ "../views/About.vue")
//   }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // e.g., if we have `/some/deep/nested/route` and `/some`, `/deep`, and `/nested` have titles,
  // `/nested`'s will be chosen.
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document (page) title to that value.
  if(nearestWithTitle) document.title = nearestWithTitle.meta.title;

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

  // Skip rendering meta tags if there are none.
  if(!nearestWithMeta) return next();

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags.map(tagDef => {
    const tag = document.createElement('meta');

    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key]);
    });

    // We use this to track which meta tags we create so we don't interfere with other ones.
    tag.setAttribute('data-vue-router-controlled', '');

    return tag;
  })
  // Add the meta tags to the document head.
  .forEach(tag => document.head.appendChild(tag));

  next();
});


export default router;
