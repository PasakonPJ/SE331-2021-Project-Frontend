<template>
  <div class="container register">
    <div class="row">
      <div class="col-md-3 register-left">
        <img src="../assets/chickgoya.jpg" alt="" />
        <h3>Welcome</h3>
        <p>You are 30 seconds away from earning your own money!</p>
      </div>
      <div class="col-md-9 register-right">
        <div class="tab-content" id="myTabContent">
          <div class="row register-form">
            <div class="col-md">
              <img
                id="profile-img"
                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                class="profile-img-card"
              />
              <Form @submit="handleLogin" :validation-schema="schema">
                <div class="form-group" id="text">
                  <label for="username">Username</label>
                  <Field name="username" type="text" class="form-control" />
                  <ErrorMessage name="username" class="error-feedback" />
                </div>
                <div class="form-group" id="text">
                  <label for="password">Password</label>
                  <Field name="password" type="password" class="form-control" />
                  <ErrorMessage name="password" class="error-feedback" />
                </div>
                <br />
                <div class="form-group" id="Button">
                  <button
                    class="btn btn-outline-info btn-block btn-lg"
                    :disabled="loading"
                  >
                    <span
                      v-show="loading"
                      class="spinner-border spinner-border-sm"
                    ></span>
                    <span>Login</span>
                  </button>
                </div>

                <div class="form-group">
                  <div v-if="message" class="alert alert-danger" role="alert">
                    {{ message }}
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import api from "@/services/patient_api.js";
import AuthService from "@/services/AuthService.js";
import Global_Store from "@/store";
import * as yup from "yup";
export default {
  inject: [Global_Store],

  name: "Login",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      username: yup.string().required("Username is required!"),
      password: yup.string().required("Password is required!"),
    });
    return {
      loading: false,
      message: "",
      schema,
      biguser: null,
    };
  },
  methods: {
    handleLogin(user) {
      AuthService.login(user)
        .then((response) => {
          // console.log(response.user.authorities[0]);
          if (response.user.authorities[0] === "ROLE_PATIENT") {
            api
              .patient_login(Global_Store.currentUser.username)
              .then((response) => {
                // console.log(response.data);
                this.biguser = response.data;
                this.$router.push({
                  name: "PatientDetails",
                  params: { id: this.biguser.id },
                });
              });
          } else if (response.user.authorities[0] === "ROLE_DOCTOR") {
            console.log("tood");
            api
              .doctor_login(Global_Store.currentUser.username)
              .then((response) => {
                console.log(response.data);
                this.biguser = response.data;
                Global_Store.doctor = response.data;
                console.log(this.biguser.id);
                this.$router.push({
                  name: "list",
                  params: { id: this.biguser.id },
                });
              });
          } else {
            this.$router.push({ name: "list" });
          }
        })
        .catch(() => {
          this.message = "could not login";
        });
    },
  },
};
</script>

<style scoped>
#text {
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
