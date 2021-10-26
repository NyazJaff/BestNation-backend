<template>
  <div class="card mt-4">
	  
    <h3>{{  }}</h3>
    <table class="table m-0">
      <thead>
        <tr>
          <th scope="col">Key</th>
		  <th scope="col">Data</th>
		  <th scope="col">Edit</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="config in configs" :key="config.id">
          <td>{{ config.id }} </td>
		  <td>{{ config.url }}  {{ config.key }} | {{ config.title }} {{ config.value }}</td>
          <td>
            <router-link :to="`/configs/edit/${config.id}`">
              <b-button variant="outline-primary">
                <b-icon icon="pencil"></b-icon
              ></b-button>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
import { getAllConfigs } from "@/firebase";

export default {
  methods: {
  },
  props: {
  },
  data() {
    return {
     
    };
  },
  async mounted() {

  },
  setup() {
    const configs = getAllConfigs();
    return { configs };
  },
};
</script>
