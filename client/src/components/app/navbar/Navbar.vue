<template>
    <div class="dashboard-navbar fixed inset-x-0 top-0 z-[100] w-full bg-lime-400 text-center pt-2 pb-8 text-sm ">
        <div
            class="fixed inset-x-0 z-[9999] h-16 bg-white shadow-sm flex items-center justify-between gap-4 px-6 top-8 rounded-t-xl">
            <div class="flex items-center gap-42">
                <h1>
                    <router-link to="/dashboard" class="cursor-pointer hover:opacity-80 transition-all ml-1 gap-x-1 flex items-center text-xl font-semibold text-lime-900">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="30" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-dumbbell-icon lucide-dumbbell">
                            <path
                                d="M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z" />
                            <path d="m2.5 21.5 1.4-1.4" />
                            <path d="m20.1 3.9 1.4-1.4" />
                            <path
                                d="M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z" />
                            <path d="m9.6 14.4 4.8-4.8" />
                        </svg>
                    </router-link>
                </h1>
                <svg v-if="isOpen" @click="$emit('close-sidebar')" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                    fill="currentColor" class="w-6 h-6 text-[#4B5563] cursor-pointer flex-shrink-0">
                    <path d="M17.5 15v1.666h-15V15h15Zm0-5.834v1.667H10V9.166h7.5Zm0-5.833V5H10V3.333h7.5Z"></path>
                    <path d="M5.497 3.252 6.675 4.43 4.024 7.083l2.651 2.652-1.178 1.178-3.83-3.83 3.83-3.83Z"
                        style="transform-origin: 4.171px 7.0825px; transform: none;"></path>
                </svg>
                <svg v-else @click="$emit('close-sidebar')" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                    class="w-6 h-6 text-[#4B5563] cursor-pointer flex-shrink-0">
                    <path d="M17.5 15v1.666h-15V15h15Zm0-5.834v1.667H10V9.166h7.5Zm0-5.833V5H10V3.333h7.5Z"></path>
                    <path d="M5.497 3.252 6.675 4.43 4.024 7.083l2.651 2.652-1.178 1.178-3.83-3.83 3.83-3.83Z"
                        style="transform-origin: 4.171px 7.0825px; transform: rotate(180deg);"
                        transform-origin="4.171000242233276px 7.082500219345093px"></path>
                </svg>
            </div>

            <div class="flex gap-x-5 items-center cursor-pointer">
                <lord-icon @click="() => toast.info('Essa feature ainda não foi implementada!')" src="https://cdn.lordicon.com/ahxaipjb.json" trigger="hover" class="size-7"></lord-icon>
                <div class="text-sm flex items-center gap-x-2">
                    <img src="/admin.jpeg" class="size-8 rounded-full object-cover" />
                    Admin
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner';

defineProps({
  isOpen: Boolean
});
</script>