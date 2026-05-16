MVP PayService-Demo
**Plataforma de Gestão de Pagamentos para Comerciantes**

Este documento descreve as funcionalidades, a arquitetura visual e a proposta de valor do MVP (Minimum Viable Product) desenvolvido para o **PayService+**.

---

## 1. Visão Geral do Produto
O PayService+ foi concebido como uma solução de alta fidelidade para modernizar a operação de pequenos e médios comerciantes no mercado angolano. O foco principal é a **segurança transacional** aliada a uma **experiência de utilizador (UX) premium**, reduzindo o atrito em operações financeiras diárias.

### Diferenciais Estratégicos
- **Localização:** Adaptado para a moeda local (Kz) e fluxos comuns (BAI Directo, MC Express).
- **Offline-Ready:** Design preparado para situações de baixa conectividade, comuns no terreno.
- **Interface Sunmi-First:** Optimizado para terminais POS Android e dispositivos móveis.

---

## 2. Identidade Visual e UX (User Experience)
Utilizamos o conceito de **Glassmorphism**, caracterizado por:
- **Camadas de Profundidade:** Uso de desfoque (blur) e transparências para separar hierarquias.
- **Micro-interações:** Feedback táctil (vibração) em erros e animações suaves de transição entre páginas.
- **Dark Mode Premium:** Redução da fadiga visual para comerciantes que operam o dia todo e economia de bateria em dispositivos móveis.

---

## 3. Tour pelas Funcionalidades (Telas)

### 🔐 Autenticação e Segurança
- **Login por PIN:** Sistema de teclado numérico customizado integrado na UI, evitando conflitos com o teclado do sistema e acelerando o acesso.
- **Cadastro (Wizard):** Fluxo dividido em 3 etapas para não sobrecarregar o utilizador:
  1. Identidade (Nome e Negócio).
  2. Verificação (Telefone e Simulação de SMS).
  3. Segurança (Criação e Confirmação de PIN com teclado unificado).

### 🏠 Painel Principal (Home)
- **Gestão de Saldo:** Visualização clara do saldo disponível e valores pendentes (a liquidar).
- **Ações Rápidas:** Botões de alta prioridade para "Vender", "Transferir" e "Validar".
- **Histórico Inteligente:** Lista das últimas transações com status visual (Pendente, Concluído, Saída).

### 🛡️ Validar Transações (Diferencial de Mercado)
Uma ferramenta crítica para combater fraudes:
- **Consulta por Referência:** O comerciante pode digitar o código de um comprovativo (ex: BAI, MC Express) para validar a sua autenticidade no sistema.
- **Simulador de Scanner:** Interface preparada para integração futura com leitura de QR Code/Câmera.
- **Base de Dados Segura:** Validação em tempo real com "Enclave Seguro".

### 💰 Terminal de Vendas (POS) e Transferências
- Interface optimizada para digitação rápida de valores.
- Categorização de métodos de pagamento (Dinheiro, Multicaixa, Kikuia, etc).

---

## 4. Stack Tecnológica (Robustez e Escalabilidade)
- **Frontend:** React 18 & Vite (Ultrafast loading).
- **Estilização:** Tailwind CSS (Arquitetura moderna e leve).
- **Animações:** Framer Motion (Fluidez de app nativa).
- **Routing:** Configuração para Single Page Application (SPA) com suporte a links directos sem erros 404.

