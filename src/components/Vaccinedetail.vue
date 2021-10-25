<template>
  <div class="card" v-for="x in patients" :key="x.id">
    <div class="card-body">
      <ul id="hide">
        <li><b>Vaccine_name:</b> {{ x[0].vaccine.vaccineName }}</li>
        <li><b>Appointment:</b> {{ x[0].vaccine.vaccinatedDate }}</li>
        <!-- <li ><b>Total_dose:</b> {{ xcount++ }}</li> -->
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ["patients"],
};
</script>
<style scoped>
#hide {
  list-style: none;
  text-align: left;
}
.card {
  margin-top: 0.2cm;
  transition: 0.3s;
  display: flex;
  border-radius: 1px black;
  flex-direction: column;
  /* align-items: center; */
}
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
</style>
