-- ==============================================================================
-- PITL - Plataforma de Integración Territorial de Lenguazaque
-- Script de Datos de Prueba (Mock Data) para MySQL / phpMyAdmin
-- Tabla: institucion_educativas
-- ==============================================================================

USE `laravel`; -- Modificar por el nombre de la BD en caso de ser diferente (ej. pgc_pitl)

-- Limpieza preventiva para evitar duplicados
TRUNCATE TABLE `institucion_educativas`;

INSERT INTO `institucion_educativas` (`id`, `nombre`, `zona_territorial`, `numero_estudiantes`, `created_at`, `updated_at`) VALUES
(1, 'Institución Educativa Departamental Nacionalizado de Lenguazaque (Sede Principal)', 'Urbana', 640, NOW(), NOW()),
(2, 'IED Técnico Comercial de Lenguazaque', 'Urbana', 480, NOW(), NOW()),
(3, 'Colegio Departamental San Juan Bautista', 'Urbana', 310, NOW(), NOW()),
(4, 'Escuela Rural Gachaneca', 'Rural', 65, NOW(), NOW()),
(5, 'Escuela Rural Ramada Alta', 'Rural', 42, NOW(), NOW()),
(6, 'Escuela Rural Ramada Baja', 'Rural', 58, NOW(), NOW()),
(7, 'Centro Educativo Rural Siatama', 'Rural', 84, NOW(), NOW()),
(8, 'Escuela Rural Tibita', 'Rural', 51, NOW(), NOW()),
(9, 'Escuela Rural Salitre', 'Rural', 39, NOW(), NOW()),
(10, 'Escuela Rural Paunita', 'Rural', 33, NOW(), NOW()),
(11, 'Escuela Rural Faracavita', 'Rural', 47, NOW(), NOW()),
(12, 'Centro Educativo Rural El Espinal Carrizal', 'Rural', 76, NOW(), NOW()),
(13, 'Escuela Rural Chirvaneque', 'Rural', 28, NOW(), NOW()),
(14, 'Escuela Rural La Fragua', 'Rural', 34, NOW(), NOW());
