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
        <FormLabel>E-mail <span class="text-red-500 -ml-1">*</span></FormLabel>
        <FormControl>
          <Input v-bind="componentField" type="email" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="plano_id" :validate-on-blur="false">
      <FormItem>
        <FormLabel>Plano <span class="text-red-500 -ml-1">*</span></FormLabel>
        <FormControl>
          <Select v-bind="componentField">
            <SelectTrigger class="w-full">
              <SelectValue placeholder="Selecione um plano" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem v-for="plano in state.planos" :value="String(plano.id)">{{ plano.nome }}</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
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
        <FormField v-slot="{ componentField }" name="cpf" :validate-on-blur="false">
          <FormItem>
            <FormLabel>CPF <span class="text-red-500 -ml-1">*</span></FormLabel>
            <FormControl>
              <Input v-bind="componentField" type="text" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>

      <div class="col-span-6 mt-4">
        <FormField v-slot="{ componentField }" name="data_nascimento" :validate-on-blur="false">
          <FormItem>
            <FormLabel>Data de Nascimento <span class="text-red-500 -ml-1">*</span></FormLabel>
            <FormControl>
              <Input v-bind="componentField" type="date" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>

      <div class="col-span-6 mt-4">
        <FormField v-slot="{ componentField }" name="genero" :validate-on-blur="false">
        <FormItem>
            <FormLabel>Gênero <span class="text-red-500 -ml-1">*</span></FormLabel>
            <FormControl>
              <Select v-bind="componentField">
                <SelectTrigger class="w-full">
                  <SelectValue placeholder="Selecione um gênero" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="M">Masculino</SelectItem>
                    <SelectItem value="F">Feminino</SelectItem>
                    <SelectItem value="O">Outro</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
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
import { create, update } from '@/api/alunos'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { onMounted, reactive } from 'vue'
import type { PlanoItem } from '@/utils/@types/plano'
import { getPagination } from '@/api/planos'
import type { Aluno } from '@/utils/@types/aluno'

const props = defineProps<{
  item: Aluno | null
}>()

const state = reactive({
  planos: [] as PlanoItem[],
})

const emit = defineEmits(['update', 'close']);

const formSchema = z.object({
  nome: z.string().min(1, 'Nome obrigatório'),
  email: z.string().email('E-mail inválido'),
  plano_id: z.string().min(1, 'Selecione um plano'),
  telefone: z.string().min(10, 'Telefone obrigatório'),
  cpf: z.string().min(11, 'CPF obrigatório'),
  data_nascimento: z.string().min(1, 'Data de nascimento obrigatória'),
  genero: z.enum(['M', 'F', 'O'], {
    errorMap: () => ({ message: 'Selecione um gênero' }),
  }),
});

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(formSchema),
  initialValues: {
    nome: props.item?.nome || '',
    email: props.item?.email || '',
    plano_id: props.item?.plano_id ? String(props.item.plano_id) : '',
    telefone: props.item?.telefone || '',
    cpf: props.item?.cpf || '',
    data_nascimento: props.item?.data_nascimento || '',
    genero: props.item?.genero || undefined,
  }
})

const onSubmit = handleSubmit(async (values) => {
  try {
    if (props.item?.id) {
      await update(props.item?.id, values);
      toast.success('Aluno editado com sucesso!');
    } else {
      await create(values);
      toast.success('Aluno salvo com sucesso!');
    }

    emit('update');
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Erro ao enviar formulário.';
    toast.error(message);
    console.error(error);
  }
});

const getPlanos = async () => {
  try {
    const response = await getPagination({
      limit: 100,
      page: 1,
      search: null
    });

    state.planos = response.data;

  } catch (error: any) {
    const message = error?.response?.data?.message || 'Erro ao enviar formulário.';
    toast.error(message);
    console.error(error);
  }
}

onMounted(async () => {
  await getPlanos()
})
</script>