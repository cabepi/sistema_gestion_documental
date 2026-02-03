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

---

## 2. Dashboard Principal (Main Dashboard)

**Actor:** Usuario Autenticado.
**Objetivo:** Visualizar métricas clave y gestionar tareas pendientes.

### Funcionalidades
- Visualización de métricas generales (Total Documentos, Pendientes, Nuevas Cargas).
- Bandeja de Entrada "Resumida" con tareas prioritarias.
- Accesos rápidos a módulos del sistema.

### Flujo Básico
1. El usuario accede al Dashboard.
2. El sistema carga las métricas actualizadas y las tareas asignadas al usuario.
3. El usuario revisa la información.
4. El usuario hace clic en una tarea de la bandeja.
5. El sistema redirige a la pantalla de **Visor de Documentos** o **Detalle de Tarea**.

---

## 3. Explorador de Documentos (Document Explorer)

**Actor:** Usuario Autenticado.
**Objetivo:** Buscar, filtrar y gestionar el repositorio de documentos.

### Funcionalidades
- Listado de documentos con paginación.
- Filtros por: Rango de Fechas, Etiquetas, Tipo de Archivo.
- Búsqueda por texto libre.
- Acciones por documento: Ver, Descargar, Compartir.

### Flujo Básico
1. El usuario navega a la sección "Documentos".
2. El sistema lista los documentos disponibles según los permisos del usuario.
3. El usuario aplica un filtro (ej. "Tipo: Legal").
4. El sistema actualiza la lista.
5. El usuario selecciona "Ver" en un documento.
6. El sistema redirige al **Visor de Documentos**.

### Flujos Alternos
- **Sin Resultados:** Si la búsqueda no arroja coincidencias, el sistema muestra un mensaje de "No se encontraron documentos".

---

## 4. Carga e Indexación (Upload & Indexing)

**Actor:** Usuario con permisos de carga (ej. Archivo Nacional, Secretaría).
**Objetivo:** Subir nuevos documentos y asignarles metadatos (Indexación).

### Funcionalidades
- Carga de archivos (Drag & Drop o Selección).
- Previsualización del documento cargado.
- Extracción automática de texto (OCR simulado).
- Formulario de metadatos (Tipo documental, Título, Fecha, etc.).

### Flujo Básico
1. El usuario accede a "Carga e Indexación".
2. El usuario selecciona un archivo PDF.
3. El sistema carga el archivo y muestra la previsualización.
4. El sistema ejecuta el proceso OCR (simulado) y muestra el progreso.
5. El usuario completa o valida los metadatos en el formulario derecho.
6. El usuario hace clic en "Finalizar Indexación".
7. El sistema guarda el documento y sus metadatos en la base de datos "sgd".
8. El sistema confirma el éxito y limpia el formulario.

---

## 5. Visor y Auditoría (Viewer & History)

**Actor:** Usuario Autenticado (Revisores, Aprobadores).
**Objetivo:** Analizar un documento, ver su historial y tomar acciones (Aprobar/Rechazar).

### Funcionalidades
- Visualización del documento (PDF).
- Barra de herramientas (Zoom, Descargar).
- Panel lateral de metadatos y auditoría (Historial de versiones y accesos).
- Botones de acción de flujo (Aprobar, Rechazar).

### Flujo Básico (Aprobación)
1. El usuario abre un documento pendiente de revisión.
2. El usuario lee el contenido en el visor.
3. El usuario revisa el historial en el panel lateral.
4. El usuario hace clic en "Aprobar Documento".
5. El sistema registra la aprobación y cambia el estado del documento.
6. El sistema notifica al siguiente responsable en el flujo.

### Flujo Alterno (Rechazo)
1. El usuario detecta un error en el documento.
2. El usuario hace clic en "Rechazar".
3. El sistema solicita un motivo de rechazo.
4. El usuario ingresa el motivo y confirma.
5. El documento regresa al estado anterior o al autor.

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
