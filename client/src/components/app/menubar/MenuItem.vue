<template>
    <li class="w-full">
        <router-link :to="route" class="link" :class="[
            'flex items-center gap-2 py-0.5 px-3 rounded-md cursor-pointer font-inter text-secondary-content hover:bg-gray-100',
            isActive ? 'bg-lime-100 text-lime-800 font-semibold hover:bg-lime-100' : ''
        ]">
            <div
                class="cursor-pointer select-none p-2 rounded-md transition-colors duration-200 flex items-center justify-center">
                <lord-icon :src="icon" trigger="hover" target=".link" class="size-6"></lord-icon>
            </div>
            <span class="font-inter-tight truncate text-base">
                {{ label }}
            </span>
        </router-link>
    </li>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps<{
    route: string
    label: string
    icon: string
}>()

const currentRoute = useRoute()
const isActive = computed(() => currentRoute.path === props.route || currentRoute.path.startsWith(props.route + '/'))
</script>