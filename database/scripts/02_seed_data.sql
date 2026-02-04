-- Script de Carga de Datos Dummie (Semilla)
-- Depende de: 01_init_schema.sql

-- 1. Usuarios (5 registros)
-- Passwords hash arcodeados (ej. 'password123')
INSERT INTO sgd.users (email, password_hash, full_name, department, role_id, avatar_url) VALUES
('admin@micultura.gob.pa', '$2a$12$R9h/cIPz0gi.URNNXRxbJOEBa6s.gE.v/g/0w.e.g./w.e.g.e', 'Administrador Sistema', 'Tecnología', 1, 'https://ui-avatars.com/api/?name=Admin+Sys&background=0D8ABC&color=fff'),
('maria.arango@micultura.gob.pa', '$2a$12$R9h/cIPz0gi.URNNXRxbJOEBa6s.gE.v/g/0w.e.g./w.e.g.e', 'Maria Arango', 'Patrimonio Histórico', 3, 'https://ui-avatars.com/api/?name=Maria+Arango&background=random'),
('juan.perez@micultura.gob.pa', '$2a$12$R9h/cIPz0gi.URNNXRxbJOEBa6s.gE.v/g/0w.e.g./w.e.g.e', 'Juan Perez', 'Asesoría Legal', 3, 'https://ui-avatars.com/api/?name=Juan+Perez&background=random'),
('ana.castillo@micultura.gob.pa', '$2a$12$R9h/cIPz0gi.URNNXRxbJOEBa6s.gE.v/g/0w.e.g./w.e.g.e', 'Ana Castillo', 'Secretaría General', 2, 'https://ui-avatars.com/api/?name=Ana+Castillo&background=random'),
('carlos.ruiz@micultura.gob.pa', '$2a$12$R9h/cIPz0gi.URNNXRxbJOEBa6s.gE.v/g/0w.e.g./w.e.g.e', 'Carlos Ruiz', 'Archivo Nacional', 2, 'https://ui-avatars.com/api/?name=Carlos+Ruiz&background=random');

-- 2. Documentos (15 registros, mix de tipos y estados)
-- Tipos: 1=RES, 2=MEM, 3=CON (asumidos del script 01)
INSERT INTO sgd.documents (title, description, document_type_id, file_path, mime_type, uploader_id, status, ocr_status, created_at) VALUES
('Resolución 001-2023 Patrimonio', 'Declaración de sitio histórico Casco Antiguo', 1, '/docs/res-001.pdf', 'application/pdf', 2, 'APPROVED', 'COMPLETED', NOW() - INTERVAL '10 days'),
('Memorando Interno RRHH', 'Ajuste de horarios diciembre', 2, '/docs/mem-int-04.pdf', 'application/pdf', 4, 'DRAFT', 'PENDING', NOW() - INTERVAL '5 days'),
('Contrato de Restauración Iglesia', 'Contrato mayor para obra civil', 3, '/docs/con-rest-02.pdf', 'application/pdf', 3, 'REVIEW', 'PROCESSING', NOW() - INTERVAL '2 days'),
('Informe de Gestión 2023', 'Resumen anual de actividades', 2, '/docs/inf-2023.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 4, 'APPROVED', 'COMPLETED', NOW() - INTERVAL '30 days'),
('Decreto Ley Cultura', 'Borrador de nueva normativa', 1, '/docs/dec-ley-draft.pdf', 'application/pdf', 3, 'REVIEW', 'COMPLETED', NOW() - INTERVAL '1 day'),
('Solicitud de Fondos', 'Para evento verano cultural', 2, '/docs/sol-fondos.pdf', 'application/pdf', 5, 'REJECTED', 'COMPLETED', NOW() - INTERVAL '15 days'),
('Acta de Reunión Directiva', 'Reunión mensual octubre', 2, '/docs/acta-oct.pdf', 'application/pdf', 4, 'APPROVED', 'COMPLETED', NOW() - INTERVAL '20 days'),
('Plan Operativo Anual', 'POA 2024 Dirección de Artes', 1, '/docs/poa-2024.pdf', 'application/pdf', 2, 'DRAFT', 'PENDING', NOW() - INTERVAL '3 days'),
('Contrato Servicios Limpieza', 'Licitación pública 05-2023', 3, '/docs/con-limp.pdf', 'application/pdf', 3, 'APPROVED', 'COMPLETED', NOW() - INTERVAL '40 days'),
('Reglamento Interno', 'Actualización 2023', 1, '/docs/reg-int.pdf', 'application/pdf', 1, 'APPROVED', 'COMPLETED', NOW() - INTERVAL '60 days'),
('Carta de Agradecimiento UNESCO', 'Recibido de oficina regional', 2, '/docs/carta-unesco.pdf', 'application/pdf', 2, 'ARCHIVED', 'COMPLETED', NOW() - INTERVAL '90 days'),
('Presupuesto 2025 Preliminar', 'Versión borrador finanzas', 2, '/docs/pres-2025.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 5, 'DRAFT', 'PENDING', NOW()),
('Resolución Nombramiento', 'Nombramiento Director de Cine', 1, '/docs/res-nomb.pdf', 'application/pdf', 4, 'APPROVED', 'COMPLETED', NOW() - INTERVAL '8 days'),
('Convenio Bilateral Colombia', 'Intercambio cultural 2024', 3, '/docs/conv-col.pdf', 'application/pdf', 3, 'REVIEW', 'COMPLETED', NOW() - INTERVAL '4 days'),
('Manual de Usuario SGD', 'Documentación del sistema', 2, '/docs/manual.pdf', 'application/pdf', 1, 'APPROVED', 'COMPLETED', NOW() - INTERVAL '1 day');

INSERT INTO sgd.document_types (code, name, description) VALUES
('MEMORANDO', 'Memorando', 'Comunicación interna'),
('RESOLUCION', 'Resolución', 'Decisión administrativa'),
('CONTRATO', 'Contrato', 'Acuerdo legal'),
('CARTA', 'Carta', 'Comunicación externa'),
('FACTURA', 'Factura', 'Comprobante de gastos o servicios')
ON CONFLICT (code) DO NOTHING;

-- 3. Flujos de Trabajo (5 registros)
INSERT INTO sgd.workflows (name, description, is_active, created_by) VALUES
('Aprobación Legal Estándar', 'Flujo base para resoluciones y contratos legales', TRUE, 1),
('Revisión Financiera', 'Para documentos que requieren asignación presupuestaria', TRUE, 1),
('Publicación Web', 'Aprobación de contenido para portal de transparencia', TRUE, 4),
('Contratación Menor', 'Flujo simplificado para compras menores', FALSE, 3),
('Correspondencia Oficial', 'Trámite de notas y memorandos externos', TRUE, 1);

-- 4. Tareas (10 registros)
INSERT INTO sgd.tasks (title, description, document_id, assignee_id, priority, status, due_date) VALUES
('Revisar Resolución 001', 'Verificar marco legal de patrimonio', 1, 3, 'HIGH', 'COMPLETED', NOW() - INTERVAL '5 days'),
('Aprobar Contrato Iglesia', 'Pendiente de firma director', 3, 2, 'URGENT', 'PENDING', NOW() + INTERVAL '2 days'),
('Corregir Borrador Decreto', 'Ajustar artículo 5 segun comentarios', 5, 3, 'MEDIUM', 'IN_PROGRESS', NOW() + INTERVAL '5 days'),
('Validar Fondos Verano', 'Confirmar disponibilidad partida', 6, 5, 'HIGH', 'COMPLETED', NOW() - INTERVAL '12 days'),
('Subir Acta Firmada', 'Digitalizar y cargar al sistema', 7, 4, 'LOW', 'COMPLETED', NOW() - INTERVAL '18 days'),
('Revisar POA Artes', 'Alinear con metas estratégicas', 8, 2, 'MEDIUM', 'PENDING', NOW() + INTERVAL '7 days'),
('Auditar Contrato Limpieza', 'Revisión trimestral', 9, 1, 'LOW', 'PENDING', NOW() + INTERVAL '10 days'),
('Traducir Carta UNESCO', 'Para despacho superior', 11, 4, 'MEDIUM', 'COMPLETED', NOW() - INTERVAL '85 days'),
('Analizar Presupuesto', 'Identificar recortes posibles', 12, 5, 'HIGH', 'IN_PROGRESS', NOW() + INTERVAL '1 day'),
('Visto Bueno Convenio', 'Revisión de cancillería', 14, 3, 'URGENT', 'PENDING', NOW() + INTERVAL '3 days');

-- 5. Logs de Auditoría (10 registros simulados)
INSERT INTO sgd.audit_logs (user_id, action, entity_type, entity_id, details, ip_address) VALUES
(1, 'LOGIN', 'USER', 1, '{"method": "password"}', '192.168.1.10'),
(2, 'UPLOAD', 'DOCUMENT', 1, '{"filename": "res-001.pdf"}', '192.168.1.15'),
(3, 'VIEW', 'DOCUMENT', 1, NULL, '192.168.1.20'),
(3, 'APPROVE', 'DOCUMENT', 1, '{"comments": "Todo en orden"}', '192.168.1.20'),
(2, 'LOGIN', 'USER', 2, '{"method": "sso"}', '192.168.1.15'),
(4, 'CREATE', 'DOCUMENT', 2, '{"type": "MEM"}', '192.168.1.25'),
(5, 'REJECT', 'DOCUMENT', 6, '{"reason": "Sin presupuesto"}', '192.168.1.30'),
(1, 'CREATE_WORKFLOW', 'WORKFLOW', 1, '{"name": "Legal Std"}', '192.168.1.10'),
(3, 'DOWNLOAD', 'DOCUMENT', 9, NULL, '192.168.1.20'),
(2, 'VIEW', 'DOCUMENT', 14, NULL, '192.168.1.15');

-- 6. Permisos de Carpetas
INSERT INTO sgd.folder_permissions (user_id, folder_name, can_read, can_write, can_delete) VALUES
(2, 'Patrimonio Histórico', TRUE, TRUE, FALSE),
(3, 'Asesoría Legal', TRUE, TRUE, TRUE),
(4, 'Despacho Superior', TRUE, FALSE, FALSE),
(5, 'Finanzas', TRUE, TRUE, FALSE),
(2, 'General', TRUE, TRUE, TRUE);

