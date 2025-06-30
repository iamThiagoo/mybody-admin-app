<template>
  <slot
    :componentField="{
      name: nameRef,
      value,
      onInput: handleChange,
      onBlur: handleBlur,
    }"
    :error="errorMessage"
  />
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'
import { toRef } from 'vue'

const props = defineProps<{
  name: string
}>()

const nameRef = toRef(props, 'name')

const { value, errorMessage, handleChange, handleBlur } = useField(nameRef)
</script>
