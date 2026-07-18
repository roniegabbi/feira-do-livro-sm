# Conexão — Supabase da Feira do Livro

**Projeto:** `agudo-em-numeros` (reaproveitado para a Feira)
**Ref/ID:** `kqblnfkynhfvaztnpujw`
**Região:** sa-east-1 (São Paulo)

## Dados públicos (podem ir no frontend)

```
NEXT_PUBLIC_SUPABASE_URL=https://kqblnfkynhfvaztnpujw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_hsjMqk4-9a7gDp8zxhQNLg_M7sXAm1U
```

> A chave *publishable* (`sb_publishable_...`) é pública por design — só dá acesso
> de leitura conforme as políticas RLS. **Nunca** exponha a `service_role`.

## Acesso ao painel admin (`admin.html`)

- **E-mail:** `ronie.gabbi74@gmail.com`
- **Senha temporária:** `FeiraLivro2026!`  ← troque no primeiro acesso.

O acesso é controlado pela tabela `fl_admins` (só e-mails listados podem
escrever). Para liberar outra pessoa: crie o login no painel do Supabase e
adicione o e-mail em `fl_admins`.

> Recomendado: no painel do Supabase, em **Authentication → Providers → Email**,
> desabilite "Allow new users to sign up" para impedir cadastros públicos.

## Tabelas

| Tabela            | Conteúdo                                   | Linhas |
|-------------------|--------------------------------------------|--------|
| `fl_locais`       | Locais/espaços da Feira                     | 5      |
| `fl_categorias`   | Categorias de evento (com cor)              | 8      |
| `fl_autores`      | Autores                                     | 8      |
| `fl_eventos`      | Programação (7–22/ago/2026)                 | 40     |
| `fl_livros`       | Lançamentos de livros (capa via Storage)    | 12     |
| `fl_fotos`        | Galeria de fotos (upload → bucket `fotos`)  | 0      |
| `fl_videos`       | Galeria de vídeos (publicados por link)     | 0      |
| `fl_newsletter`   | Inscrições do formulário                    | 0      |
| `fl_admins`       | E-mails com permissão de administrador      | 1      |

**Storage:** buckets públicos `capas` (capas de livros), `fotos` (galeria) e
`imagens` (uso geral). Escrita só para admin.

## Regras de acesso (RLS)

- **Leitura pública** em locais, categorias, autores, eventos e livros.
- **Newsletter:** qualquer visitante pode `INSERT` (se inscrever); a leitura
  das inscrições só acontece via `service_role` (painel admin, server-side).
- **Escrita de conteúdo** (cadastrar evento/livro, subir capa): use a chave
  `service_role` no backend/admin — não há política de escrita para o público.

## Storage

- Bucket **`capas`** (público) para as capas dos livros. Salve a URL pública
  em `fl_livros.capa_url`.

## Próximos passos sugeridos

1. Frontend Next.js lendo `fl_eventos` e `fl_livros` via `@supabase/supabase-js`.
2. Form da newsletter fazendo `insert` em `fl_newsletter`.
3. Painel admin (server-side com `service_role`) para cadastrar livros + upload de capa.
