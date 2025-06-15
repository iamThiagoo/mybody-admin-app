<template>
    <section class="container-sm mr-10">
        <div class="flex justify-between relative mt-2">
            <h2 class="text-4xl font-medium text-gray-600">Treinos</h2>

            <div class="w-full flex justify-end gap-x-5">
                <div>
                    <div class="relative w-full max-w-sm items-center">
                        <Input id="search" type="text" placeholder="Buscar por aluno..." class="pl-10 bg-white" />
                        <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
                        <Search class="size-6 text-muted-foreground" />
                        </span>
                    </div>
                </div>
                <Button class="!bg-slate-500 cursor-pointer !px-5 !text-sm !border-0 flex !text-white gap-x-3 hover:opacity-80">
                    <Plus class="size-6" />
                    Adicionar
                </Button>
            </div>
        </div>

        <div class="mt-10">
            <DataTable :value="students" stripedRows tableStyle="min-width: 50rem">
                <Column field="code" header="Code"></Column>
                <Column field="name" header="Name"></Column>
                <Column field="category" header="Category"></Column>
                <Column field="quantity" header="Quantity"></Column>
            </DataTable>
        </div>
    </section>
</template>

<script setup lang="ts">

import Input from '@/components/ui/input/Input.vue';
import { Plus, Search } from 'lucide-vue-next';
import Button from '@/components/ui/button/Button.vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

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