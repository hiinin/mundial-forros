# Instruções para Adicionar Imagens do Portfólio

## Localização das Imagens

As imagens do portfólio devem ser salvas na pasta:
```
assets/img/portfolio/
```

## Nomeação das Imagens

Recomenda-se usar nomes descritivos, por exemplo:
- `forro-caminhao-1.jpg`
- `forro-caminhao-2.jpg`
- `forro-caminhao-3.jpg`
- etc.

## Como Substituir as Imagens Placeholder

1. Adicione suas fotos reais na pasta `assets/img/portfolio/`

2. No arquivo `index.html`, localize a seção de portfólio (linha ~140)

3. Substitua os `src` das imagens placeholder pelos caminhos reais:

**Antes:**
```html
<img src="https://via.placeholder.com/400x300/FF6B35/FFFFFF?text=Forro+de+Caminhão+1" alt="Forro de Caminhão - Mundial Forros Maringá">
```

**Depois:**
```html
<img src="assets/img/portfolio/forro-caminhao-1.jpg" alt="Forro de Caminhão - Mundial Forros Maringá">
```

## Especificações Recomendadas

- **Formato:** JPG ou PNG
- **Tamanho:** 800x600px ou proporção similar (4:3)
- **Peso:** Máximo 500KB por imagem (otimize antes de usar)
- **Qualidade:** Alta resolução para melhor visualização no lightbox

## Dicas

- Use ferramentas como [TinyPNG](https://tinypng.com/) ou [Squoosh](https://squoosh.app/) para otimizar as imagens
- Mantenha todas as imagens com proporção similar para um grid uniforme
- Adicione descrições relevantes nos atributos `alt` para SEO
