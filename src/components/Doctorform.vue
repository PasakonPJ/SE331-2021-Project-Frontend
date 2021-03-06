<template>
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We"
    crossorigin="anonymous"
  />

  <div class="main-body">
    <section id="hero" class="d-flex align-items-center">
      <div class="container">
        <h1>Welcome to Konghospital</h1>
        <h2>
          We are willing to take care of you and advise you on the covid-19
          outbreak and your symptoms.
        </h2>
        <div class="row">
          <div class="col-sm-6">
            <a class="btn-get-started scrollto" id="button1">
              <router-link
                class="link"
                :to="{ name: 'PatientDetails', params: { id } }"
              >
                Details
              </router-link>
            </a>
          </div>
          <div class="col-sm-6">
            <a class="btn-get-started scrollto" id="button2">
              <router-link class="link" :to="{ name: 'Dates', params: { id } }">
                Vaccine
              </router-link>
            </a>
          </div>
        </div>
      </div>
    </section>
    <div class="row gutters-sm" v-if="isDoctor">
      <div class="col-md">
        <div class="card mb-3">
          <div class="card-body">
            <form @submit.prevent="onSubmit">
              <h1 id="toptext">Leave a doctor’s comments</h1>
              <hr />
              <div class="form-group row" id="name">
                <div class="col-sm-2"></div>
                <h3>
                  Dr. {{ patient.doctor.firstname }}
                  {{ patient.doctor.lastname }}
                </h3>
              </div>
              <div class="form-group row" id="topic">
                <div class="col-sm-2"></div>
                <label class="col-sm-2 col-form-label">Topic:</label>
                <div class="col-sm-5">
                  <input type="text" class="form-control" v-model="topic" />
                </div>
              </div>

              <!-- 
              <div class="form-group row" id="name">
                <div class="col-sm-5">
                  <select v-model="doctorid">
                    <option
                      v-for="option in doctors"
                      :value="option.id"
                      :key="option.id"
                    >
                      {{ option.firstname }}
                    </option>
                  </select>
                </div>
              </div> -->

              <div class="form-group row" id="recommend">
                <div class="col-sm-2"></div>
                <label class="col-sm-2 col-form-label">Recommend:</label>
                <div class="col-sm-5">
                  <textarea
                    type="text"
                    class="form-control"
                    v-model="recommend"
                  />
                </div>
              </div>
              <br />
              <div class="row">
                <div class="col-sm-7"></div>
                &nbsp;&nbsp;
                <div class="col-sm-2">
                  <button type="submit" class="btn btn-primary mb-2" >
                    Confirm identity
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AuthService from "@/services/AuthService.js";
import api from "@/services/patient_api.js";
import { watchEffect } from "@vue/runtime-core";
export default {
  props: ["patient"],
  data() {
    return {
      topic: "",
      doctorid: 0,

      review: "",
      recommend: "",
    };
  },

  created() {
    watchEffect(() => {
      api.patient_login();
      api
        .get_Doctors()
        .then((response) => {
          this.doctors = response.data;
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
    onSubmit() {
      if (this.topic === "" || this.recommend === "") {
        alert("Comment is incomplete. Please full");
        return;
      }
      let doctorcomment = {
        id: this.patient.doctor.id,
        topic: this.topic,
        recommend: this.recommend,
      };
      this.$emit("comment-submited", doctorcomment);
      this.topic = "";
      this.recommend = "";
    },
  },
};
</script>
<style scoped>
h3 {
  text-align: right;
  display: inline;
  text-transform: uppercase;
}
.link {
  text-decoration: none;
}
#hero {
  width: 100%;
  height: 90vh;
  background: url("https://raw.githubusercontent.com/PasakonPJ/picture/master/hero-bg.jpg")
    top center;
  background-size: cover;
  position: relative;
  margin-bottom: -200px;
}

#hero .container {
  position: relative;
}

#hero h1 {
  margin: 0;
  -webkit-text-stroke: 1px black;
  font-size: 48px;
  font-weight: 700;
  line-height: 56px;
  text-transform: uppercase;
  color: #f2f2f2;
}

#hero h2 {
  color: #30618c;
  margin: 10px 0 0 0;
  font-size: 24px;
}

#hero .btn-get-started {
  text-decoration: none;
  font-family: "Raleway", sans-serif;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: 1px;
  display: inline-block;
  padding: 12px 35px;
  margin-top: 30px;
  border-radius: 50px;
  transition: 0.5s;
  color: #fff;
  background: #80b5e4;
}

#hero .btn-get-started:hover {
  background: #618cb3;
}

@media (min-width: 1024px) {
  #hero {
    background-attachment: fixed;
  }
}

@media (max-width: 992px) {
  #hero {
    margin-bottom: 0;
    height: 100vh;
  }
  #hero .container {
    padding-bottom: 63px;
  }
  #hero h1 {
    font-size: 28px;
    line-height: 36px;
  }
  #hero h2 {
    font-size: 18px;
    line-height: 24px;
    margin-bottom: 30px;
  }
}

@media (max-height: 500px) {
  #hero {
    height: auto;
  }
}
#topic {
  padding: 0.1cm;
}
#name {
  padding: 0.1cm;
}
#recommend {
  padding: 0.1cm;
}
#toptext {
  margin-top: 0.5cm;
}
</style>
