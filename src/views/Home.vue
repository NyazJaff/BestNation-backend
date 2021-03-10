<template>
  <div :key="parentId" class="mx-auto w-100">
    <div class="mx-auto w-50 inline"><UserCreate :parentId="parentId || '0'"/></div>
    <div class="mx-auto w-75"><UserList :parentId="parentId || '0'"/></div>
  </div>
</template>

<script>
import UserCreate from "@/components/UserCreate.vue";
import UserList from '../components/UserList.vue';

export default {
  props: ['parentId'],
  name: "Home",
  components: { UserCreate, UserList }
};
</script>
