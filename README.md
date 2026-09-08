# 🥖 Belém Pães & Doces — Landing Page & Trabalhe Conosco

> **"Em cada receita uma pitada de amor."** — Tradição na panificação e confeitaria artesanal desde 1987.  
> Inspirado na presença oficial do Instagram [@_belempaesedoces](https://www.instagram.com/_belempaesedoces/).

---

## ✨ Funcionalidades Principais

1. **Landing Page Artesanal de Alta Conversão**:
   - Design acolhedor e requintado com paleta quente (tons de pão tostado, dourado e creme colonial).
   - **Sem preços diretos nos cards**, transformando cada produto em um canal de atração e pedido consultivo via WhatsApp.
   - Botões de **"Pedir no WhatsApp"** com mensagens pré-formatadas para cada produto.

2. **Fotos Reais do Instagram no Cardápio**:
   - Torta Festival de Morango & Ninho.
   - Bolo de Cenoura Vulcão com Cobertura Belga.
   - Bolo Trufado de Chocolate com Gotas Crocantes.
   - Bolo de Milho Colonial Cremoso (Tipo Pamonha da Roça).
   - Bolo Artístico Vintage (Decoração Lambeth para Festas).
   - Bombons e Morangos Gourmet do Festival de Sexta-feira.
   - Vitrine de doces finos e sobremesas da casa.

3. **Rolagem de Scroll Ultra Suave (Momentum Smooth Scroll)**:
   - Motor de física de scroll com amortecimento inercial (*lerp damping* via `requestAnimationFrame`), proporcionando navegação suave e agradável em monitores de qualquer taxa de atualização.
   - Suporte nativo otimizado para gestos em dispositivos móveis (*touch*).

4. **Página Exclusiva "Trabalhe Conosco" (`trabalhe-conosco.html`)**:
   - Exibição do post oficial do Instagram: **"CONTRATA-SE BALCONISTA"**.
   - Seção contando a história e como é a rotina e o clima de trabalho na Belém (38 anos de história, ambiente familiar, café colonial incluso, treinamentos e horários organizados).
   - Requisitos oficiais da vaga e formulário de candidatura rápida com direcionamento automático para o WhatsApp.

5. **Simulador de Bolos & Encomendas**:
   - Escolha de número de convidados, massa, recheio e tema para orçamento automático no WhatsApp.

---

## 🚀 Como Executar Localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/krox-e/belem-padaria.git
   cd belem-padaria
   ```

2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

3. Abra no navegador:
   - **Página Principal**: [http://localhost:3000](http://localhost:3000)
   - **Vaga de Balconista**: [http://localhost:3000/trabalhe-conosco.html](http://localhost:3000/trabalhe-conosco.html)

---

## 📁 Estrutura de Arquivos

```
belem-padaria/
├── images/                  # Fotos autênticas do Instagram @_belempaesedoces
├── index.html               # Landing page principal (Cardápio LP, história, simulador)
├── trabalhe-conosco.html    # Página dedicada da vaga de balconista
├── server.js                # Servidor estático Node.js para preview
├── package.json             # Metadados e scripts do projeto
└── README.md                # Documentação
```

---

❤️ Desenvolvido com carinho para a comunidade de apreciadores da **Belém Pães e Doces**.
