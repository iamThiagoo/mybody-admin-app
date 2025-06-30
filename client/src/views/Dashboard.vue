<template>
  <section class="container-sm mr-10">
      <div class="flex justify-between relative mt-2">
          <h2 class="text-4xl font-medium text-gray-600">Dashboard</h2>
      </div>

      <div class="mt-10">
        <AlunosStatsCard />
      </div>
  </section>
</template>

<script setup lang="ts">
import AlunosStatsCard from '@/components/app/cards/AlunosStatsCard.vue';
</script>