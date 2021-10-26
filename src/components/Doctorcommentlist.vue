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
      <b> Recommend:</b>{{ com.recommend }} {{com.id}}
      <br />
    </li>
    <li v-if="!isEdit">
      <div class="form-group row" id="topic">
        <label class="col col-form-label">Topic:</label>
        <input type="text" class="form-control" :value="com.topic" />
      </div>
      <div class="form-group row" id="topic">
        <label class="col col-form-label">Topic:</label>
          <textarea
                    type="text"
                    class="form-control"
                    :value="com.recommend"
                  />
      </div>
    </li>
    <br>
    <li v-if="isDoctor">
      <button @Click="onEdit" v-if="button" type="button" class="btn btn-outline-info">Edit</button>
      <button @Click="editComment" v-if="button" type="button" class="btn btn-outline-info">Confirm</button>
    </li>

    <li v-if="com"><b> The Doctor Topic: </b>{{ com.topic }}</li>
    <li v-if="com"><b> Recommend:</b> {{ com.recommend }}</li>

  </ul>
</template>

<script>
import AuthService from "@/services/AuthService.js";
import PatientService from "@/services/patient_api.js";
export default {
  props: {
    com: {
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
    onEdit() {
      this.isEdit = true;
      this.button = false;
      console.log(this.com.id);
      console.log(this.com.topic);
      console.log(this.com.recommend);
    },
    confirm(){

    },
    editComment() {
      console.log("yo");
      PatientService.editComment(this.com.id, this.com.topic,this.com.recommend)
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