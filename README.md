# Antigravity Site Project

## Описание
Проект сайта BAA Legal с личным кабинетом (Antigravity).
Состоит из Frontend (Vite/React) и Backend (NestJS).

## Запуск проекта (Development)

### 1. Backend (NestJS)

Backend настроен на порту **8000**. Использует мок-данные, база данных не требуется.

```bash
cd backend-nestjs
npm install
npm run start:dev
```

**Переменные окружения (.env):**
В папке `backend-nestjs` должен быть файл `.env` (уже настроен):
```
PORT=8000
```

### 2. Frontend (Vite/React)

Frontend запускается на порту **5173**. Запросы к API проксируются на localhost:8000.

```bash
cd frontend
npm install
npm run dev
```

Откройте в браузере: http://localhost:5173

## Личный кабинет (Cabinet)
После запуска backend и frontend:
1. Перейдите на страницу входа (`/auth`).
2. Введите **любой** email и пароль (на данный момент backend принимает любые данные).
3. Вы будете автоматически перенаправлены в Личный кабинет (`/cabinet`).

## Структура Личного кабинета
- **/cabinet**: Дашборд с виджетами
- **/cabinet/services**: Услуги и заявки
- **/cabinet/docs**: Документы
- **/cabinet/chats**: Чат с юристом
- **/cabinet/tariff**: Управление тарифом
- **/cabinet/billing**: Финансы и счета
- **/cabinet/profile**: Профиль компании
- **/cabinet/security**: Настройки безопасности
- **/cabinet/support**: Техподдержка

## Разработка
- **Frontend**: React, TailwindCSS, Framer Motion.
- **Backend**: NestJS (Mock implementation).

---

## 🚀 Production Deployment (depalaw.ru)

### Документация по деплою:
- **[Полный план деплоя](deployment_plan.md)** - Подробная инструкция со всеми шагами
- **[Быстрая справка](DEPLOYMENT_QUICK_REFERENCE.md)** - Краткое руководство с командами

### Быстрый деплой:

#### 1. Собрать Frontend
```bash
cd frontend
./build-production.sh
```

#### 2. Подготовить Backend
```bash
cd backend-nestjs
./prepare-deploy.sh
```

#### 3. Загрузить на сервер
```bash
# Frontend
scp -r frontend/dist/* u3390483_SAGETTI@31.31.196.161:/var/www/u3390483/data/www/depalaw.ru/

# Backend
scp backend-nestjs/backend-deploy.tar.gz u3390483_SAGETTI@31.31.196.161:/var/www/u3390483/depalaw-api/
```

### Файлы для деплоя:
- `frontend/build-production.sh` - Скрипт сборки фронтенда
- `backend-nestjs/prepare-deploy.sh` - Скрипт подготовки бэкенда
- `backend-nestjs/.env.production.template` - Шаблон production переменных
- `backend-nestjs/ecosystem.config.json` - Конфигурация PM2
- `nginx-depalaw.ru.conf` - Конфигурация nginx

### Production URL:
- **Сайт**: https://depalaw.ru
- **API**: https://depalaw.ru/api/

---

## 📝 Дополнительная информация

### Технологии
- **Frontend**: React 19, Vite, TailwindCSS, Framer Motion, React Router, Socket.IO Client
- **Backend**: NestJS, TypeScript, Socket.IO, YandexDB, Tinkoff Payments
- **Deployment**: nginx, PM2, Let's Encrypt SSL

### Структура проекта
```
baa-legal/
├── frontend/               # React приложение
├── backend-nestjs/         # NestJS API
├── backend-django/         # Django API (legacy)
├── nginx-depalaw.ru.conf  # nginx конфигурация
└── DEPLOYMENT_QUICK_REFERENCE.md
```

