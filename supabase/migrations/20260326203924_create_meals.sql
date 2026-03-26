
  create table "public"."meals" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone default now(),
    "name" text not null
      );


CREATE UNIQUE INDEX meals_pkey ON public.meals USING btree (id);

alter table "public"."meals" add constraint "meals_pkey" PRIMARY KEY using index "meals_pkey";

grant delete on table "public"."meals" to "anon";

grant insert on table "public"."meals" to "anon";

grant references on table "public"."meals" to "anon";

grant select on table "public"."meals" to "anon";

grant trigger on table "public"."meals" to "anon";

grant truncate on table "public"."meals" to "anon";

grant update on table "public"."meals" to "anon";

grant delete on table "public"."meals" to "authenticated";

grant insert on table "public"."meals" to "authenticated";

grant references on table "public"."meals" to "authenticated";

grant select on table "public"."meals" to "authenticated";

grant trigger on table "public"."meals" to "authenticated";

grant truncate on table "public"."meals" to "authenticated";

grant update on table "public"."meals" to "authenticated";

grant delete on table "public"."meals" to "service_role";

grant insert on table "public"."meals" to "service_role";

grant references on table "public"."meals" to "service_role";

grant select on table "public"."meals" to "service_role";

grant trigger on table "public"."meals" to "service_role";

grant truncate on table "public"."meals" to "service_role";

grant update on table "public"."meals" to "service_role";


