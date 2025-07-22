
# 🧪 Monitor de Qualidade de APIs Públicas

Um projeto completo focado em qualidade de software, testes automatizados e visualização de desempenho de APIs públicas. 
---

## 📌 Descrição

Esta aplicação permite que o usuário cadastre URLs de APIs públicas e visualize:

- 🔍 Status (online/offline)
- 📡 Código HTTP
- ⚡ Tempo de resposta (ms)
- 📊 Gráficos interativos de tempo e status
- 🧪 Testes automatizados com Cypress

O sistema consiste em um frontend React (com Vite) e um backend em Node.js/Express.

---

## 🎯 Tecnologias Utilizadas

### Frontend
- React + Vite
- Axios para requisições HTTP
- Recharts para gráficos interativos
- Cypress para testes end-to-end
- CSS custom properties (dark mode)
- Deploy via **Vercel**

### Backend
- Node.js + Express
- Monitoramento de tempo de resposta e código HTTP
- Deploy via **Render**

---

## 🚀 Funcionalidades

- ✅ Adição de URLs para monitoramento
- ✅ Exibição em cards com dados detalhados
- ✅ Modo escuro 🌙
- ✅ Layout responsivo (mobile/desktop)
- ✅ Gráfico de barras (tempo de resposta)
- ✅ Gráfico de pizza (status online/offline)
- ✅ Testes Cypress (inclusos e prontos para rodar)

---

## 🖼️ Demonstração


---

## 📦 Instalação local

### 1. Clone o repositório

```bash
git clone https://github.com/DMouraCosta/monitor-de-qualidade-apis
cd monitor-de-qualidade-apis
```

### 2. Inicie o backend

```bash
cd backend
npm install
npm run dev
```

O backend iniciará em `http://localhost:4000`.

### 3. Inicie o frontend

```bash
cd frontend
npm install
npm run dev
```

O frontend iniciará em `http://localhost:5173`.

---

## 🧪 Executando os Testes

```bash
npm run cypress
```

Os testes cobrem:

- Adição de URL válida
- Exibição dos dados da API
- Validação de tempo de resposta
- Remoção de URLs
- Resposta visual (status, gráficos)

---

## 🌐 Deploy

- 🔗 **Frontend (Vercel)**: 
- 🔗 **Backend (Render)**: 

---

## 📃 Licença

MIT

---

## 👨‍💻 Autor

Desenvolvido por **Dailson Costa**  
🔗 [LinkedIn] linkedin.com/in/dailson-costa-13bb47239
📂 [Portfólio] 
