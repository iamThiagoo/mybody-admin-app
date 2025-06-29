<template>
  <section class="container-sm mr-10">
    <div class="flex justify-between relative mt-2">
      <h2 class="text-4xl font-medium text-gray-600">Instrutores</h2>

      <div class="w-full flex justify-end gap-x-5">
        <div>
          <div class="relative w-full max-w-sm items-center">
            <Input @keydown="state.dataParam.search = $event.target.value" id="search" type="text"
              placeholder="Buscar por instrutores..." class="pl-10 bg-white" />
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
        { key: 'email', label: 'E-mail' },
        { key: 'especialidade', label: 'Especialidade' },
        { key: 'cref', label: 'CREF' },
        { key: 'created_at_format', label: 'Data de Cadastro' },
      ]" :items="state.instrutores" 
      :total-items="state.count"
      :current-page="state.dataParam.page"
      :items-per-page="state.dataParam.limit"
      @onDelete="handleOnDelete"
      @onEdit="handleOnEdit"
      @update:page="state.dataParam.page = $event"
      />
    </div>

    <!-- Insert -->
    <Dialog v-model:visible="showDialog" modal :header="state.selectedItem ? 'Editar Instrutor' : 'Criar Instrutor'" :style="{ width: '40rem', zIndex: '100' }">
      <InstrutoresAdd :item="state.selectedItem" @close="showDialog = !showDialog, state.selectedItem = null" @update="async () => {
        await getInstrutores();
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
import { getPagination, remove } from '@/api/instrutores';
import Dialog from 'primevue/dialog';
import DataTable from '@/components/app/data-table/DataTable.vue';
import { toast } from 'vue-sonner';
import InstrutoresAdd from '@/components/app/dialog/forms/InstrutoresAdd.vue';

const showDialog = ref(false);
const state = reactive({
  loading: false,
  instrutores: [] as any[],
  count: null as any,
  selectedItem:  null,
  dataParam: {
    page: 1,
    limit: 10,
    search: null
  }
})

watch(() => state.dataParam, async () => {
  await getInstrutores()
}, { deep: true })

const handleOnEdit = async (item: any) => {
  state.selectedItem = item;
  showDialog.value = true;
}

const handleOnDelete = async (item: any) => {
  try {
    await remove(item.id);
    toast.success('Instrutor excluído com sucesso!');
    await getInstrutores();
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Erro ao excluir plano.';
    toast.error(message);
    console.error(error);
  }
}

const getInstrutores = async () => {
  const response = await getPagination(state.dataParam);
  state.instrutores = formatData(response.data);
  state.count = response.count;
}

const formatData = (data: any[]) => {
  return data.map((item) => {
    return {
      ...item,
      created_at_format: new Date(item.created_at).toLocaleDateString('pt-BR'),
    }
  })
}

onMounted(async () => {
  try {
    await getInstrutores()
  } catch (error) {
    console.log(error)
  } finally {
    state.loading = true;
  }
})

</script>