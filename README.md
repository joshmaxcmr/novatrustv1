# Nova Trust Finance Corporation

Site vitrine moderne pour Nova Trust Finance Corporation, une entreprise de microfinance utilisant la solution core banking open source Mifos.

## 🏗️ Architecture

- **Frontend**: Next.js 14 avec App Router, TypeScript, Tailwind CSS
- **Backend**: FastAPI avec Python 3.11+, SQLAlchemy 2.0, PostgreSQL
- **Cache**: Redis pour les sessions et le cache
- **Queue**: Celery pour les tâches asynchrones
- **Proxy**: Nginx comme reverse proxy
- **Conteneurisation**: Docker et Docker Compose

## 🎨 Design System

### Couleurs
- **Nova Blue**: #312D5E (principal), #7E6D91 (60%), #D3CCDA (20%)
- **Nova Gold**: #A8906D (secondaire), #CCBAA2 (60%), #EEE7DD (20%)

## 🚀 Démarrage rapide

### Prérequis
- Docker et Docker Compose
- Node.js 18+ (pour le développement local)
- Python 3.11+ (pour le développement local)

### Installation avec Docker

1. **Cloner le projet**
   ```bash
   git clone <repository-url>
   cd novatrust
   ```

2. **Configurer les variables d'environnement**
   ```bash
   cp .env.example .env
   # Éditer .env avec vos configurations
   ```

3. **Démarrer tous les services**
   ```bash
   docker-compose up -d
   ```

4. **Accéder à l'application**
   - Frontend: http://localhost:3000
   - API: http://localhost:8000
   - Documentation API: http://localhost:8000/docs
   - Monitoring Celery: http://localhost:5555

### Installation pour le développement

#### Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```

#### Backend (FastAPI)
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

## 📁 Structure du projet

```
novatrust/
├── frontend/                 # Application Next.js
│   ├── app/                 # App Router (Next.js 14)
│   ├── components/          # Composants React
│   ├── lib/                # Utilitaires
│   └── styles/             # Styles globaux
│
├── backend/                  # API FastAPI
│   ├── api/v1/             # Endpoints API v1
│   ├── core/               # Configuration
│   ├── models/             # Modèles SQLAlchemy
│   ├── schemas/            # Schémas Pydantic
│   └── services/           # Logique métier
│
├── nginx/                   # Configuration Nginx
├── database/               # Scripts de base de données
└── docker-compose.yml      # Configuration Docker
```

## 🔧 Fonctionnalités

### ✅ Implémentées
- [x] Structure de base Next.js 14 + FastAPI
- [x] Authentification JWT
- [x] Système de design avec Tailwind CSS
- [x] Base de données PostgreSQL avec modèles
- [x] API REST complète
- [x] Configuration Docker
- [x] Page d'accueil avec Hero, Services, Statistiques, Témoignages

### 🚧 En développement
- [ ] Système de prise de rendez-vous
- [ ] Ouverture de compte en ligne (KYC)
- [ ] Blog/CMS intégré
- [ ] Chat en temps réel
- [ ] Dashboard administratif
- [ ] Calculateurs financiers
- [ ] Notifications (Email/SMS)
- [ ] Intégration Mifos

## 🛠️ Développement

### Commands utiles

```bash
# Démarrer en mode développement
docker-compose up

# Rebuilder les images
docker-compose build

# Voir les logs
docker-compose logs -f [service-name]

# Accéder à un conteneur
docker-compose exec [service-name] bash

# Arrêter tous les services
docker-compose down

# Arrêter et supprimer les volumes
docker-compose down -v
```

### Base de données

```bash
# Migrations (à implémenter avec Alembic)
docker-compose exec backend alembic upgrade head

# Créer une migration
docker-compose exec backend alembic revision --autogenerate -m "description"
```

## 📊 Monitoring

- **Celery Flower**: http://localhost:5555 (monitoring des tâches)
- **Logs**: `docker-compose logs`
- **Health check**: http://localhost:8000/health

## 🔒 Sécurité

- Authentification JWT
- Validation des données avec Pydantic
- Headers de sécurité avec Nginx
- CORS configuré
- Variables d'environnement pour les secrets

## 🚀 Déploiement

### Production

1. **Configurer les variables d'environnement de production**
2. **Utiliser HTTPS avec des certificats SSL**
3. **Configurer les backups de base de données**
4. **Surveiller les performances et logs**

### Variables d'environnement importantes

```env
# Sécurité
SECRET_KEY=your-production-secret-key
DEBUG=false

# Base de données
DATABASE_URL=postgresql://user:password@host:port/database

# Email
SMTP_HOST=your-smtp-server
SMTP_USER=your-email
SMTP_PASSWORD=your-password

# Mifos (optionnel)
MIFOS_BASE_URL=https://your-mifos-instance.com
MIFOS_USERNAME=username
MIFOS_PASSWORD=password
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/amazing-feature`)
3. Commit les changements (`git commit -m 'Add amazing feature'`)
4. Push vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

Pour toute question ou support:
- Email: contact@novatrust.com
- Téléphone: +237 600 000 000

---

**Nova Trust Finance Corporation** - Votre partenaire de confiance pour la microfinance.