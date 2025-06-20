<template>
  <aside
    class="fixed left-0 z-[100] flex flex-col justify-between h-[calc(100vh-96px)] pt-5 overflow-y-auto bg-white transition-all duration-300 w-screen sm:w-[280px] p-4 opacity-100 top-[96px] space-y-2">
    <ul class="space-y-2">
      <div v-for="item in menuItems" :key="item.label" class="flex items-center">
        <MenuItem v-bind="item" />
      </div>
    </ul>

    <button
      @click="() => toast.info('Essa feature ainda não foi implementada!')"
      class="exit-btn cursor-pointer hover:bg-lime-100 bg-white rounded-sm border-1 border-gray-300 text-sm flex items-center justify-center py-2 gap-x-2">
      <lord-icon src="https://cdn.lordicon.com/ircnfpus.json" target=".exit-btn" trigger="loop-on-hover" class="size-6"></lord-icon>
      Sair
    </button>
  </aside>
</template>

<script setup lang="ts">
import { menuItems } from '@/utils/sidebar/menu-item'
import MenuItem from './MenuItem.vue';
import { toast } from 'vue-sonner';
</script>