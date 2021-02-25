<template>
  <div class="container">
    <GoBack />
    <h1>Invoices</h1>
    <Customer />
  </div>
</template>

<script>
import GoBack from "@/components/GoBack";
import Customer from "@/components/Custumer";

export default {
  components: {
    GoBack,
    Customer,
  },
};
</script>
