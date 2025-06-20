<template>
    <Layout />
    <Toaster richColors position="top-center"  />
</template>

<script setup lang="ts">
import Layout from '@/layouts/Layout.vue';
import { Toaster } from 'vue-sonner'
import 'vue-sonner/style.css'
</script>