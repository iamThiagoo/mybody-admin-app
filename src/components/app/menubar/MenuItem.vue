<template>
    <li class="w-full">
        <a
            class="link"
            :class="['flex items-center gap-2 py-0.5 px-3 rounded-md cursor-pointer font-inter text-secondary-content hover:bg-gray-100', bgClass]">
            <div
                class="cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center">
                <lord-icon :src="icon" trigger="loop-on-hover" target=".link" class="size-6" :class="colorClass"></lord-icon>
            </div>
            <span class="font-inter-tight truncate text-base" :class="textClass">{{ label }}</span>
        </a>
    </li>
</template>

<script setup lang="ts">
defineProps<{
    label: string
    icon: string
    colorClass?: string
    bgClass?: string
    textClass?: string
}>()
</script>
