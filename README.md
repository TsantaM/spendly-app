# Spendly

**Spendly** est une application SaaS minimaliste pour suivre vos dépenses et vos rentrées d'argent. Gérez facilement vos finances personnelles via une interface simple et intuitive.

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

## Mise à jour
------------------------------------------------------------------------------- || -------------------------------------------------------------------------------

 - 17 avril : Amélioration du système d'authentification / Inscription / Deconnexion en intégrant les donnée utilisateur dans un state zustand : useSessionStore()
 
 Etape suivante : mise en place du dashboard user et du système d'ajout et de visionnage des dépenses.

------------------------------------------------------------------------------- || -------------------------------------------------------------------------------

## Démarrage local

```bash
git clone https://github.com/TsantaM/spendly-app.git
cd spendly
pnpm install
pnpm dev
