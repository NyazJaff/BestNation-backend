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
        <tr v-for="user in users" :key="user.id">
          <td>
            <div class="h6 mb-0">
              <b-icon-folder v-if="user.type == 'PARENT'"></b-icon-folder>
              <b-icon-patch-minus v-else></b-icon-patch-minus>
            </div>
          </td>
          <td>{{ user.name }} </td>
          <td>{{ user.mp3URL }}</td>
          <td>{{ user.order }}</td>
          <td>
            <router-link
              v-if="user.type == 'PARENT'"
              :to="`/lectures/${user.id}`"
            >
              <b-button variant="outline-primary">
                <b-icon icon="arrow-right"></b-icon>
              </b-button>
            </router-link>
          </td>
          <td>
            <router-link :to="`/edit/${user.id}`">
              <b-button variant="outline-primary">
                <b-icon icon="pencil"></b-icon
              ></b-button>
            </router-link>
          </td>
          <td>
            <b-button @click="deleteUser(user.id)" variant="outline-primary">
              <b-icon variant="danger" scale="1.5" icon="trash"></b-icon>
            </b-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
import { useLoadUsers, deleteUser, getUser } from "@/firebase";

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
    const current_record = (await getUser(this.parentId)) || "";
    this.currentRecordTitle = current_record.name;
  },
  setup(props) {
    const users = useLoadUsers(props.parentId);
    return { users, deleteUser };
  },
};
</script>
