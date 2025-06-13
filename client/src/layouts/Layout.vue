<template>
    <main class="h-[calc(100vh)] bg-lime-50/60">
        <Navbar :is-open="isSidebarVisible" @close-sidebar="toggleSidebar" />

        <div class="relative flex pt-16 lg:pl-60">
            <div class="flex-shrink-0">
                <transition name="fade-left">
                    <MenuBar v-if="isSidebarVisible" />
                </transition>
            </div>
        </div>

        <section class="content-container relative top-[60px]" :class="isSidebarVisible ? 'ml-80' : 'ml-10'">
            <router-view />
        </section>
    </main>
</template>

<script setup lang="ts">
import MenuBar from '@/components/app/menubar/MenuBar.vue';
// @ts-ignore
import Navbar from '@/components/app/navbar/Navbar.vue';
import { ref, onMounted, watch } from 'vue';

const isSidebarVisible = ref(false);

watch(isSidebarVisible, (newValue) => {
  localStorage.setItem('sidebar', newValue.toString());
});

const toggleSidebar = () => {
  isSidebarVisible.value = !isSidebarVisible.value;
};

onMounted(() => {
  const sidebarIsOpen = localStorage.getItem('sidebar');
  if (sidebarIsOpen !== null) {
    isSidebarVisible.value = sidebarIsOpen === 'true';
  } else {
    isSidebarVisible.value = true;
  }
});

</script>

<style lang="css" scoped>
.fade-left-enter-active,
.fade-left-leave-active {
    transition: all 0.3s ease;
}

.fade-left-enter-from,
.fade-left-leave-to {
    opacity: 0;
    transform: translateX(-20px);
}

.fade-left-enter-to,
.fade-left-leave-from {
    opacity: 1;
    transform: translateX(0);
}
</style>