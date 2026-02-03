-- Script de Creación de Esquema y Tablas para MiCultura SGD
-- Fecha: 24 Oct 2023

-- 1. Crear Esquema
CREATE SCHEMA IF NOT EXISTS sgd;

-- 2. Tablas de Seguridad y Usuarios (Auth, User Permissions)
CREATE TABLE sgd.roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sgd.users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    department VARCHAR(100),
    role_id INTEGER REFERENCES sgd.roles(id),
    avatar_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Tablas de Documentos (Document Explorer, Upload, Viewer)
CREATE TABLE sgd.document_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL, -- ej. Resolución, Memorando
    code VARCHAR(20) NOT NULL UNIQUE,
    description TEXT
);

CREATE TABLE sgd.documents (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    document_type_id INTEGER REFERENCES sgd.document_types(id),
    file_path VARCHAR(512) NOT NULL, -- Ruta en almacenamiento (S3/Local)
    file_size_bytes BIGINT,
    mime_type VARCHAR(100),
    uploader_id INTEGER REFERENCES sgd.users(id),
    status VARCHAR(50) DEFAULT 'DRAFT', -- DRAFT, REVIEW, APPROVED, REJECTED, ARCHIVED
    ocr_status VARCHAR(50) DEFAULT 'PENDING', -- PENDING, PROCESSING, COMPLETED, FAILED
    ocr_text TEXT, -- Contenido extraído
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sgd.document_metadata (
    id SERIAL PRIMARY KEY,
    document_id INTEGER REFERENCES sgd.documents(id) ON DELETE CASCADE,
    key VARCHAR(100) NOT NULL,
    value TEXT NOT NULL
);

CREATE TABLE sgd.document_versions (
    id SERIAL PRIMARY KEY,
    document_id INTEGER REFERENCES sgd.documents(id) ON DELETE CASCADE,
    version_number INTEGER NOT NULL,
    file_path VARCHAR(512) NOT NULL,
    created_by INTEGER REFERENCES sgd.users(id),
    change_summary TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Tablas de Flujos de Trabajo (Workflow Designer)
CREATE TABLE sgd.workflows (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT FALSE,
    created_by INTEGER REFERENCES sgd.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    definition JSONB -- Almacena la estructura visual del flujo (nodos, conexiones)
);

CREATE TABLE sgd.workflow_states (
    id SERIAL PRIMARY KEY,
    workflow_id INTEGER REFERENCES sgd.workflows(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL -- START, APPROVAL, REVIEW, END
);

-- Estado actual de un documento en un flujo
CREATE TABLE sgd.document_workflow_state (
    id SERIAL PRIMARY KEY,
    document_id INTEGER REFERENCES sgd.documents(id) ON DELETE CASCADE,
    workflow_id INTEGER REFERENCES sgd.workflows(id),
    current_state_id INTEGER REFERENCES sgd.workflow_states(id),
    assigned_to_user_id INTEGER REFERENCES sgd.users(id),
    assigned_to_role_id INTEGER REFERENCES sgd.roles(id),
    started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Tablas de Auditoría y Tareas (Dashboard, History)
CREATE TABLE sgd.audit_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES sgd.users(id),
    action VARCHAR(100) NOT NULL, -- VIEW, DOWNLOAD, APPROVE, REJECT, LOGIN
    entity_type VARCHAR(50) NOT NULL, -- DOCUMENT, USER, WORKFLOW
    entity_id INTEGER NOT NULL,
    details JSONB,
    ip_address VARCHAR(45),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sgd.tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    document_id INTEGER REFERENCES sgd.documents(id),
    assignee_id INTEGER REFERENCES sgd.users(id),
    due_date TIMESTAMP WITH TIME ZONE,
    priority VARCHAR(20) DEFAULT 'MEDIUM', -- LOW, MEDIUM, HIGH, URGENT
    status VARCHAR(50) DEFAULT 'PENDING', -- PENDING, IN_PROGRESS, COMPLETED
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP WITH TIME ZONE
);

-- 6. Permisos Granulares (User Permissions)
CREATE TABLE sgd.folder_permissions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES sgd.users(id),
    folder_name VARCHAR(100) NOT NULL, -- Simulado como nombre de carpeta lógica
    can_read BOOLEAN DEFAULT FALSE,
    can_write BOOLEAN DEFAULT FALSE,
    can_delete BOOLEAN DEFAULT FALSE,
    UNIQUE(user_id, folder_name)
);

-- Datos Semilla (Seed Data)
INSERT INTO sgd.roles (name, description) VALUES 
('ADMIN', 'Administrador del Sistema'),
('USER', 'Usuario General'),
('REVIEWER', 'Revisor Legal');

INSERT INTO sgd.document_types (name, code) VALUES 
('Resolución', 'RES'),
('Memorando', 'MEM'),
('Contrato', 'CON');
