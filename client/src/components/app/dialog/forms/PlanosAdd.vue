<template>
  <form @submit.prevent="onSubmit" class="space-y-8 max-w-2xl mx-auto py-1">
    <FormField v-slot="{ componentField }" name="nome" :validate-on-blur="false">
      <FormItem>
        <FormLabel>Nome <span class="text-red-500 -ml-1">*</span></FormLabel>
        <FormControl>
          <Input v-bind="componentField" type="text" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="descricao" :validate-on-blur="false">
      <FormItem>
        <FormLabel>Descrição</FormLabel>
        <FormControl>
          <Input v-bind="componentField" type="text" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-6">
        <FormField v-slot="{ componentField }" name="duracao_dias" :validate-on-blur="false">
          <FormItem>
            <FormLabel>Duração (Dias) <span class="text-red-500 -ml-1">*</span></FormLabel>
            <FormControl>
              <Input v-bind="componentField" type="number" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>

      <div class="col-span-6">
        <FormField v-slot="{ componentField }" name="preco" :validate-on-blur="false">
          <FormItem>
            <FormLabel>Preço (R$) <span class="text-red-500 -ml-1">*</span></FormLabel>
            <FormControl>
              <Input v-bind="componentField" type="number" step="0.01" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
    </div>

    <div class="flex justify-end items-center gap-x-6">
      <button type="button" class="cursor-pointer" @click="$emit('close')">
        Cancelar
      </button>
      <Button class="!px-6 bg-gray-600 cursor-pointer" type="submit">
        <Save class="size-5" />
        {{ props.item.id ? 'Atualizar' : 'Salvar' }}
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
import { create, update } from '@/api/planos'

const props = defineProps(['item']);
const emit = defineEmits(['update', 'close']);

const formSchema = z.object({
  nome: z.string().min(1, 'Nome obrigatório'),
  descricao: z.string().optional(),
  duracao_dias: z.number().min(1, 'Duração mínima de 1 dia'),
  preco: z.number().min(0, 'Preço não pode ser negativo')
})

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(formSchema),
  initialValues: {
    nome: props.item.nome,
    descricao: props.item.descricao,
    duracao_dias: props.item.duracao_dias,
    preco: props.item.preco
  }
})

const onSubmit = handleSubmit(async (values) => {
  try {
    if (props.item.id) {
      await update(props.item.id, values);
      toast.success('Plano editado com sucesso!');
    } else {
      await create(values);
      toast.success('Plano salvo com sucesso!');
    }

    emit('update');
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Erro ao enviar formulário.';
    toast.error(message);
    console.error(error);
  }
});
</script>