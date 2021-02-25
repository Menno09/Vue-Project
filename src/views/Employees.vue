<template>
  <div class="container">
    <GoBack />
    <div class="small-container">
      <h1>Employees</h1>
      <button type="button" class="btn" @click="showModal">Open Modal!</button>
      <p v-if="success" class="success-message">
        ✅ Employee successfully added
      </p>
      <modal
        v-show="isModalVisible"
        @close="closeModal"
        @add:employee="addEmployee"
      />
      <employee-table
        :employees="employees"
        @delete:employee="deleteEmployee"
        @edit:employee="editEmployee"
      />
    </div>
  </div>
</template>

<script>
import EmployeeTable from "@/components/EmployeeTable.vue";

import GoBack from "@/components/GoBack";
import Modal from "@/components/Modal.vue";

export default {
  name: "Invoices",
  components: {
    EmployeeTable,
    GoBack,
    Modal,
  },
  data() {
    return {
      employees: [],
      isModalVisible: false,
    };
  },
  mounted() {
    this.getEmployees();
  },

  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    async addEmployee(employee) {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
          {
            method: "POST",
            body: JSON.stringify(employee),
            headers: { "Content-type": "application/json; charset=UTF-8" },
          }
        );
        console.log(response.status);
        const data = await response.json();
        this.employees = [...this.employees, data];
        this.close();
      } catch (error) {
        console.error(error);
      }
    },
    async getEmployees() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const data = await response.json();
        this.employees = data;
      } catch (error) {
        console.error(error);
      }
    },
    async editEmployee(id, updatedEmployee) {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${id}`,
          {
            method: "PUT",
            body: JSON.stringify(updatedEmployee),
            headers: { "Content-type": "application/json; charset=UTF-8" },
          }
        );
        const data = await response.json();
        this.employees = this.employees.map((employee) =>
          employee.id === id ? data : employee
        );
      } catch (error) {
        console.error(error);
      }
    },
    async deleteEmployee(id) {
      try {
        await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
          method: "DELETE",
        });
        this.employees = this.employees.filter(
          (employee) => employee.id !== id
        );
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style>
button {
  background: #009435;
  border: 1px solid #009435;
}
</style>
