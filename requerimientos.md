# Requerimientos Funcionales y Flujos del Sistema SGD

Este documento detalla las funcionalidades, flujos básicos y alternos para cada pantalla del sistema MiCultura SGD.

## 1. Pantalla de Inicio de Sesión (Login)

**Actor:** Todos los usuarios.
**Objetivo:** Autenticarse para acceder al sistema.

### Funcionalidades
- Autenticación mediante credenciales (Usuario/Correo y Contraseña).
- Opción de "Recordar dispositivo".
- Enlace para recuperación de contraseña.
- Acceso alternativo (simulado) para SSO Institucional.

### Flujo Básico
1. El usuario ingresa a la aplicación.
2. El sistema muestra el formulario de login.
3. El usuario ingresa su correo y contraseña.
4. El usuario hace clic en "Ingresar al Sistema".
5. El sistema valida las credenciales.
6. Si son válidas, el sistema redirige al **Dashboard Principal**.

### Flujos Alternos
- **Credenciales Inválidas:** El sistema muestra un mensaje de error ("Usuario o contraseña incorrectos") y mantiene al usuario en la pantalla de login.
- **Olvidó Contraseña:** El usuario hace clic en "¿Olvidó su contraseña?", el sistema (en una fase futura) iniciaría el flujo de recuperación.

### Cierre de Sesión (Logout)
- **Funcionalidad:** Botón disponible en el menú lateral para cerrar la sesión actual.
- **Comportamiento:**
    1. El usuario hace clic en "Cerrar Sesión".
    2. El sistema elimina el token de seguridad y datos del usuario (localStorage).
    3. El sistema redirige inmediatamente a la pantalla de Login.

### Seguridad y Rutas Protegidas
- **Regla General:** Todas las pantallas internas (Dashboard, Documentos, Admin) están protegidas.
- **Comportamiento:** Si un usuario intenta acceder a una URL directa sin un token válido, el sistema lo redirige automáticamente al Login.

---

## 2. Dashboard Principal (Main Dashboard)

**Actor:** Usuario Autenticado.
**Objetivo:** Visualizar métricas clave y gestionar tareas pendientes.

### Funcionalidades
- Visualización de métricas generales (Total Documentos, Pendientes, Nuevas Cargas).
- Bandeja de Entrada "Resumida" con tareas prioritarias.
- **Lógica de Roles:**
    - **Administrador:** Visualiza TODAS las tareas pendientes del sistema.
    - **Usuario Estándar:** Visualiza únicamente las tareas asignadas a su usuario.
- Accesos rápidos a módulos del sistema.

### Flujo Básico
1. El usuario accede al Dashboard.
2. El sistema verifica el rol del usuario (Admin vs Usuario).
3. El sistema carga las métricas y la lista de tareas correspondiente.
4. El usuario revisa la información.
5. El usuario hace clic en una tarea de la bandeja.
6. El sistema redirige a la pantalla de **Visor de Documentos** o **Detalle de Tarea**.

---

## 3. Explorador de Documentos (Document Explorer)

**Actor:** Usuario Autenticado.
**Objetivo:** Buscar, filtrar y gestionar el repositorio de documentos con identificación visual rápida.

### Funcionalidades Implementadas
- **Listado de Documentos:** Tabla interactiva con columnas ordenables (Nombre, Fecha, Autor, Estado, Acciones).
- **Identificación Visual de Tipos:**
    - 🔴 **PDF:** Icono `picture_as_pdf` en color rojo.
    - 🟣 **Imágenes:** Icono `image` en color morado.
    - 🔵 **Word (`.doc`, `.docx`):** Icono `description` en color azul.
    - 🟢 **Excel (`.xls`, `.xlsx`):** Icono `table_view` en color verde.
- **Filtros y Búsqueda:**
    - Barra de búsqueda por texto libre (título o descripción).
    - Botones de filtro rápido (Filtros, Vista de Lista, Vista de Cuadrícula).
- **Acciones Rápidas:**
    - 👁️ **Ver:** Abre el Visor de Documentos.
    - ⬇️ **Descargar:** Descarga directa el archivo original.
- **Estados Visuales:** Chips de colores para estados (DRAFT: Amber, APPROVED: Green, REJECTED: Red).

### Flujo Básico
1. El usuario navega a la sección "Documentos".
2. El sistema consulta el endpoint `GET /api/documents` recuperando metadatos.
3. El usuario identifica visualmente un Excel por su icono verde.
4. El usuario hace clic en el nombre del archivo o el botón "Ver".
5. El sistema redirige a `/viewer?id=XYZ`.

---

## 4. Carga e Indexación (Upload & Indexing)

**Actor:** Usuario con permisos de carga.
**Objetivo:** Subir y clasificar documentos soportando múltiples formatos.

### Funcionalidades Implementadas
- **Formatos Soportados:**
    - Documentos: PDF, Word (`.doc`, `.docx`), Excel (`.xls`, `.xlsx`).
    - Imágenes: JPG, PNG, GIF, WEBP.
- **Área de Carga (Drag & Drop):**
    - Zona reactiva que acepta arrastrar y soltar archivos.
    - Validación inmediata de tipos MIME permitidos.
- **Previsualización Inteligente:**
    - **Imágenes:** Muestra la imagen directamente.
    - **PDF:** Muestra la primera página/visor embebido.
    - **Office:** Muestra un placeholder con el icono e información del archivo (la vista previa completa se genera en el visor).
- **Formulario de Metadatos:**
    - Título (editable, por defecto el nombre del archivo).
    - Tipo Documental (Selección de catálogo DB: RESOLUCION, MEMORANDO, FACTURA, CONTRATO, CARTA).
    - Descripción (Opcional).
    - Fecha de Creación (Selector de fecha).
- **Backend Integration:** Endpoint `POST /api/documents` que:
    1. Sube el archivo binario a AWS S3.
    2. Genera una URL pública/firmada.
    3. Registra la metadata en PostgreSQL (`sgd.documents`).

### Flujo Básico
1. El usuario accede a "Cargar Documento".
2. Arrastra una factura en formato `.xlsx`.
3. El sistema valida el formato y muestra el icono de Excel.
4. El usuario selecciona el tipo "Factura" y añade una nota.
5. El usuario hace clic en "Indexar Documento".
6. El sistema procesa la carga y redirige al Dashboard o Explorer.

---

## 5. Visor y Auditoría (Viewer & History)

**Actor:** Usuario Autenticado (Revisores, Aprobadores).
**Objetivo:** Revisión detallada, trazabilidad completa y toma de decisiones.

### Funcionalidades Implementadas
- **Visor Multi-Formato:**
    - **Imágenes:** Renderizado nativo `<img>`.
    - **PDF:** Renderizado mediante `<iframe>` nativo.
    - **Office (Word/Excel):** Integración con **Microsoft Office Web Viewer** para renderizado fiel en el navegador.
- **Herramientas de Visualización:**
    - **Zoom:** Controles (+ / -) para ajustar el tamaño de visualización (Escala 50% - 300%).
    - **Abrir Original:** Enlace directo al archivo crudo.
- **Panel de Historial (Auditoría):**
    - Pestaña lateral "Historial" conectada a `GET /api/documents/:id/history`.
    - Línea de tiempo cronológica mostrando:
        - Foto/Avatar del usuario.
        - Acción realizada (Carga, Visualización, Aprobación, Rechazo, Actualización).
        - Fecha y Hora exacta.
        - Comentarios o Motivos de rechazo (si aplican).
- **Flujo de Aprobación:**
    - Botón **"Aprobar Documento"** (Verde).
    - Cambia estado a `APPROVED`.
    - Registra evento `APPROVE` en `audit_logs`.
- **Flujo de Rechazo (Con Motivo):**
    - Botón **"Rechazar"** (Rojo).
    - Abre **Modal de Rechazo** bloqueante.
    - Campo de texto obligatorio para "Motivo del rechazo".
    - Cambia estado a `REJECTED`.
    - Registra evento `REJECT` en `audit_logs` guardando el motivo en el campo JSON `details`.

### Flujo de Auditoría Técnica
1. El usuario visualiza un documento.
2. El sistema consulta `sgd.audit_logs`.
3. Si el usuario aprueba, el backend ejecuta una transacción:
    - `UPDATE sgd.documents SET status='APPROVED'`.
    - `INSERT INTO sgd.audit_logs (action='APPROVE', ...)`
4. El frontend refresca automáticamente la lista de historial para mostrar la nueva acción.

---

## 6. Diseñador de Flujos (Workflow Designer)

**Actor:** Administrador del Sistema.
**Objetivo:** Crear y editar flujos de trabajo documentales visualmente.

### Funcionalidades
- Lienzo (Canvas) infinito para diseño.
- Caja de herramientas (Toolbox) con nodos (Estados, Acciones, Reglas).
- Panel de Propiedades para configurar cada nodo.
- Guardar y Publicar flujo.

### Flujo Básico
1. El administrador accede a "Flujos de Trabajo".
2. Selecciona un flujo existente o crea uno nuevo.
3. Arrastra un nodo "Aprobación Legal" al lienzo.
4. Conecta el nodo "Carga" con "Aprobación Legal".
5. Configura en el panel de propiedades quién es el responsable (Rol: Legal).
6. Hace clic en "Publicar Flujo".
7. El sistema guarda la definición del flujo.

---

## 7. Permisos de Usuario (User Permissions)

**Actor:** Administrador de TI / Seguridad.
**Objetivo:** Gestionar usuarios, roles y permisos específicos sobre carpetas/módulos.

### Funcionalidades
- Listado de usuarios del sistema.
- Asignación de Roles (Admin, Editor, Lector).
- Matriz de permisos granulares por carpeta (Lectura, Escritura, Eliminación).

### Flujo Básico
1. El administrador accede a "Seguridad".
2. Busca al usuario "Juan Pérez".
3. Edita sus permisos para la carpeta "Patrimonio Histórico".
4. Marca el checkbox de "Escritura".
5. Hace clic en "Aplicar Cambios".
6. El sistema actualiza los permisos en la base de datos.
