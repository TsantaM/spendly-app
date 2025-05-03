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

## Mise à jour
------------------------------------------------------------------------------- || -------------------------------------------------------------------------------

 - 17 avril : Amélioration du système d'authentification / Inscription / Deconnexion en intégrant les donnée utilisateur dans un state zustand : useSessionStore().
 
 A noter que la librairy prenant en charge l'authentification n'est plus Next Auth mais Better Auth (une migration a été effectuer pour améliorer la DX en matier d'authentification !)
 Etape suivante : mise en place du dashboard user et du système d'ajout et de visionnage des dépenses.

 - 25 avril : On est en retard ok ! Toutes ce qui a été fait depuis : Migrations à la version 6.6.0 de Prisma. Mise en place des server action qui vont gérer les manipulations des dépenses (non testées)

 - 02 mai : On a enfin fini le MVP ! Tout est prêt ! Le système d'inscription et d'authentification, l'insertion et la suppression des dépenses et des revenues dans la base de donnée et le calcul en temps réèl du total des revenues, des dépenses, et le reste de l'argent.

 Prochaines features envisagée (je deverai ça un jour ! Mais pas aujourd'hui ! Bon un jour pour un Dev ça veut souvent dire jamais T_T) :
  - Système de modification des dépenses
  - Système de filtre de récupérétion des data en fonction de la date, du nom, etc...
  - Essayer d'ajouter Tanstack Query pour faciliter les requêtes

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
