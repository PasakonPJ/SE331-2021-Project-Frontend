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
              <Form @submit="handleRegister" :validation-schema="schema">
                <div v-if="!successful">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="username">Username</label>
                        <Field
                          name="username"
                          type="text"
                          class="form-control"
                        />
                        <ErrorMessage name="username" class="error-feedback" />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="password">Password</label>
                        <Field
                          name="password"
                          type="password"
                          class="form-control"
                        />
                        <ErrorMessage name="password" class="error-feedback" />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="firstname">Firstname</label>
                        <Field
                          name="firstname"
                          type="text"
                          class="form-control"
                        />
                        <ErrorMessage name="firstname" class="error-feedback" />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="lastname">Lastname</label>
                        <Field
                          name="lastname"
                          type="text"
                          class="form-control"
                        />
                        <ErrorMessage name="lastname" class="error-feedback" />
                      </div>
                    </div>
                  </div>
                  <div class="form-group" id="text">
                    <label for="email">Email</label>
                    <Field name="email" type="email" class="form-control" />
                    <ErrorMessage name="email" class="error-feedback" />
                  </div>
                  <label for="image">Image</label>
                  <UploadImages @changed="handleImages" name="imageUrl" :max="1"/>

                  <br />
                  <div class="form-group" id="Button">
                    <button
                      type="submit"
                      class="btn btn-outline-info btn-block"
                      :disabled="loading"
                    >
                      <span
                        v-show="loading"
                        class="spinner-border spinner-border-sm"
                      ></span>
                      Sign Up
                    </button>
                  </div>
                </div>
              </Form>

              <div
                v-if="message"
                class="alert"
                :class="successful ? 'alert-success' : 'alert-danger'"
              >
                {{ message }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <br />
  <br />
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import UploadImages from "vue-upload-drop-images";
// eslint-disable-next-line
import AuthService from "@/services/AuthService.js";
// import api from "@/services/patient_api.js";
export default {
  name: "Register",
  components: {
    UploadImages,
    Form,
    Field,
    ErrorMessage,
  },
  inject: ["Global_Store"],
  // eslint-disable-next-line
  data() {
    const schema = yup.object().shape({
      firstname: yup
        .string()
        .required("Username is required!")
        .min(3, "Must be at least 3 characters!")
        .max(20, "Must be maximum 20 characters!"),
      lastname: yup
        .string()
        .required("Username is required!")
        .min(3, "Must be at least 3 characters!")
        .max(20, "Must be maximum 20 characters!"),
      username: yup
        .string()
        .required("Username is required!")
        .min(3, "Must be at least 3 characters!")
        .max(20, "Must be maximum 20 characters!"),
      email: yup
        .string()
        .required("Email is required!")
        .email("Email is invalid!")
        .max(50, "Must be maximum 50 characters!"),
      password: yup
        .string()
        .required("Password is required!")
        .min(6, "Must be at least 6 characters!")
        .max(40, "Must be maximum 40 characters!"),
      imageurl: yup.string(),
    });

    return {
      successful: false,
      loading: false,
      message: "",
      schema,
      imageurl: "",
      files: [],
    };
  },
  mounted() {
    // if (this.GStore.currentUser) {
    // this.$router.push('/list')
    // }
  },
  methods: {
    // eslint-disable-next-line

    handleRegister(user) {
      // console.log(user)
      Promise.all(
        this.files.map((file) => {
          console.log(file);
          return AuthService.uploadFile(file);
        })
      ).then((response) => {
        user.imageurl = response.map((r) => r.data);
        user.imageurl = user.imageurl[0];
        console.log(user.imageurl);
        AuthService.saveUser(user)
          .then(() => {
            this.message = "";
            this.successful = true;
            this.loading = true;
            this.$router.push("/login");
          })
          .catch(() => {
            this.$router.push("NetworkError");
          });
      });
    },
    handleImages(files) {
      this.files = files;
    },
  },
};
</script>

<style scoped>
#text {
  padding: 0px 100px 0px 100px;
}
#text2 {
  padding: 50px;
}
.register {
  background: url("https://raw.githubusercontent.com/PasakonPJ/picture/master/hero-bg.jpg");
  margin-top: 3%;
  background-repeat: no-repeat;
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
