<template>
    <main class="h-[calc(100vh)] bg-lime-50/80">
        <Navbar />
    
        <div class="relative flex pt-16 lg:pl-60">
            <div class="flex-shrink-0">
                <MenuBar />
            </div>
        </div>

        <section class="content-container">
            <slot></slot>
        </section>
    </main>
</template>

<script setup lang="ts">
import MenuBar from '@/components/app/menubar/MenuBar.vue';
import Navbar from '@/components/app/navbar/Navbar.vue';
</script>