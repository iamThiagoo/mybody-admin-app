<template>
  <section class="container-sm mr-10">
    <div class="flex justify-between relative mt-2">
      <h2 class="text-4xl font-medium text-gray-600">Alunos</h2>

      <div class="w-full flex justify-end gap-x-5">
        <div>
          <div class="relative w-full max-w-sm items-center">
            <Input @keydown="state.dataParam.search = $event.target.value" id="search" type="text"
              placeholder="Buscar por alunos..." class="pl-10 bg-white" />
            <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
              <Search class="size-6 text-muted-foreground" />
            </span>
          </div>
        </div>
        <Button @click="showDialog = !showDialog"
          class="!bg-slate-500 cursor-pointer !px-5 !text-sm !border-0 flex !text-white gap-x-3 hover:opacity-80">
          <Plus class="size-6" />
          Adicionar
        </Button>
      </div>
    </div>

    <div class="mt-10">
      <DataTable :headers="[
        { key: 'id', label: 'ID' },
        { key: 'nome', label: 'Nome' },
        { key: 'email', label: 'email' },
        // { key: 'telefone', label: 'Telefone' },
        // { key: 'cpf', label: 'CPF' },
        { key: 'plano_format', label: 'Plano' },
        { key: 'data_nascimento_format', label: 'Nascimento' },
        { key: 'status_format', label: 'Status' },
        { key: 'created_at_format', label: 'Matrícula' },
      ]" :items="state.alunos" 
      :total-items="state.count"
      :current-page="state.dataParam.page"
      :items-per-page="state.dataParam.limit"
      @onDelete="handleOnDelete"
      @onEdit="handleOnEdit"
      @update:page="state.dataParam.page = $event"
      />
    </div>

    <!-- Insert -->
    <Dialog v-model:visible="showDialog" modal :header="state.selectedItem ? 'Editar Aluno' : 'Criar Aluno'" :style="{ width: '40rem', zIndex: '100' }">
      <AlunosAdd :item="state.selectedItem" @close="showDialog = !showDialog, state.selectedItem = null" @update="async () => {
        await getAlunos();
        showDialog = false;
        state.selectedItem = null
      }" />
    </Dialog>
  </section>
</template>

<script setup lang="ts">

import Input from '@/components/ui/input/Input.vue';
import { Plus, Search } from 'lucide-vue-next';
import Button from '@/components/ui/button/Button.vue';
import { onMounted, reactive, ref, watch } from 'vue';
import { getPagination, remove } from '@/api/alunos';
import Dialog from 'primevue/dialog';
import DataTable from '@/components/app/data-table/DataTable.vue';
import { toast } from 'vue-sonner';
import AlunosAdd from '@/components/app/dialog/forms/AlunosAdd.vue';
import type { Aluno } from '@/utils/@types/aluno';

const showDialog = ref(false);
const state = reactive({
  loading: false,
  alunos: [] as Aluno[],
  count: null as any,
  selectedItem:  null,
  dataParam: {
    page: 1,
    limit: 10,
    search: null
  }
})

watch(() => state.dataParam, async () => {
  await getAlunos()
}, { deep: true })

const handleOnEdit = async (item: any) => {
  state.selectedItem = item;
  showDialog.value = true;
}

const handleOnDelete = async (item: any) => {
  try {
    await remove(item.id);
    toast.success('Aluno excluído com sucesso!');
    await getAlunos();
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Erro ao excluir aluno.';
    toast.error(message);
    console.error(error);
  }
}

const getAlunos = async () => {
  const response = await getPagination(state.dataParam);
  state.alunos = formatData(response.data);
  console.log(state.alunos)
  state.count = response.count;
}

const formatData = (data: any[]) => {
  return data.map((item) => {
    return {
      ...item,
      data_matricula_format: new Date(item.data_matricula).toLocaleDateString('pt-BR'),
      data_nascimento_format: new Date(item.data_nascimento).toLocaleDateString('pt-BR'),
      created_at_format: new Date(item.created_at).toLocaleDateString('pt-BR'),
      status_format: item.status === 'ativo' ? 'Ativo' : 'Inativo',
      plano_format: item.plano.nome
    }
  })
}

onMounted(async () => {
  try {
    await getAlunos()
  } catch (error) {
    console.log(error)
  } finally {
    state.loading = true;
  }
})

</script>