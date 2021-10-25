<template>
  <router-link
    class="link"
    :to="{ name: 'PatientDetails', params: { id: pd.id } }"
  >
    <div class="card">
      <div class="card-body">
        <span>
          <p>{{ pd.firstname }} {{ pd.lastname }}</p>
        </span>
      </div>
    </div>
  </router-link>
</template>
<style scoped>
.card {
  border: 1px solid black;
  width: max-content;
  padding: 30px;
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
    pd: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      dose: [
        "Not yet",
        "Got the first dose",
        "Got the second dose",
        "Got the third dose",
        "Got the forth dose",
      ],
    };
  },
};
</script>
