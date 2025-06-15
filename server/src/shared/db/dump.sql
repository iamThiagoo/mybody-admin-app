CREATE TABLE planos (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(500),
    preco DECIMAL(10, 2) NOT NULL,
    duracao_dias INT NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE()
);

CREATE TABLE alunos (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    telefone VARCHAR(20),
    cpf VARCHAR(14) UNIQUE,
    data_nascimento DATE,
    genero VARCHAR(1),
    data_matricula DATE DEFAULT GETDATE(),
    plano_id INT,
    status NVARCHAR(10) DEFAULT 'ativo',
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (plano_id) REFERENCES planos(id)
);

CREATE TABLE instrutores (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nome NVARCHAR(100) NOT NULL,
    email NVARCHAR(100) UNIQUE,
    telefone NVARCHAR(20),
    especialidade NVARCHAR(100),
    cref NVARCHAR(50),
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE()
);

CREATE TABLE avaliacoes_fisicas (
    id INT IDENTITY(1,1) PRIMARY KEY,
    aluno_id INT NOT NULL,
    instrutor_id INT NOT NULL,
    data_avaliacao DATE NOT NULL DEFAULT GETDATE(),
    peso DECIMAL(5,2),
    altura DECIMAL(4,2),
    imc DECIMAL(4,2),
    percentual_gordura DECIMAL(5,2),
    observacoes VARCHAR(MAX),
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_Avaliacao_Aluno FOREIGN KEY (aluno_id) REFERENCES alunos(id),
    CONSTRAINT FK_Avaliacao_Instrutor FOREIGN KEY (instrutor_id) REFERENCES instrutores(id)
);

CREATE TABLE exercicios (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(MAX),
    grupo_muscular VARCHAR(50),
    equipamento VARCHAR(100),
    nivel_dificuldade VARCHAR(20),
    duracao_minutos INT,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE()
);

INSERT INTO planos (nome, descricao, preco, duracao_dias) VALUES ('Plano Mensal', 'Acesso total à academia por 30 dias.', 59.90, 30);
INSERT INTO planos (nome, descricao, preco, duracao_dias) VALUES ('Plano Trimestral', 'Acesso total à academia por 90 dias com desconto.', 149.90, 90);
INSERT INTO planos (nome, descricao, preco, duracao_dias) VALUES ('Plano Anual', 'Acesso total à academia por 365 dias com maior desconto.', 599.90, 365);

INSERT INTO alunos (nome, email, telefone, cpf, data_nascimento, genero, data_matricula, plano_id, status)
VALUES
('Ana Paula Souza', 'ana.souza@email.com', '(51) 99999-4444', '111.222.333-44', '1992-03-25', 'F', '2025-06-05', 1, 'ativo'),
('Carlos Eduardo', 'carlos.eduardo@email.com', '(51) 98888-5555', '222.333.444-55', '1988-11-11', 'M', '2025-06-08', 2, 'ativo'),
('Juliana Martins', 'juliana.martins@email.com', '(51) 97777-6666', '333.444.555-66', '1995-07-30', 'F', '2025-06-12', 3, 'ativo'),
('Felipe Gomes', 'felipe.gomes@email.com', '(51) 96666-7777', '444.555.666-77', '1990-12-15', 'M', '2025-06-15', 1, 'ativo'),
('Mariana Lima', 'mariana.lima@email.com', '(51) 95555-8888', '555.666.777-88', '1993-05-05', 'F', '2025-06-20', 2, 'ativo');

INSERT INTO instrutores (nome, email, telefone, especialidade, cref)
VALUES
('Lucas Ferreira', 'lucas.ferreira@email.com', '(51) 99999-1111', 'Musculação', 'CREF12345'),
('Patrícia Silva', 'patricia.silva@email.com', '(51) 98888-2222', 'Pilates', 'CREF54321'),
('Rafael Gomes', 'rafael.gomes@email.com', '(51) 97777-3333', 'Crossfit', 'CREF67890'),
('Juliana Souza', 'juliana.souza@email.com', '(51) 96666-4444', 'Natação', 'CREF09876');

INSERT INTO avaliacoes_fisicas 
(aluno_id, instrutor_id, data_avaliacao, peso, altura, imc, percentual_gordura, observacoes)
VALUES
(1, 1, '2025-01-10', 75.50, 1.75, 24.69, 18.5, 'Boa evolução nas últimas semanas'),
(2, 2, '2025-02-05', 68.20, 1.68, 24.15, 20.2, 'Recomendar aumento de carga nos exercícios'),
(3, 1, '2025-03-12', 82.00, 1.80, 25.31, 22.0, 'Necessário focar na redução de percentual de gordura'),
(4, 3, '2025-01-25', 60.00, 1.65, 22.04, 19.0, 'Mantendo boa forma física'),
(5, 2, '2025-04-01', 70.30, 1.70, 24.29, 21.0, 'Melhorar alimentação'),
(1, 1, '2025-05-10', 74.00, 1.75, 24.16, 17.8, 'Ajustar plano alimentar'),
(3, 3, '2025-05-15', 81.00, 1.80, 25.00, 21.5, 'Boa evolução, continuar assim'),
(2, 2, '2025-06-01', 67.80, 1.68, 24.01, 19.8, 'Aumentar sessões de cardio'),
(5, 1, '2025-06-10', 69.50, 1.70, 24.03, 20.5, 'Controlar o percentual de gordura'),
(4, 3, '2025-06-12', 59.50, 1.65, 21.88, 18.7, 'Manter rotina atual');
