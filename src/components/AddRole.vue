<template>
  <router-link
    class="link"
    @click="forio2"
    :to="{ name: 'ChangeRole', params: { id: userRole.id } }"
  >
    <div class="card">
      <div class="card-body">
        <span>
          <strong>{{ userRole.firstname }} {{ userRole.lastname }}</strong>
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
    userRole: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    forio2() {
      console.log(this.userRole.id);
    },
  },
};
</script>
