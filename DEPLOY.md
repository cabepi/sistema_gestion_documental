# Guía de Despliegue en Vercel

## 1. Configuración del Proyecto
Este proyecto es un monorepo que contiene tanto el Frontend (Vite) como el Backend (Express). Para desplegarlo correctamente en Vercel, hemos configurado:
- `api/index.js`: Punto de entrada para Serverless Functions.
- `vercel.json`: Reglas de reescritura para dirigir `/api/*` al backend.

## 2. Variables de Entorno (Environment Variables)
Debes configurar las siguientes variables en el panel de Vercel (Settings > Environment Variables).

### Backend (Producción)
| Variable | Valor Recomendado / Descripción |
|----------|---------------------------------|
| `DATABASE_URL` | `postgresql://...` (Tu cadena de conexión a Neon DB) |
| `AWS_ACCESS_KEY_ID` | Tu Key ID de AWS IAM |
| `AWS_SECRET_ACCESS_KEY` | Tu Secret Key de AWS IAM |
| `AWS_REGION` | `us-east-1` (o tu región S3) |
| `S3_BUCKET_NAME` | `sistema-gestion-documental` |
| `JWT_SECRET` | Genera una cadena segura (ej. `openssl rand -hex 32`) |

### Frontend (Build Time)
Vercel expone automáticamente estas variables al construir el frontend si empiezan con `VITE_`.

| Variable | Valor | Nota |
|----------|-------|------|
| `VITE_API_URL` | `/api` | **Importante:** Usar ruta relativa para que apunte al mismo dominio en Vercel. |

## 3. Pasos para Desplegar
1. Sube los cambios a GitHub:
   ```bash
   git add .
   git commit -m "chore: prepare for vercel deployment"
   git push
   ```
2. Importa el proyecto en Vercel.
3. Vercel detectará `Vite`.
4. En **Environment Variables**, agrega todas las variables listadas arriba.
5. Haz clic en **Deploy**.

## 4. Verificación
- El frontend cargará en `https://tu-proyecto.vercel.app`.
- Las llamadas al API irán a `https://tu-proyecto.vercel.app/api/...`.
