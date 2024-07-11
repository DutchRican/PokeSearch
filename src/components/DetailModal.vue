<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';


defineProps(['pokemon']);
defineEmits(['closeModal']);

onMounted(() => {
  document.body.classList.add("modal-open");
});

onUnmounted(() => {
  document.body.classList.remove("modal-open");
});

</script>

<template>
  <div class="modal-overlay">
    <div class="modal">
      <div v-if="$slots.header" class="modal-header">
        <slot name="header" />
      </div>
      <div class="modal-body">
        <slot />
      </div>
      <div class="modal-footer"><button @click="$emit('closeModal')" class="close-btn">Close</button></div>
    </div>
  </div>
</template>

<style>
.modal-overlay {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: #cececeb5;

}

.modal {
  background-color: #fff;
  border: 2px solid #a2c3e3;
  border-radius: 10px;
  text-align: center;
  padding: 20px 40px;
  min-width: 250px;
  display: flex;
  flex-direction: column;
}

.modal-footer {
  background-color: #fff;
  display: flex;
  justify-content: end;
}

.close-btn {}
</style>