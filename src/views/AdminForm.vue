<template>
  <div class="container register">
    <div class="row">
      <div class="col-4 register-left">
        <img src="../assets/chickgoya.jpg" alt="" />
        <h3>Welcome</h3>
        <p>Doctor !!!</p>
      </div>
      <div class="col-4">
        <h1>Add Vaccine</h1>
        <Card
        v-for="patient in patients"
        :key="patient.id"
        :patient="patient"
        >
        </Card>
      </div>
      <div class="col-4">
        <h1>Add Role</h1>
        <Role
        v-for="patient in patients"
        :key="patient.id"
        :patient="patient"
        >
        </Role>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/services/patient_api.js";
import Card from "@/components/AddPatient.vue";
import Role from "@/components/AddRole.vue";
import { watchEffect } from "@vue/runtime-core";
export default {
  name: "Admin",
  components: {
    Card,
    Role
  },
  data() {
    return {
      patients: null,
      total_page: 0,
      size: 6,
      covid: null,
    };
  },
  created() {
    watchEffect(() => {
      api
        .get_all_patient(this.page, this.size)
        .then((response) => {
          this.patients = response.data;
          this.total_page = response.headers["x-total-count"];
        })
        .catch((error) => {
          console.log(error);
        });

      api
        .getData()
        .then((response) => {
          this.covid = response.data;
        })
        .catch((error) => {
          if (error.response && error.response.status == 404) {
            return {
              name: "404Patient",
            };
          } else {
            return {
              name: "network_error",
            };
          }
        });
    });
  },
};
</script>

<style scoped>
#Button{
    padding: 0px 150px 0px 150px;
}
#text{
     padding: 0px 100px 0px 100px;
}
.register {
  background: url("https://raw.githubusercontent.com/PasakonPJ/picture/master/hero-bg.jpg");
  margin-top: 3%;
  padding: 3%;
}
.register-left {
  text-align: center;
  color: #fff;
  margin-top: 4%;
}
.register-left input {
  border: none;
  border-radius: 1.5rem;
  padding: 2%;
  width: 60%;
  background: #f8f9fa;
  font-weight: bold;
  color: #383d41;
  margin-top: 30%;
  margin-bottom: 3%;
  cursor: pointer;
}
.register-right {
  background: #f8f9fa;
  border-top-left-radius: 10% 50%;
  border-bottom-left-radius: 10% 50%;
}
.register-left img {
  margin-top: 15%;
  margin-bottom: 5%;
  width: 75%;
  -webkit-animation: mover 2s infinite alternate;
  animation: mover 1s infinite alternate;
}
@-webkit-keyframes mover {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-20px);
  }
}
@keyframes mover {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-20px);
  }
}
.register-left p {
  font-weight: lighter;
  padding: 12%;
  margin-top: -9%;
}
.register .register-form {
  padding: 10%;
}
.btnRegister {
  float: right;
  margin-top: 10%;
  border: none;
  border-radius: 1.5rem;
  padding: 2%;
  background: #0062cc;
  color: #fff;
  font-weight: 600;
  width: 50%;
  cursor: pointer;
}
.register .nav-tabs {
  margin-top: 3%;
  border: none;
  background: #0062cc;
  border-radius: 1.5rem;
  width: 28%;
  float: right;
}
.register .nav-tabs .nav-link {
  padding: 2%;
  height: 34px;
  font-weight: 600;
  color: #fff;
  border-top-right-radius: 1.5rem;
  border-bottom-right-radius: 1.5rem;
}
.register .nav-tabs .nav-link:hover {
  border: none;
}
.register .nav-tabs .nav-link.active {
  width: 100px;
  color: #0062cc;
  border: 2px solid #0062cc;
  border-top-left-radius: 1.5rem;
  border-bottom-left-radius: 1.5rem;
}
.register-heading {
  text-align: center;
  margin-top: 8%;
  margin-bottom: -15%;
  color: #495057;
}

label {
  display: block;
  margin-top: 10px;
}
.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}
.card {
  background-color: white;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}
.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
.error-feedback {
  color: rgb(8, 114, 167);
}
</style>
