<template>
  <div class="card mt-4">
    <h3>{{ currentRecordTitle }}</h3>
    <table class="table m-0">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Name</th>
          <th scope="col">Body</th>
          <th scope="col">Order</th>
          <th scope="col"></th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="text in Texts" :key="text.id">
          <td>
            <div class="h6 mb-0">
              <b-icon-folder v-if="text.type == 'PARENT'"></b-icon-folder>
              <b-icon-patch-minus v-else></b-icon-patch-minus>
            </div>
          </td>
          <td>{{ text.name }} </td>
          <td>{{ text.body }}</td>
          <td>{{ text.order }}</td>
          <td>
            <router-link
              v-if="text.type == 'PARENT'"
              :to="`/texts/${text.id}`"
            >
              <b-button variant="outline-primary">
                <b-icon icon="arrow-right"></b-icon>
              </b-button>
            </router-link>
          </td>
          <td>
            <router-link :to="`/edit_text/${text.id}`">
              <b-button variant="outline-primary">
                <b-icon icon="pencil"></b-icon
              ></b-button>
            </router-link>
          </td>
          <td>
            <b-button @click="deleteText(text.id)" variant="outline-primary">
              <b-icon variant="danger" scale="1.5" icon="trash"></b-icon>
            </b-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
import { useLoadTexts, deleteText, getText } from "@/firebase";

export default {
  props: {
    parentId: String,
  },
  data() {
    return {
      currentRecordTitle: "",
    };
  },
  async mounted() {
    const current_record = (await getText(this.parentId)) || "";
    this.currentRecordTitle = current_record.name;
  },
  setup(props) {
    const Texts = useLoadTexts(props.parentId);
    return { Texts, deleteText };
  },
};
</script>
