<template>
  <div :key="parentId" class="mx-auto w-100">
    <div class="mx-auto w-50 inline">
      <BookCreate :parentId="parentId || '0'" />
    </div>
    <div class="mx-auto w-75"><BookList :parentId="parentId || '0'" /></div>
  </div>
</template>

<script>
import BookCreate from "../../components/books/BookCreate.vue";
import BookList from "../../components/books/BookList.vue";

export default {
  watch: {},
  data() {
    return {};
  },

  props: ["parentId"],
  name: "Books",
  components: { BookCreate, BookList }
};
</script>
