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
      <b-form-group label="Creaing?" class="bold" v-slot="{ ariaDescribedby }">
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

      <div v-if="form.type == 'RECORD'">
        <b-form-group id="input-group-2" label="Body:" label-for="input-2">
          <b-form-textarea
            id="input-2"
            v-model="form.body"
            placeholder="Enter body"
            :required="form.type == 'RECORD'"
            rows="8"
          ></b-form-textarea>
        </b-form-group>
      </div>

      <div>
        <b-form-group id="input-group-2" label="order" label-for="order">
          <b-form-input
            id="order"
            :number="true"
            type="number"
            v-model="form.order"
            placeholder="Entre the order it should appear"
          ></b-form-input>
        </b-form-group>
      </div>

      <b-button type="submit" variant="primary">Save</b-button>
    </b-form>
  </div>
</template>

<script>
import { createText } from "@/firebase";
export default {
  props: {
    parentId: String
  },
  setup() {},

  name: "Add",
  data() {
    return {
      dismissSecs: 3,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      option_type: "Texts",

      form: {
        name: "",
        body: "",
        parentId: this.parentId,
        type: "",
        order: 0
      },
      show: true
    };
  },
  methods: {
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
    onSubmit(event) {
      event.preventDefault();
      createText(this.form);
      this.showAlert();
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    }
  }
};
</script>
