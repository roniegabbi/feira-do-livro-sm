-- ============================================================
-- 53ª Feira do Livro de Santa Maria — Schema Supabase
-- Projeto: agudo-em-numeros (reaproveitado) — ref kqblnfkynhfvaztnpujw
-- ============================================================

create table public.fl_locais (
  nome     text primary key,
  endereco text
);

create table public.fl_categorias (
  nome text primary key,
  cor  text
);

create table public.fl_autores (
  id   bigint generated always as identity primary key,
  nome text not null unique,
  bio  text
);

create table public.fl_eventos (
  id        bigint generated always as identity primary key,
  dia       date not null,
  hora      text not null,
  titulo    text not null,
  categoria text references public.fl_categorias(nome),
  local     text references public.fl_locais(nome),
  grupo     text,
  sinopse   text,
  libras    boolean not null default false,
  destaque  boolean not null default false,
  criado_em timestamptz not null default now()
);

create table public.fl_livros (
  id              bigint generated always as identity primary key,
  titulo          text not null,
  autor_id        bigint references public.fl_autores(id),
  categoria       text,
  capa_url        text,
  patrono         boolean not null default false,
  data_lancamento date,
  hora            text,
  local           text references public.fl_locais(nome),
  sinopse         text,
  criado_em       timestamptz not null default now()
);

create table public.fl_newsletter (
  id         bigint generated always as identity primary key,
  nome       text not null,
  email      text not null unique,
  confirmado boolean not null default false,
  criado_em  timestamptz not null default now()
);

create index on public.fl_eventos (dia);
create index on public.fl_eventos (categoria);
create index on public.fl_livros (categoria);

-- ===== RLS =====
alter table public.fl_locais     enable row level security;
alter table public.fl_categorias enable row level security;
alter table public.fl_autores    enable row level security;
alter table public.fl_eventos    enable row level security;
alter table public.fl_livros     enable row level security;
alter table public.fl_newsletter enable row level security;

create policy "leitura publica locais"     on public.fl_locais     for select to anon, authenticated using (true);
create policy "leitura publica categorias" on public.fl_categorias for select to anon, authenticated using (true);
create policy "leitura publica autores"    on public.fl_autores    for select to anon, authenticated using (true);
create policy "leitura publica eventos"    on public.fl_eventos    for select to anon, authenticated using (true);
create policy "leitura publica livros"     on public.fl_livros     for select to anon, authenticated using (true);

-- Newsletter: qualquer visitante pode se inscrever; leitura só via service role (admin)
create policy "inscricao publica newsletter" on public.fl_newsletter for insert to anon, authenticated with check (true);

-- ===== Storage: bucket público para capas de livros =====
insert into storage.buckets (id, name, public)
values ('capas', 'capas', true)
on conflict (id) do nothing;
-- (bucket público serve URLs diretas; sem política de listagem por segurança)

-- ============================================================
-- ESCRITA (admin): as tabelas de conteúdo não têm política de
-- INSERT/UPDATE/DELETE para anon. Use a chave service_role no
-- painel admin (server-side) para cadastrar eventos/livros.
-- ============================================================
