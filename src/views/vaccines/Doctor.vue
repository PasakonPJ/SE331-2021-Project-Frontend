<template>
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We"
    crossorigin="anonymous"
  />
  <Doctorform @comment-submited="addcomment" :patient="patient" />

  <div class="container-fuild">
    <div class="row">
      <div class="col-md-4" v-for="com in comments" :key="com.id">
        <div class="card">
          <div class="card-body">
            <Doctorcommentlist :com="com" :patient="patient" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Doctorform from "@/components/Doctorform.vue";
import Doctorcommentlist from "@/components/Doctorcommentlist.vue";
import { watchEffect } from "@vue/runtime-core";
import api from "@/services/patient_api.js";
import AuthService from "@/services/AuthService.js";
export default {
  name: "Doctorcomment",
  inject: ["Global_Store"],
  props: ["patient"],

  components: {
    Doctorform,
    Doctorcommentlist,
    // Doctorcommentlist,
  },
  data() {
    return {
      comments: [],
      identifind: this.patient.id,
      comments2: [],
    };
  },
  created() {
    watchEffect(() => {
      api
        .get_painet_comment(this.identifind)
        .then((response) => {
          this.comments = response.data;
          console.log(this.comments);
          this.total_page = response.headers["x-total-count"];
        })
        .catch((error) => {
          console.log(error);
        });
    });
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
    addcomment(allcomment) {
      api.save_comment_patient(this.identifind, allcomment).then(() => {
        setTimeout(() => {
          console.log(allcomment);
          this.comments.push(allcomment);
          this.$flashMessage.remove("ko");
        }, 1200);
        this.$flashMessage.show({
          type: "info",
          title: "uploading suggestion",
          text: `we're uploading your suggestion.`,
          contentClass: "text",
          group: "ko",
          image: "https://c.tenor.com/I6kN-6X7nhAAAAAi/loading-buffering.gif",
        });
        window.location.reload();
      });
    },
  },
};
</script>
<style scoped>
.card {
  /* align-items: center; */
  margin-top: 0.2cm;
  transition: 0.3s;
  /* display: flex; */
  border-radius: 1px black;
  flex-direction: column;
  text-align: left;
  /* align-items: center; */
}
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
.col-md-4 {
  margin-top: 0.2cm;
}
</style>
