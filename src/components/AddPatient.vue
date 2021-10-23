<template>
  <router-link
    class="link"
    :to="{ name: 'PatientDetails', params: { id: patient.id } }"
  >
    <div class="card">
      <div class="card-body">
        <span>
          <strong>{{ patient.name }} {{ patient.surname }}</strong>
        </span>
      </div>
    </div>
  </router-link>
</template>
<style scoped>
.card {
  border: 1px solid black;
  padding: 10px;
  margin: 10px 42px;
  cursor: grab;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.link {
  color: #2c3e50;
  text-decoration: none;
}
</style>
<script>
export default {
  props: {
    patient: {
      type: Object,
      required: true,
    },
  },
};
</script>
