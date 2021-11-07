<template>
  <div class="card mt-4">
    <h3>{{ currentRecordTitle }}</h3>
    <table class="table m-0">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Name</th>
          <th scope="col">PDF URL</th>
          <th scope="col">Order</th>
          <th scope="col"></th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in books" :key="book.id">
          <td>
            <div class="h6 mb-0">
              <b-icon-folder v-if="book.type == 'PARENT'"></b-icon-folder>
              <b-icon-patch-minus v-else></b-icon-patch-minus>
            </div>
          </td>
          <td>{{ book.name }}</td>
          <td>{{ book.pdfURL }}</td>
          <td>{{ book.order }}</td>
          <td>
            <router-link v-if="book.type == 'PARENT'" :to="`/books/${book.id}`">
              <b-button variant="outline-primary">
                <b-icon icon="arrow-right"></b-icon>
              </b-button>
            </router-link>
          </td>
          <td>
            <router-link :to="`/books/edit/${book.id}`">
              <b-button variant="outline-primary">
                <b-icon icon="pencil"></b-icon
              ></b-button>
            </router-link>
          </td>
          <td>
            <b-button @click="deleteBook(book.id)" variant="outline-primary">
              <b-icon variant="danger" scale="1.5" icon="trash"></b-icon>
            </b-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { useLoadBooks, deleteBook, getBook } from "@/firebase";

export default {
  methods: {},
  props: {
    parentId: String
  },
  data() {
    return {
      currentRecordTitle: ""
    };
  },
  async mounted() {
    const current_record = (await getBook(this.parentId)) || "";
    this.currentRecordTitle = current_record.name;
  },
  setup(props) {
    const books = useLoadBooks(props.parentId);
    return { books, deleteBook };
  }
};
</script>
