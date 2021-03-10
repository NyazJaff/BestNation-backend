<template>
  <div>
    <b-alert
      :show="dismissCountDown"
      dismissible
      fade
      variant="success"
      @dismiss-count-down="countDownChanged"
      ><strong>Saved!</strong> you can create a new one now!
    </b-alert>
    <b-form @submit="onSubmit" v-if="show">
      <div>
        <b-form-group
          id="input-group-1"
          label="Title:"
          label-for="input-1"
          description="This title will be displayed on the app"
        >
          <b-form-input
            id="input-1"
            v-model="form.name"
            type="text"
            placeholder="Enter title"
            required
          ></b-form-input>
        </b-form-group>
      </div>

      <div>
        <b-form-group id="input-group-2" label="MP3 URL:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.mp3URL"
            type="url"
            placeholder="Enter MP3 URL"
            required
          ></b-form-input>
        </b-form-group>
      </div>

      <div>
        <b-form-group id="input-group-2" label="PDF URL:" label-for="input-2">
          <b-form-input
            id="input-2"
            type="url"
            v-model="form.pdfURL"
            placeholder="Enter PDF URL"
          ></b-form-input>
        </b-form-group>
      </div>

      <b-form-group
        label="Creaing?"
        class="mb-5 bold"
        v-slot="{ ariaDescribedby }"
      >
        <b-form-radio-group
          id="radio-group-2"
          v-model="form.type"
          :aria-describedby="ariaDescribedby"
          name="radio-sub-component"
          required
        >
          <b-form-radio value="PARENT">Folder</b-form-radio>
          <b-form-radio value="RECORD">Record</b-form-radio>
        </b-form-radio-group>
      </b-form-group>
      <b-button type="submit" variant="primary">Save</b-button>
    </b-form>
  </div>
</template> 


<script>
import { createUser, updateUser, getUser } from "@/firebase";
export default {
  watch: {},
  async mounted() {
    const currentRecord = await getUser("sd");
    console.log(currentRecord.name);
    this.form.name = currentRecord.name;
  },
  setup() {
    const update = async () => {
      await updateUser("2AvgYE0eW3CoUdhNQSOT", { ...this.form });
      this.form.name = "";
      this.form.email = "";
    };

    return { update };
  },

  name: "HelloWorld",
  data() {
    return {
      dismissSecs: 3,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      option_type: "Lecture",

      form: {
        name: "",
        mp3URL: "",
        parentId: "0",
        pdfURL: "",
        type: "",
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
      createUser(this.form);
      this.showAlert();
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
  },
};
</script>