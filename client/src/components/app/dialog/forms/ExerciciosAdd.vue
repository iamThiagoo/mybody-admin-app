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
          <Textarea v-bind="componentField" rows="3" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="grupo_muscular" :validate-on-blur="false">
      <FormItem>
        <FormLabel>Grupo Muscular <span class="text-red-500 -ml-1">*</span></FormLabel>
        <FormControl>
          <Input v-bind="componentField" type="grupo_muscular" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="equipamento" :validate-on-blur="false">
      <FormItem>
        <FormLabel>Equipamento <span class="text-red-500 -ml-1">*</span></FormLabel>
        <FormControl>
          <Input v-bind="componentField" type="text" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="grupo_muscular" :validate-on-blur="false">
      <FormItem>
        <FormLabel>Grupo Muscular <span class="text-red-500 -ml-1">*</span></FormLabel>
        <FormControl>
          <Input v-bind="componentField" type="text" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-6">
        <FormField v-slot="{ componentField }" name="nivel_dificuldade" :validate-on-blur="false">
        <FormItem>
          <FormLabel>Nível de Dificuldade</FormLabel>
          <FormControl>
            <Select v-bind="componentField">
              <SelectTrigger class="w-full">
                <SelectValue placeholder="Selecione um nível" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Iniciante">Iniciante</SelectItem>
                  <SelectItem value="Intermediário">Intermediário</SelectItem>
                  <SelectItem value="Avançado">Avançado</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      </div>

      <div class="col-span-6">
        <FormField v-slot="{ componentField }" name="duracao_minutos" :validate-on-blur="false">
          <FormItem>
            <FormLabel>Duração (minutos)</FormLabel>
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
import { create, update } from '@/api/exercicios'
import Textarea from '@/components/ui/textarea/Textarea.vue'
import type { Exercicio } from '@/utils/@types/exercicios'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const props = defineProps<{
  item: Exercicio | null
}>()

const emit = defineEmits(['update', 'close']);

const formSchema = z.object({
  nome: z.string().min(1, 'Nome obrigatório'),
  descricao: z.string().optional(),
  grupo_muscular: z.string().min(1, 'Grupo muscular obrigatório'),
  equipamento: z.string().min(1, 'Equipamento obrigatório'),
  nivel_dificuldade: z.enum(['Iniciante', 'Intermediário', 'Avançado'], {
    errorMap: () => ({ message: 'Selecione um nível válido' })
  }), 
  duracao_minutos: z
    .number({ invalid_type_error: 'Duração deve ser um número' })
    .min(1, 'Duração mínima de 1 minuto'),
})

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(formSchema),
  initialValues: {
    nome: props.item?.nome || '',
    descricao: props.item?.descricao || '',
    grupo_muscular: props.item?.grupo_muscular || '',
    equipamento: props.item?.equipamento || '',
    nivel_dificuldade: props.item?.nivel_dificuldade || 'Iniciante',
    duracao_minutos: props.item?.duracao_minutos || 1,
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