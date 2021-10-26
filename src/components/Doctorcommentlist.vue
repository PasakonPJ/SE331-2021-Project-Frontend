<template>
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We"
    crossorigin="anonymous"
  />
  <ul style="list-style-type: none">
    <li>
      <b> The Doctor Topic:</b>{{ com.topic }}
      <br />
      <b> From doctor:</b>{{ com.id }}
      <br />
      <b> Recommend:</b>{{ com.recommend }}
      <br />
      <br>
    </li>
    <li v-if="isEdit">
      <div class="form-group row" id="topic">
        <label class="col col-form-label">Topic:</label>
        <input type="text" class="form-control" v-model="topic" />
      </div>
      <div class="form-group row" id="topic">
        <label class="col col-form-label">Recommend:</label>
        <textarea type="text" class="form-control" v-model="recommend" />
      </div>
    </li>
    <br />

    <li v-if="isDoctor">
      <div class="container">
        <div class="row">
          <div v-if="button" class="col-md-6">
            <button
              @Click="onEdit"
              type="button"
              class="btn btn-outline-info"
            >
              Edit
            </button>
          </div>
          <div v-if="!button" class="col-md-6">
            <button
              @Click="editComment"
              type="button"
              class="btn btn-outline-info"
            >
              Confirm
            </button>
          </div>
          <div v-if="button" class="col-md-6">
            <button
              @Click="deleteComment"
              type="button"
              class="btn btn-outline-info"
            >
              Delete 
            </button>
          </div>
          <div v-if="!button" class="col-md-6">
            <button
              @Click="onEdit"
              type="button"
              class="btn btn-outline-info"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import AuthService from "@/services/AuthService.js";
import PatientService from "@/services/patient_api.js";
// import { watchEffect } from "@vue/runtime-core";

export default {
  props: {
    com: {
      type: Array,
      required: true,
    },
    patient: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isEdit: false,
      button: true,
      topic: null,
      recommend: null
    };
  },
  computed: {
    currentUser() {
      return localStorage.getItem("user");
    },
    isAdmin() {
      return AuthService.hasRoles("ROLE_ADMIN");
    },
    isDoctor() {
      return AuthService.hasRoles("ROLE_DOCTOR");
    },
    isPatient() {
      return AuthService.hasRoles("ROLE_PATIENT");
    },
  },
  methods: {
    deleteComment() {
      PatientService.Delete_comment(this.com.id).then(() => {
        this.$router.go();
      });
    },
    onEdit() {
      this.isEdit = !this.isEdit
      this.button = !this.button
    },
    confirm() {},
    editComment() {
      PatientService.editComment(this.com.id, this.topic, this.recommend)
      .then(() => {
          this.$router.go();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style scoped>
button {
  width: 100%;
  border: 1px;
  border: 1px solid rgb(10, 60, 84);
}
/* #Button {
  padding: 0px,10px,0px,10px;
} */
</style>
