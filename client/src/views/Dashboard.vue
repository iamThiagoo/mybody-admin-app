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

import Input from '@/components/ui/input/Input.vue';
import { Plus, Search } from 'lucide-vue-next';
import Button from '@/components/ui/button/Button.vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import AlunosStatsCard from '@/components/app/cards/AlunosStatsCard.vue';

const students = [
  {
      code: '1',
      name: 'João',
      category: 'A',
      quantity: '10',
  },
  {
      code: '2',
      name: 'Maria',
      category: 'B',
      quantity: '20',
  },
  {
      code: '3',
      name: 'Pedro',
      category: 'C',
      quantity: '30',
  }
]

</script>