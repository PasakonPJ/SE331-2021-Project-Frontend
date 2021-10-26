<template>
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We"
    crossorigin="anonymous"
  />
  <ul style="list-style-type: none">
    <li v-if="!isEdit">
      <b> The Doctor Topic:</b>{{ com.topic }}
      <br />
      <!-- <b> From doctor:</b>{{ com.doctor.firstname }} -->
      <br />
      <b> Recommend:</b>{{ com.recommend }}
      <br />
    </li>
    <li v-if="!isEdit">
      <div class="form-group row" id="topic">
        <label class="col col-form-label">Topic:</label>
        <input type="text" class="form-control" :value="com.topic" />
      </div>
      <div class="form-group row" id="topic">
        <label class="col col-form-label">Topic:</label>
        <textarea type="text" class="form-control" :value="com.recommend" />
      </div>
    </li>
    <br />

    <li v-if="isDoctor">
      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <button
              @Click="onEdit"
              v-if="button"
              type="button"
              class="btn btn-outline-info"
            >
              Edit
            </button>
          </div>
          <div class="col-md-4">
            <button
              @Click="editComment"
              v-if="button"
              type="button"
              class="btn btn-outline-info"
            >
              Confirm
            </button>
          </div>
          <div class="col-md-4">
            <button
              @Click="deleteComment"
              v-if="button"
              type="button"
              class="btn btn-outline-info"
            >
              Delete
              <!-- Delete {{com.commentedPatient.id}} -->
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
    };
  },
  // created() {
  //   watchEffect(() => {
  //     PatientService
  //       .get_painet_comment(this.identifind)
  //       .then((response) => {
  //         this.comments = response.data;
  //         this.total_page = response.headers["x-total-count"];
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   });
  // },
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
      PatientService.Delete_comment().then(() => {});
    },
    onEdit() {
      this.isEdit = true;
      this.button = false;
      console.log(this.com.id);
      console.log(this.com.topic);
      console.log(this.com.recommend);
    },
    confirm() {},
    editComment() {
      console.log("yo");
      PatientService.editComment(
        this.com.id,
        this.com.topic,
        this.com.recommend
      )
        .then(() => {
          console.log("yo");
          console.log(this.com.id);
          console.log(this.com.topic);
          console.log(this.com.recommend);
        })
        .catch(() => {
          this.$router.push("NetworkError");
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
