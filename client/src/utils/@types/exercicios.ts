export type Exercicio = {
  id: number
  nome: string
  descricao: string
  grupo_muscular: string
  equipamento: string
  nivel_dificuldade: "Intermediário" | "Avançado" | undefined
  duracao_minutos: number
  created_at: string 
  updated_at: string 
}
