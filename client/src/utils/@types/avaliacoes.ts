export type AvaliacaoFisica = {
  id: number;
  aluno_id?: number;
  instrutor_id?: number;
  data_avaliacao?: string;
  peso?: number;
  altura?: number;
  imc?: number;
  percentual_gordura?: number;
  observacoes?: string;
  created_at?: string;
  updated_at?: string;
  aluno?: {
    id?: number;
    nome?: string;
    email?: string;
    telefone?: string;
    cpf?: string;
    data_nascimento?: string;
    genero?: 'M' | 'F' | string;
    data_matricula?: string;
    plano_id?: number;
    status?: string;
    created_at?: string;
    updated_at?: string;
  };
  instrutor: {
    id: number;
    nome: string;
    email?: string;
    telefone?: string;
    especialidade?: string;
    cref?: string;
    created_at: string;
    updated_at: string;
  };
};
