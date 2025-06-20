<template>
  <section class="container-sm mr-10">
    <div class="flex justify-between relative mt-2">
      <h2 class="text-4xl font-medium text-gray-600">Planos</h2>

      <div class="w-full flex justify-end gap-x-5">
        <div>
          <div class="relative w-full max-w-sm items-center">
            <Input @keydown="state.dataParam.search = $event.target.value" id="search" type="text"
              placeholder="Buscar por plano..." class="pl-10 bg-white" />
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
        { key: 'descricao', label: 'Descrição' },
        { key: 'preco_format', label: 'Preço' },
        { key: 'duracao_dias', label: 'Duração (dias)' }
      ]" :items="state.planos" 
      :total-items="state.count"
      :current-page="state.dataParam.page"
      :items-per-page="state.dataParam.limit"
      @onDelete="handleOnDelete"
      @onEdit="handleOnEdit"
      @update:page="state.dataParam.page = $event"
      />
    </div>

    <!-- Insert -->
    <Dialog v-model:visible="showDialog" modal :header="state.selectedItem ? 'Editar Plano' : 'Criar Plano'" :style="{ width: '40rem', zIndex: '100' }">
      <PlanosAdd :item="state.selectedItem" @close="showDialog = !showDialog, state.selectedItem = null" @update="async () => {
        await getPlanos();
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
import { getPagination, remove } from '@/api/planos';
import Dialog from 'primevue/dialog';
import DataTable from '@/components/app/data-table/DataTable.vue';
import PlanosAdd from '@/components/app/dialog/forms/PlanosAdd.vue';
import { toast } from 'vue-sonner';

const showDialog = ref(false);
const state = reactive({
  loading: false,
  planos: [] as any[],
  count: null as any,
  selectedItem:  null,
  dataParam: {
    page: 1,
    limit: 10,
    search: null
  }
})

watch(() => state.dataParam, async () => {
  await getPlanos()
}, { deep: true })

const handleOnEdit = async (item: any) => {
  state.selectedItem = item;
  showDialog.value = true;
}

const handleOnDelete = async (item: any) => {
  try {
    await remove(item.id);
    toast.success('Plano excluído com sucesso!');
    await getPlanos();
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Erro ao excluir plano.';
    toast.error(message);
    console.error(error);
  }
}

const getPlanos = async () => {
  const response = await getPagination(state.dataParam);
  state.planos = formatData(response.data);
  state.count = response.count;
}

const formatData = (data: any[]) => {
  return data.map((item) => {
    return {
      ...item,
      preco_format: new Intl.NumberFormat('pt-BR', {
        style: 'currency', currency: 'BRL'
      }
      ).format(item.preco),
    }
  })
}

onMounted(async () => {
  try {
    await getPlanos()
  } catch (error) {
    console.log(error)
  } finally {
    state.loading = true;
  }
})

</script>