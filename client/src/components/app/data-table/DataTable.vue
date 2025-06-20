<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th v-for="(header, headerIndex) in headers" :key="headerIndex" class="px-6 py-3">
            {{ header.label }}
          </th>
          <th class="px-6 py-3">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in items" :key="rowIndex"
          class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
          <td v-for="(header, headerIndex) in headers" :key="headerIndex" class="px-6 py-4">
            {{ row[header.key] ?? '-' }}
          </td>
          <td class="px-6 py-4 flex items-center gap-x-6">
            <slot name="actions" :row="row">
              <button @click="$emit('onEdit', row)"
                class="cursor-pointer flex items-center gap-x-2 font-medium text-sky-600 dark:text-sky-500 hover:underline">
                <SquarePen class="size-5" />
                Editar
              </button>
              <AlertDialog class="z-100">
                <AlertDialogTrigger
                  class="cursor-pointer flex items-center gap-x-2 font-medium text-red-600 dark:text-red-500 hover:underline">
                  <Trash2 class="size-5" />
                  Excluir
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta ação não pode ser desfeita. Isso excluirá permanentemente o dado dos nossos servidores.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction @click="$emit('onDelete', row)" class="bg-red-700 hover:bg-red-600 transition-all cursor-pointer">Sim, continuar</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="flex items-center justify-between mt-2">
    <div class="flex items-center mt-5 justify-between">
      <p class="text-sm flex items-center text-gray-500 dark:text-gray-400">
        Exibindo {{ items.length }} registros de {{ totalItems }}
      </p>
    </div>

    <nav class="flex justify-end mt-4" aria-label="Paginação">
      <ul class="inline-flex -space-x-px text-sm">
        <li>
          <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1" class="pagina-btn rounded-s-lg">
            Anterior
          </button>
        </li>

        <li v-for="page in totalPages" :key="page">
          <button @click="goToPage(page)" :class="['pagina-btn', { 'active': page === currentPage }]">
            {{ page }}
          </button>
        </li>

        <li>
          <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages"
            class="pagina-btn rounded-r-lg">
            Próximo
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { SquarePen, Trash2 } from 'lucide-vue-next';
import { computed } from 'vue';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

const props = defineProps<{
  headers: { key: string; label: string }[]
  items: Record<string, any>[]
  actions?: (row: Record<string, any>) => string
  currentPage: number
  totalItems: number
  itemsPerPage: number
}>()

const emit = defineEmits<{
  (e: 'update:page', value: number): void,
  (e: 'onEdit', row: Record<string, any>): void,
  (e: 'onDelete', row: Record<string, any>): void,
}>()

const totalPages = computed(() =>
  Math.ceil(props.totalItems / props.itemsPerPage)
)

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    emit('update:page', page)
  }
}

</script>