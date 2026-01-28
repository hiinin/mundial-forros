# Mundial Forros - Portfólio

Portfólio simples e moderno para a empresa Mundial Forros, otimizado para deploy na Vercel.

## Características

- Design responsivo e moderno
- Integração com Google Maps mostrando a localização
- Botão flutuante do WhatsApp para contato rápido
- Navegação suave entre seções
- Animações e efeitos visuais
- Compatível com Vercel

## Configuração

### 1. Google Maps API

Para o mapa funcionar, você precisa de uma chave da API do Google Maps:

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Ative a API "Maps JavaScript API"
4. Crie uma chave de API
5. Substitua `YOUR_API_KEY` no arquivo `index.html` pela sua chave

```html
<script async defer src="https://maps.googleapis.com/maps/api/js?key=SUA_CHAVE_AQUI&callback=initMap"></script>
```

### 2. Deploy na Vercel

#### Opção 1: Via CLI da Vercel

1. Instale a CLI da Vercel:
```bash
npm i -g vercel
```

2. No diretório do projeto, execute:
```bash
vercel
```

3. Siga as instruções para fazer login e configurar o projeto

#### Opção 2: Via GitHub

1. Faça push do código para um repositório GitHub
2. Acesse [vercel.com](https://vercel.com)
3. Conecte seu repositório GitHub
4. A Vercel detectará automaticamente o projeto e fará o deploy

#### Opção 3: Via Interface Web

1. Acesse [vercel.com](https://vercel.com)
2. Clique em "Add New Project"
3. Importe o projeto (GitHub, GitLab, Bitbucket ou upload direto)
4. A Vercel fará o deploy automaticamente

### 3. Estrutura de Arquivos

```
mundial-forros/
├── index.html
├── vercel.json
├── .vercelignore
├── assets/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── script.js
└── README.md
```

## Configurações da Vercel

O arquivo `vercel.json` já está configurado com:
- Headers de segurança
- Cache para arquivos estáticos
- Rotas configuradas

## Variáveis de Ambiente (Opcional)

Se preferir usar variáveis de ambiente para a chave do Google Maps:

1. Na Vercel, vá em Settings > Environment Variables
2. Adicione: `GOOGLE_MAPS_API_KEY` com sua chave
3. No `index.html`, substitua por:
```html
<script async defer src="https://maps.googleapis.com/maps/api/js?key=%GOOGLE_MAPS_API_KEY%&callback=initMap"></script>
```

Ou use JavaScript para injetar a chave:
```javascript
const apiKey = process.env.GOOGLE_MAPS_API_KEY;
```

## Informações de Contato

- **Endereço:** Rua Campos Sales, 1660, Maringá - PR
- **WhatsApp:** (44) 9 9911-1647

## Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript
- Google Maps API
- Font Awesome (ícones)
- Vercel (hospedagem)

## Navegadores Suportados

- Chrome (últimas versões)
- Firefox (últimas versões)
- Safari (últimas versões)
- Edge (últimas versões)

## Licença

Este projeto é de uso interno da empresa Mundial Forros.
