<template>
  <br /><br />
  <div class="body">
    <div class="profile-card">
      <div class="card-header">
        <div class="pic">
          <img src="../assets/logo.png" alt="" />
        </div>
        <div class="name">
          {{ Global_Store.currentUser.firstname }}
          {{ Global_Store.currentUser.lastname }}
        </div>
        <div class="desc">DOCTOR</div>
      </div>
      <div class="card-footer">
        <div class="vaccines">
          <div class="item">
            <span>{{ lengthPt }}</span>
            Patient
          </div>
          <!-- <div class="border"></div>
                  <div class="item">
                      <span>2</span>
                      Second dose
                  </div> -->
        </div>
      </div>
    </div>
  </div>
  <br /><br />
  <div class="col">
    <Card v-for="patient in patientdoc" :key="patient.id" :patient="patient" />
  </div>
  <div class="footer">
    <footerLayout />
  </div>
</template>
<script>
import api from "@/services/patient_api.js";
import { watchEffect } from "@vue/runtime-core";
import footerLayout from "@/views/footer.vue";
import Card from "@/components/GetPatientsDoctor.vue";
import Global_Store from "@/store";
export default {
  inject: ["Global_Store"],
  name: "Profile",
  components: {
    footerLayout,
    Card,
  },
  data() {
    return {
      patientdoc: null,
      lengthPt: null,
    };
  },
  created() {
    watchEffect(() => {
      console.log(Global_Store.currentUser.username);
      api
        .doctor_patientt(Global_Store.currentUser.username)
        .then((response) => {
          this.patientdoc = response.data[0].patients;
          this.lengthPt = this.patientdoc.length;
          console.log(this.patientdoc);
          this.total_page = response.headers["x-total-count"];
        })
        .catch((error) => {
          console.log(error);
        });
    });
  },
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
}

.body {
  height: auto;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-card {
  width: 600px;
  text-align: center;
  border-radius: 8px;
  overflow: hidden;
}

.card-header {
  background: #2c3a47;
  padding: 60px 40px;
}

.pic {
  display: inline-block;
  padding: 8px;
  background: linear-gradient(130deg, #74b9ff, #e66767);
  margin: auto;
  border-radius: 50%;
  background-size: 200% 200%;
  animation: animated-gradient 2s linear infinite;
}

@keyframes animated-gradient {
  25% {
    background-position: left bottom;
  }
  50% {
    background-position: right bottom;
  }
  70% {
    background-position: right top;
  }
  100% {
    background-position: left top;
  }
}
.pic img {
  display: block;
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.name {
  color: #f2f2f2;
  font-size: 28px;
  font-weight: 600;
  margin: 10px 0;
}

.desc {
  font-size: 18px;
  color: #e66767;
}

.card-footer {
  background: #f4f4f4;
  padding: 60px 10px;
}

.vaccines {
  display: flex;
  align-items: center;
}

.item {
  flex: 1;
  text-transform: uppercase;
  font-size: 13px;
  color: #e66767;
}

.item span {
  display: block;
  color: #2c3a47;
  font-size: 30px;
}

.border {
  width: 1px;
  height: 30px;
  background: #bbb;
}

.footer {
  position: relative;
  margin-top: 0;
  bottom: 0px;
  width: 100%;
}
.list {
  display: flex;
  align-items: center;
  flex-direction: column;
}
#next {
  text-align: right;
}
#prev {
  text-align: left;
}
.page_change {
  display: flex;
  width: 290px;
}
.page_change a {
  flex: 1;
  text-decoration: none;
  color: black;
}
</style>
