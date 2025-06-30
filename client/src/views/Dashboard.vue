<template>
  <section class="container-sm mr-10">
    <div class="relative mt-2 mb-8">
      <h2 class="text-4xl font-medium text-gray-600 w-full">Dashboard</h2>
      <p class="text-gray-500 mt-2">Visão geral do desempenho da academia</p>
    </div>

    <!-- Estatísticas Gerais -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
      <div class="bg-white p-6 rounded-2xl shadow">
        <h3 class="text-lg font-semibold text-gray-700 mb-4">Novos Alunos x Cancelamentos</h3>
        <Chart type="bar" :data="chartData" :options="chartOptions" class="h-72" />
      </div>

      <div class="bg-white p-6 rounded-2xl shadow">
        <h3 class="text-lg font-semibold text-gray-700 mb-4">Receita Mensal</h3>
        <Chart type="line" :data="revenueData" :options="revenueOptions" class="h-72" />
      </div>
    </div>

    <!-- Distribuição e Instrutores -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
      <div class="bg-white p-6 rounded-2xl shadow">
        <h3 class="text-lg font-semibold text-gray-700 mb-4">Distribuição de Planos</h3>
        <Chart type="pie" :data="planData" :options="planOptions" class="h-64" />
      </div>

      <div class="bg-white p-6 rounded-2xl shadow md:col-span-1 lg:col-span-2">
        <h3 class="text-lg font-semibold text-gray-700 mb-4">Aulas por Instrutor</h3>
        <Chart type="bar" :data="instructorData" :options="instructorOptions" class="h-64" />
      </div>
    </div>

    <!-- Feedback -->
    <div class="bg-white p-6 rounded-2xl shadow mb-10">
      <h3 class="text-lg font-semibold text-gray-700 mb-4">Satisfação dos Alunos</h3>
      <Chart type="radar" :data="feedbackData" :options="feedbackOptions" class="h-96" />
    </div>
  </section>
</template>


<script setup lang="ts">
import Chart from 'primevue/chart';
import { ref } from 'vue';

const chartData = ref({
  labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
  datasets: [
    {
      label: 'Novos Alunos',
      backgroundColor: '#42A5F5',
      data: [50, 75, 150, 120, 180, 130]
    },
    {
      label: 'Cancelamentos',
      backgroundColor: '#FF6384',
      data: [10, 20, 30, 25, 15, 10]
    }
  ]
});

const chartOptions = ref({
  responsive: true,
  plugins: {
    legend: {
      labels: {
        color: '#374151'
      }
    }
  },
  scales: {
    x: {
      ticks: { color: '#374151' },
      grid: { color: '#e5e7eb' }
    },
    y: {
      ticks: { color: '#374151' },
      grid: { color: '#e5e7eb' }
    }
  }
});

const feedbackData = ref({
  labels: ['Atendimento', 'Limpeza', 'Equipamentos', 'Aulas', 'Ambiente'],
  datasets: [
    {
      label: 'Nota média',
      data: [4.5, 4.2, 4.0, 4.6, 4.3],
      backgroundColor: 'rgba(34,197,94,0.2)',
      borderColor: '#22c55e',
      pointBackgroundColor: '#22c55e'
    }
  ]
});

const feedbackOptions = ref({
  responsive: true,
  scales: {
    r: {
      angleLines: { color: '#e5e7eb' },
      pointLabels: { color: '#374151' },
      ticks: { color: '#374151', backdropColor: '#fff' }
    }
  }
});

const instructorData = ref({
  labels: ['Carlos', 'Ana', 'Felipe', 'Juliana'],
  datasets: [
    {
      label: 'Aulas no mês',
      data: [45, 38, 50, 30],
      backgroundColor: '#6366f1'
    }
  ]
});

const instructorOptions = ref({
  indexAxis: 'y',
  responsive: true,
  plugins: {
    legend: { display: false }
  },
  scales: {
    x: { ticks: { color: '#374151' }, grid: { color: '#e5e7eb' } },
    y: { ticks: { color: '#374151' }, grid: { color: '#e5e7eb' } }
  }
});

const planData = ref({
  labels: ['Mensal', 'Trimestral', 'Semestral', 'Anual'],
  datasets: [
    {
      data: [300, 120, 90, 60],
      backgroundColor: ['#3b82f6', '#facc15', '#34d399', '#f87171']
    }
  ]
});

const planOptions = ref({
  plugins: {
    legend: {
      position: 'bottom',
      labels: { color: '#374151' }
    }
  }
});

const revenueData = ref({
  labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
  datasets: [
    {
      label: 'Receita Mensal (R$)',
      data: [12000, 15000, 18000, 17000, 19000, 21000],
      fill: false,
      borderColor: '#10b981',
      tension: 0.4
    }
  ]
});

const revenueOptions = ref({
  responsive: true,
  plugins: {
    legend: {
      labels: { color: '#374151' }
    }
  },
  scales: {
    x: { ticks: { color: '#374151' }, grid: { color: '#e5e7eb' } },
    y: { ticks: { color: '#374151' }, grid: { color: '#e5e7eb' } }
  }
});

</script>
