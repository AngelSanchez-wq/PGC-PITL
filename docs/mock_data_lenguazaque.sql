-- ==============================================================================
-- PITL - Plataforma de Integración Territorial de Lenguazaque
-- Script de Migración y Datos de Prueba (Mock Data) para MySQL / phpMyAdmin
-- Capacidad 1: Instituciones Educativas
-- Capacidad 2 (HU-09): Zonas Territoriales y Solicitudes de Gobernanza
-- ==============================================================================

USE `laravel`; -- Ajustar según el nombre de tu base de datos en phpMyAdmin

-- 1. Tabla: zonas_territoriales
CREATE TABLE IF NOT EXISTS `zonas_territoriales` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `zonas_territoriales_nombre_unique` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Semilla de Zonas Territoriales
INSERT INTO `zonas_territoriales` (`id`, `nombre`, `created_at`, `updated_at`) VALUES
(1, 'Urbana', NOW(), NOW()),
(2, 'Rural', NOW(), NOW())
ON DUPLICATE KEY UPDATE `nombre` = VALUES(`nombre`);

-- 3. Actualización de institucion_educativas con clave foránea zona_territorial_id
ALTER TABLE `institucion_educativas`
  ADD COLUMN IF NOT EXISTS `zona_territorial_id` BIGINT UNSIGNED NULL AFTER `zona_territorial`;

-- Backfill de zona_territorial_id
UPDATE `institucion_educativas` SET `zona_territorial_id` = 1 WHERE `zona_territorial` = 'Urbana';
UPDATE `institucion_educativas` SET `zona_territorial_id` = 2 WHERE `zona_territorial` = 'Rural';

-- 4. Tabla: solicitudes_gobernanza (HU-09)
CREATE TABLE IF NOT EXISTS `solicitudes_gobernanza` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `zona_territorial_id` BIGINT UNSIGNED NOT NULL,
  `asunto` VARCHAR(255) NOT NULL,
  `descripcion` TEXT NOT NULL,
  `estado` VARCHAR(50) NOT NULL DEFAULT 'Pendiente',
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `solicitudes_gobernanza_zona_territorial_id_foreign` (`zona_territorial_id`),
  CONSTRAINT `solicitudes_gobernanza_zona_territorial_id_foreign`
    FOREIGN KEY (`zona_territorial_id`) REFERENCES `zonas_territoriales` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Datos de prueba para solicitudes (claramente rotulados como de ejemplo)
INSERT INTO `solicitudes_gobernanza` (`zona_territorial_id`, `asunto`, `descripcion`, `estado`, `created_at`, `updated_at`) VALUES
(2, '[Ejemplo] Solicitud de adecuación de vía veredal', '[Ejemplo] Se requiere nivelación de terreno y mantenimiento de cunetas para transporte escolar.', 'Pendiente', NOW(), NOW()),
(1, '[Ejemplo] Revisión de alumbrado público comunal', '[Ejemplo] Mantenimiento preventivo de luminarias en el perímetro del parque principal.', 'En Revisión', NOW(), NOW()),
(2, '[Ejemplo] Apoyo para transporte escolar en temporada de lluvias', '[Ejemplo] Articulación de ruta veredal de apoyo para sedes rurales.', 'Pendiente', NOW(), NOW());
