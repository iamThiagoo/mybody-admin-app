<template>
  <form @submit.prevent="onSubmit" class="space-y-8 max-w-2xl mx-auto py-1">
    <FormField v-slot="{ componentField }" name="aluno_id" :validate-on-blur="false">
      <FormItem>
        <FormLabel>Aluno <span class="text-red-500 -ml-1">*</span></FormLabel>
        <FormControl>
          <Select v-bind="componentField">
            <SelectTrigger class="w-full">
              <SelectValue placeholder="Selecione um aluno" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem v-for="aluno in state.alunos" :value="String(aluno.id)">{{ aluno.nome }}</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="instrutor_id" :validate-on-blur="false">
      <FormItem>
        <FormLabel>Instrutor <span class="text-red-500 -ml-1">*</span></FormLabel>
        <FormControl>
          <Select v-bind="componentField">
            <SelectTrigger class="w-full">
              <SelectValue placeholder="Selecione um instrutor" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem v-for="instrutor in state.instrutores" :value="String(instrutor.id)">{{ instrutor.nome }}</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-6">
        <FormField v-slot="{ componentField }" name="peso" :validate-on-blur="false">
          <FormItem>
            <FormLabel>Peso <span class="text-red-500 -ml-1">*</span></FormLabel>
            <FormControl>
              <Input v-bind="componentField" type="number" step="0.01" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>

      <div class="col-span-6">
        <FormField v-slot="{ componentField }" name="altura" :validate-on-blur="false">
          <FormItem>
            <FormLabel>Altura <span class="text-red-500 -ml-1">*</span></FormLabel>
            <FormControl>
              <Input v-bind="componentField" type="number" step="0.01" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>

      <div class="col-span-6">
        <FormField v-slot="{ componentField }" name="imc" :validate-on-blur="false">
          <FormItem>
            <FormLabel>IMC <span class="text-red-500 -ml-1">*</span></FormLabel>
            <FormControl>
              <Input v-bind="componentField" type="number" step="0.01" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
      
      <div class="col-span-6">
        <FormField v-slot="{ componentField }" name="percentual_gordura" :validate-on-blur="false">
          <FormItem>
            <FormLabel>Percentual de Gordura <span class="text-red-500 -ml-1">*</span></FormLabel>
            <FormControl>
              <Input v-bind="componentField" type="number" step="0.01" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
    </div>

    <FormField v-slot="{ componentField }" name="observacoes" :validate-on-blur="false">
      <FormItem>
        <FormLabel>Observações (Opcional)</FormLabel>
        <FormControl>
          <Textarea v-bind="componentField" rows="3" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <div class="flex justify-end items-center gap-x-6">
      <button type="button" class="cursor-pointer" @click="$emit('close')">
        Cancelar
      </button>
      <Button class="!px-6 bg-gray-600 cursor-pointer" type="submit">
        <Save class="size-5" />
        {{ props.item?.id ? 'Atualizar' : 'Salvar' }}
      </Button>
    </div>
  </form>
</template>


<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { toast } from 'vue-sonner'
import Input from '@/components/ui/input/Input.vue'
import Button from '@/components/ui/button/Button.vue'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Save } from 'lucide-vue-next'
import { getPagination as getAlunosPagination } from '@/api/alunos'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { onMounted, reactive } from 'vue'
import type { AvaliacaoFisica } from '@/utils/@types/avaliacoes'
import type { Aluno } from '@/utils/@types/aluno'
import type { Instrutor } from '@/utils/@types/instrutores'
import { getPagination as getInstrutoresPagination } from '@/api/instrutores'
import Textarea from '@/components/ui/textarea/Textarea.vue'
import { create, update } from '@/api/avaliacoes-fisicas'

const props = defineProps<{
  item: AvaliacaoFisica | null
}>()

const state = reactive({
  alunos: [] as Aluno[],
  instrutores: [] as Instrutor[],
})

const emit = defineEmits(['update', 'close']);

const formSchema = z.object({
  aluno_id: z.string().min(1, 'Selecione um aluno'),
  instrutor_id: z.string().min(1, 'Selecione um instrutor'),
  peso: z.coerce.number().positive('Peso inválido'),
  altura: z.coerce.number().positive('Altura inválida'),
  imc: z.coerce.number().min(0, 'IMC inválido'),
  percentual_gordura: z.coerce.number().min(0, 'Percentual inválido'),
  observacoes: z.string().optional(),
});

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(formSchema),
  initialValues: {
    aluno_id: props.item?.aluno?.id ? String(props.item.aluno.id) : '',
    instrutor_id: props.item?.instrutor_id ? String(props.item.instrutor_id) : '',
    peso: props.item?.peso || 0,
    altura: props.item?.altura || 0,
    imc: props.item?.imc || 0,
    percentual_gordura: props.item?.percentual_gordura || 0,
    observacoes: props.item?.observacoes || '',
  }
})

const onSubmit = handleSubmit(async (values) => {
  try {
    if (props.item?.id) {
      await update(props.item?.id, values);
      toast.success('Avaliação editada com sucesso!');
    } else {
      await create(values);
      toast.success('Avaliação salva com sucesso!');
    }

    emit('update');
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Erro ao enviar formulário.';
    toast.error(message);
    console.error(error);
  }
});

const getAlunos = async () => {
  try {
    const response = await getAlunosPagination({
      limit: 100,
      page: 1,
      search: null
    });

    state.alunos = response.data;

  } catch (error: any) {
    const message = error?.response?.data?.message || 'Erro ao enviar formulário.';
    toast.error(message);
    console.error(error);
  }
}

const getInstrutores = async () => {
  try {
    const response = await getInstrutoresPagination({
      limit: 100,
      page: 1,
      search: null
    });

    state.instrutores = response.data;

  } catch (error: any) {
    const message = error?.response?.data?.message || 'Erro ao enviar formulário.';
    toast.error(message);
    console.error(error);
  }
}

onMounted(async () => {
  await getAlunos()
  await getInstrutores()
})
</script>