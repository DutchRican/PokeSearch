<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

defineProps<{ name: String }>();
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
  backdrop-filter: blur(6px);
}

.modal {
  background-color: rgba(182, 146, 218, 0.9);
  backdrop-filter: blur(10);
  border: 2px solid #a2c3e3;
  border-radius: 10px;
  text-align: center;
  padding: 20px 40px;
  min-width: 450px;
  display: flex;
  flex-direction: column;
}

.modal-footer {
  /* background-color: #fff; */
  display: flex;
  justify-content: end;
}

.modal-header {
  align-self: center;
}

.close-btn {
  transition-duration: 0.2s;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  background-color: transparent;
  border: 2px solid #3B4CCA;
}

.close-btn:hover {
  box-shadow: 2px 6px 6px 0 #5160cf, 2px 8px 10px 0 #7480d9;
  border: 2px solid #888fc1;
}
</style>