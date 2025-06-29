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

    <FormField v-slot="{ componentField }" name="email" :validate-on-blur="false">
      <FormItem>
        <FormLabel>Email <span class="text-red-500 -ml-1">*</span></FormLabel>
        <FormControl>
          <Input v-bind="componentField" type="email" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="especialidade" :validate-on-blur="false">
      <FormItem>
        <FormLabel>Especialidade <span class="text-red-500 -ml-1">*</span></FormLabel>
        <FormControl>
          <Input v-bind="componentField" type="text" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-6">
        <FormField v-slot="{ componentField }" name="telefone" :validate-on-blur="false">
          <FormItem>
            <FormLabel>Telefone <span class="text-red-500 -ml-1">*</span></FormLabel>
            <FormControl>
              <Input v-bind="componentField" type="tel" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>

      <div class="col-span-6">
        <FormField v-slot="{ componentField }" name="cref" :validate-on-blur="false">
          <FormItem>
            <FormLabel>CREF <span class="text-red-500 -ml-1">*</span></FormLabel>
            <FormControl>
              <Input v-bind="componentField" type="text" />
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
import { create, update } from '@/api/instrutores'
import type { Instrutor } from '@/utils/@types/instrutores'

const props = defineProps<{
  item: Instrutor | null
}>()

const emit = defineEmits(['update', 'close']);

const formSchema = z.object({
  nome: z.string().min(1, 'Nome obrigatório'),
  email: z.string().min(1, 'E-mail é obrigatório'),
  especialidade: z.string().min(1, 'Especialidade é obrigatório'),
  telefone: z.string().min(1, 'Telefone é obrigatório'),
  cref: z.string().min(1, 'CREF é obrigatório'),
})

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(formSchema),
  initialValues: {
    nome: props.item?.nome || '',
    email: props.item?.email || '',
    especialidade: props.item?.especialidade || '',
    telefone: props.item?.telefone || '',
    cref: props.item?.cref || '',
  }
})

const onSubmit = handleSubmit(async (values) => {
  try {
    if (props.item?.id) {
      await update(props.item?.id, values);
      toast.success('Instrutor editado com sucesso!');
    } else {
      await create(values);
      toast.success('Instrutor salvo com sucesso!');
    }

    emit('update');
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Erro ao enviar formulário.';
    toast.error(message);
    console.error(error);
  }
});
</script>