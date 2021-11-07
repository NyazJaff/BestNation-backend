<template>
  <div class="card mt-4">
    <h3>{{ currentRecordTitle }}</h3>
    <table class="table m-0">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Name</th>
          <th scope="col">MP3 URL</th>
          <th scope="col">Order</th>
          <th scope="col"></th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="lecture in lectures" :key="lecture.id">
          <td>
            <div class="h6 mb-0">
              <b-icon-folder v-if="lecture.type == 'PARENT'"></b-icon-folder>
              <b-icon-patch-minus v-else></b-icon-patch-minus>
            </div>
          </td>
          <td>{{ lecture.name }}</td>
          <td>{{ lecture.mp3URL }}</td>
          <td>{{ lecture.order }}</td>
          <td>
            <router-link
              v-if="lecture.type == 'PARENT'"
              :to="`/lectures/${lecture.id}`"
            >
              <b-button variant="outline-primary">
                <b-icon icon="arrow-right"></b-icon>
              </b-button>
            </router-link>
          </td>
          <td>
            <router-link :to="`/edit/${lecture.id}`">
              <b-button variant="outline-primary">
                <b-icon icon="pencil"></b-icon
              ></b-button>
            </router-link>
          </td>
          <td>
            <b-button
              @click="deleteLecture(lecture.id)"
              variant="outline-primary"
            >
              <b-icon variant="danger" scale="1.5" icon="trash"></b-icon>
            </b-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { useLoadLectures, deleteLecture, getLecture } from "@/firebase";

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
    const current_record = (await getLecture(this.parentId)) || "";
    this.currentRecordTitle = current_record.name;
  },
  setup(props) {
    const lectures = useLoadLectures(props.parentId);
    return { lectures, deleteLecture };
  }
};
</script>
