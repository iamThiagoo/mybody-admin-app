type Avaliacao = {
  id: number;
  aluno_id: number;
  instrutor_id: number;
  data_avaliacao: string;
  peso: number;
  altura: number;
  imc: number;
  percentual_gordura: number;
  observacoes: string;
  created_at: string;
  updated_at: string;
};

type Plano = {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  duracao_dias: number;
  created_at: string;
  updated_at: string;
};

export type Aluno = {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  data_nascimento: string;
  genero: 'F' | 'M' | 'O' | undefined;
  data_matricula: string;
  plano_id: number;
  status: 'ativo' | 'inativo' | string;
  created_at: string;
  updated_at: string;
  plano: Plano;
  avaliacoes: Avaliacao[];
};
