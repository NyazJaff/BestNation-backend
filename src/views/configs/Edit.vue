<template>
  <div class="mx-auto w-50 inline">
    <b-alert
      :show="dismissCountDown"
      dismissible
      fade
      variant="success"
      @dismiss-count-down="countDownChanged"
      ><strong>Saved!</strong> Update done!
    </b-alert>
    <b-form @submit="onSubmit" v-if="show">

		<div>
        <b-form-group id="input-group-2" label="Title:" label-for="title">
          <b-form-input
            id="title"
            type="text"
            v-model="form.title"
            placeholder="Enter title"
          ></b-form-input>
        </b-form-group>
      </div>
	  <div>
        <b-form-group id="input-group-2" label="url:" label-for="url">
          <b-form-input
            id="url"
            type="url"
            v-model="form.url"
            placeholder="Enter url"
          ></b-form-input>
        </b-form-group>
      </div>


      <div>
        <b-form-group id="input-group-2" label="Key:" label-for="key">
          <b-form-input
            id="key"
            type="text"
            v-model="form.key"
            placeholder="Enter Key"
          ></b-form-input>
        </b-form-group>
      </div>
	  <div>
        <b-form-group id="input-group-2" label="Value:" label-for="value">
          <b-form-input
            id="value"
            type="text"
            v-model="form.value"
            placeholder="Enter value"
          ></b-form-input>
        </b-form-group>
      </div>


      <b-button type="submit" variant="primary">Update</b-button>
    </b-form>
  </div>
</template> 

<script>
import { updateRecord, getById, configsCollection  } from "@/firebase";
export default {
  props: ['parentId'],
  async mounted() {
    const currentRecord = await getById(configsCollection, this.parentId);
    this.form = currentRecord;
  },
  setup() {
  },
  data() {
    return {
      dismissSecs: 3,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      option_type: "Config",

      form: {
        key: "",
        value: "",
        title: "",
		url: "",
      },
      show: true,
    };
  },
  methods: {
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
    onSubmit(event) {
      event.preventDefault();
      updateRecord(configsCollection, this.parentId, this.form);
      this.showAlert();
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
  },
};
</script>