begin;

alter table research_items
  add column if not exists pdf_url text,
  add column if not exists citation_count integer not null default 0;

alter table home_sections
  add column if not exists research_interest_score integer not null default 0;

alter table achievements
  add column if not exists show_on_home boolean not null default false,
  add column if not exists show_on_projects boolean not null default false;

do $$
begin
  if not exists (
    select 1
    from information_schema.columns
    where table_schema = current_schema()
      and table_name = 'achievements'
      and column_name = 'show_on_research'
  ) then
    alter table achievements
      add column show_on_research boolean not null default false;

    -- Preserve the recognition section that already existed on the research page.
    update achievements set show_on_research = true;
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'research_items_citation_count_check'
  ) then
    alter table research_items
      add constraint research_items_citation_count_check
      check (citation_count >= 0);
  end if;

  if not exists (
    select 1 from pg_constraint where conname = 'home_sections_research_interest_score_check'
  ) then
    alter table home_sections
      add constraint home_sections_research_interest_score_check
      check (research_interest_score between 0 and 100);
  end if;
end $$;

commit;
