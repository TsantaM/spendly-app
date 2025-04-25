# Spendly

**Spendly** est un projet de Saas, né d'un besoin de répertorier et enregistrer les dépenses personnelles et les rentrées d'argent et d'en faire le total automatiquement afin de simplifier la gestion de ses finances quotidienne et d'améliorer la gestion globale des finance en suivant en temps réèl l'argent qui sort et qui rentre et ce qu'il est sensé rester. 

## Fonctionnalités

- Authentification sécurisée (BetterAuth)
- Ajout, modification et suppression de :
  - Dépenses
  - Rentrées d'argent
- Calcul automatique :
  - Total des dépenses
  - Total des revenus
  - Solde restant

## Stack utilisée

- Next.js 15
- TypeScript
- PostgreSQL
- Prisma ORM
- BetterAuth
- Zustand
- Tanstack/React Query

## Mise à jour
------------------------------------------------------------------------------- || -------------------------------------------------------------------------------

 - 17 avril : Amélioration du système d'authentification / Inscription / Deconnexion en intégrant les donnée utilisateur dans un state zustand : useSessionStore().
 
 A noter que la librairy prenant en charge l'authentification n'est plus Next Auth mais Better Auth (une migration a été effectuer pour améliorer la DX en matier d'authentification !)
 Etape suivante : mise en place du dashboard user et du système d'ajout et de visionnage des dépenses.

 - 25 avril : On est en retard ok ! Toutes ce qui a été fait depuis : Migrations à la version 6.6.0 de Prisma. Mise en place des server action qui vont gérer les manipulations des dépenses (non testées)

 Etape suivant : Terminer l'UI/UX du dashboard utilisateur, c'est à dire côté front. Ensuite branchement du front aux server action en utilisant Tanstack/React Query

------------------------------------------------------------------------------- || -------------------------------------------------------------------------------

## Démarrage local

```bash
git clone https://github.com/TsantaM/spendly-app.git
cd spendly
pnpm install

# Pour prisma :
npx prisma generate
npx prisma migrate dev --name "init"

pnpm dev
