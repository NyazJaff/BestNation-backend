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
      <!-- 
      <div>
        <b-form-group id="input-group-2" label="MP3 URL:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.mp3URL"
            type="url"
            placeholder="Enter MP3 URL"
    
          ></b-form-input>
        </b-form-group>
      </div> -->

      <div>
        <b-form-group id="input-group-2" label="PDF URL:" label-for="pdf-url">
          <b-form-input
            id="pdf-url"
            type="url"
            v-model="form.pdfURL"
            placeholder="Enter PDF URL"
            :required="form.type == 'RECORD'"
          ></b-form-input>
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
import { createBook, booksCollection } from "@/firebase";
export default {
  props: {
    parentId: String
  },
  setup() {},

  name: "BookCreate",
  data() {
    return {
      dismissSecs: 3,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      option_type: "Book",

      form: {
        name: "",
        mp3URL: "",
        parentId: this.parentId,
        pdfURL: "",
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
      createBook(booksCollection, this.form);
      this.showAlert();
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    }
  }
};
</script>
