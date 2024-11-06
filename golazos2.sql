-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-11-2024 a las 00:28:42
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `golazos2`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carritos`
--

CREATE TABLE `carritos` (
  `id` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `categoria` varchar(100) NOT NULL,
  `nivel` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id`, `parent_id`, `categoria`, `nivel`) VALUES
(1, NULL, 'Hombre', 1),
(2, NULL, 'Mujer', 1),
(3, NULL, 'Infantil', 1),
(4, NULL, 'Accesorios', 1),
(5, 1, 'Indumentaria', 2),
(6, 1, 'Calzado', 2),
(7, 2, 'Indumentaria', 2),
(8, 2, 'Calzado', 2),
(9, 3, 'Indumentaria', 2),
(10, 3, 'Calzado', 2),
(11, 4, 'Equipamiento', 2),
(12, 4, 'Complementos deportivos', 2),
(13, 4, 'Transporte y almacenamiento', 2),
(14, 6, 'Zapatillas', 3),
(15, 6, 'Botines', 3),
(16, 6, 'Ojotas y chinelas', 3),
(17, 5, 'Camisetas', 3),
(18, 5, 'Remeras', 3),
(19, 5, 'Camperas', 3),
(20, 5, 'Buzos', 3),
(21, 5, 'Conjuntos', 3),
(22, 5, 'Shorts', 3),
(23, 8, 'Zapatillas', 3),
(24, 8, 'Botines', 3),
(25, 8, 'Ojotas y chinelas', 3),
(26, 7, 'Camisetas', 3),
(27, 7, 'Remeras', 3),
(28, 7, 'Camperas', 3),
(29, 7, 'Buzos', 3),
(30, 7, 'Conjuntos', 3),
(31, 7, 'Shorts', 3),
(32, 10, 'Zapatillas', 3),
(33, 10, 'Botines', 3),
(34, 10, 'Ojotas y chinelas', 3),
(35, 9, 'Camisetas', 3),
(36, 9, 'Remeras', 3),
(37, 9, 'Camperas', 3),
(38, 9, 'Buzos', 3),
(39, 9, 'Conjuntos', 3),
(40, 9, 'Shorts', 3),
(41, 11, 'Pelotas', 3),
(42, 11, 'Conos', 3),
(43, 11, 'Infladores', 3),
(44, 11, 'Redes', 3),
(45, 11, 'Silbatos', 3),
(46, 12, 'Vendas', 3),
(47, 12, 'Medias', 3),
(48, 12, 'Vinchas', 3),
(49, 12, 'Pecheras', 3),
(50, 13, 'Mochilas', 3),
(51, 13, 'Bolsos', 3),
(52, 13, 'Botineros', 3),
(53, 13, 'Riñoneras', 3),
(54, 5, 'Pantalones', 3),
(55, 7, 'Pantalones', 3),
(56, 9, 'Pantalones', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `marcas`
--

CREATE TABLE `marcas` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `marcas`
--

INSERT INTO `marcas` (`id`, `descripcion`) VALUES
(1, 'Adidas'),
(2, 'Nike'),
(3, 'Puma'),
(4, 'Umbro'),
(5, 'Under Armour'),
(6, 'Kappa'),
(7, 'Joma'),
(8, 'New Balance'),
(9, 'Mizuno'),
(10, 'Diadora'),
(11, 'Hummel'),
(12, 'Lotto'),
(13, 'Erreà'),
(14, 'Reebok'),
(15, 'Kelme'),
(16, 'Sondico'),
(17, 'Le Coq Sportif'),
(18, 'Fila'),
(19, 'Warrior Sports'),
(20, 'Uhlsport'),
(21, 'Ñandu');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` longtext NOT NULL,
  `imagen` varchar(255) NOT NULL,
  `color` varchar(255) NOT NULL,
  `precio` decimal(8,2) NOT NULL,
  `id_talle` int(11) DEFAULT NULL,
  `id_marca` int(11) NOT NULL,
  `id_categoria` int(11) DEFAULT NULL,
  `oferta` tinyint(1) DEFAULT NULL,
  `descuento` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `descripcion`, `imagen`, `color`, `precio`, `id_talle`, `id_marca`, `id_categoria`, `oferta`, `descuento`) VALUES
(64, 'PELOTA', 'erterterterterterter', 'image-e4fc5423790bfca7.jpg', 'Azul', 2536.36, 59, 1, 41, NULL, NULL),
(82, '', 'red profesional para arcos profesionales', 'default.jpg', 'blanco', 3500.00, 59, 1, 18, NULL, NULL),
(87, 'werwerw', 'rerererererererererere', 'default.jpg', 'cfdfsdf', 2000.00, 59, 1, 35, NULL, NULL),
(88, '34534', 'dfggdfgdfgdfgdgdfgdfgdfgdfgdf', 'default.jpg', 'terter', 34343.00, 59, 1, 36, NULL, NULL),
(89, 'fdgdgdfgd', 'dfgdfgdfgdfgdfgdfgdfgdf', 'default.jpg', 'dfgdf', 454345.00, 59, 1, 37, NULL, NULL),
(90, 'dfgdfgdf', 'dfgdfgdfgdfgdfgdfgdfg', 'default.jpg', 'dfgdf', 342342.00, 59, 1, 33, NULL, NULL),
(91, 'sdfsdf', 'sdfsdfsdfsdfsdfsdfsdfsd', 'default.jpg', 'sdfsd', 234234.00, 59, 1, 35, NULL, NULL),
(92, 'dsadas', 'asdasdasdasdsadsaasdasd', 'default.jpg', 'sdfsd', 4554.00, 59, 1, 38, NULL, NULL),
(94, 'asdasdas', 'asasasdasdasdasdasdasdas', 'default.jpg', 'asda', 23.00, 59, 1, 38, NULL, NULL),
(95, 'sgg', 'gggggggggggggggggggggggggggggg', 'default.jpg', 'sdfsdf', 34343.00, 59, 1, 39, NULL, NULL),
(96, 'sdf', 'sdfsdfsdfsdfsdfsdfsdfsdf', 'default.jpg', 'red', 3435.66, 59, 1, 41, NULL, NULL),
(97, 'Camiseta Heartstopper', 'Camiseta dryfit con colores vivos', 'default.jpg', 'Blanco', 6559.00, 59, 1, 43, NULL, NULL),
(98, 'werewrew', 'werwerwerwerwerwerwerwerewr', 'default.jpg', 'azul', 1234.00, 59, 1, 44, NULL, NULL),
(99, 'dfgdfgd', 'dfgdfgdfgdfgdfgdfgdfgdf', 'default.jpg', 'dfgdfg', 345345.00, 59, 1, 44, NULL, NULL),
(100, '4rrrrrrrrrrrr', 'rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr', 'default.jpg', 'fgdfg', 45454.00, 59, 1, 25, NULL, NULL),
(101, 'dsfsdfsd', 'sdddddddddddddddddddddddddddddd', 'default.jpg', 'sdfsd', 2232.00, 59, 1, 24, NULL, NULL),
(102, 'gfhfg', 'fghfghfghfghfghfghfghfgh', 'default.jpg', 'fghfg', 44.00, 59, 1, 24, NULL, NULL),
(103, 'Calzado de moda', 'dlaskjdlaksldasdasdasa', 'default.jpg', 'blanco y rojo', 2454.00, 59, 1, 30, NULL, NULL),
(104, 'sdfsdfs', 'sdfsdfsdfsdfsdfsdfsdfsdfsd', 'default.jpg', 'fsdfsd', 343434.00, 59, 1, 25, NULL, NULL),
(105, 'Conjunto', 'dfgdfgdfgdfgdfgdfgdfgdf', 'default.jpg', 'Azul y blanco', 25600.00, 59, 1, 28, 1, 35);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `talles`
--

CREATE TABLE `talles` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `talles`
--

INSERT INTO `talles` (`id`, `descripcion`) VALUES
(1, 'xs'),
(2, 's'),
(3, 'm'),
(4, 'l'),
(5, 'xl'),
(6, 'xxl'),
(7, 'xxxl'),
(8, '10'),
(9, '11'),
(10, '12'),
(11, '13'),
(12, '14'),
(13, '15'),
(14, '16'),
(15, '17'),
(16, '18'),
(17, '19'),
(18, '20'),
(19, '21'),
(20, '22'),
(21, '23'),
(22, '24'),
(23, '25'),
(24, '26'),
(25, '27'),
(26, '28'),
(27, '29'),
(28, '30'),
(29, '31'),
(30, '32'),
(31, '33'),
(32, '34'),
(33, '35'),
(34, '36'),
(35, '37'),
(36, '38'),
(37, '39'),
(38, '40'),
(39, '41'),
(40, '42'),
(41, '43'),
(42, '44'),
(43, '45'),
(44, '46'),
(45, '47'),
(46, '48'),
(47, '49'),
(48, '50'),
(49, '51'),
(50, '52'),
(51, '53'),
(52, '54'),
(53, '55'),
(54, '56'),
(55, '57'),
(56, '58'),
(57, '59'),
(58, '60'),
(59, 'sin talla');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `dni` varchar(50) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `domicilio` varchar(255) NOT NULL,
  `pais` varchar(255) NOT NULL,
  `nombre_usuario` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `tipo_usuario` varchar(255) NOT NULL,
  `genero` varchar(20) NOT NULL,
  `foto_perfil` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `apellido`, `dni`, `telefono`, `domicilio`, `pais`, `nombre_usuario`, `email`, `password`, `tipo_usuario`, `genero`, `foto_perfil`) VALUES
(1, 'María', 'González', '87654321', '5491187654321', 'Calle Falsa 123', 'Argentina', 'maria_g', 'maria.g@example.com', 'maria123', 'vendedor', 'mujer', 'maria.jpg'),
(2, 'Carlos', 'López', '23456789', '5491123456789', 'Calle Corrientes 456', 'Uruguay', 'carlos_lopez', 'carlos@example.com', 'carlos456', 'admin', 'hombre', 'carlos.jpg'),
(3, 'Ana', 'Martínez', '34567890', '5491134567890', 'Calle Florida 789', 'Chile', 'ana_martinez', 'ana@example.com', 'ana789', 'comprador', 'mujer', 'ana.jpg'),
(4, 'Pedro', 'Ramírez', '45678901', '5491145678901', 'Calle Santa Fe 321', 'Argentina', 'pedro_r', 'pedro@example.com', 'pedro1234', 'vendedor', 'hombre', 'pedro.jpg'),
(5, 'Laura', 'Fernández', '56789012', '5491156789012', 'Calle San Juan 654', 'Paraguay', 'laura_f', 'laura@example.com', 'laura567', 'admin', 'mujer', 'laura.jpg'),
(6, 'Javier', 'Pérez', '67890123', '5491167890123', 'Calle Mendoza 987', 'Perú', 'javier_perez', 'javier@example.com', 'javier789', 'comprador', 'hombre', 'javier.jpg'),
(7, 'Lucía', 'Rodríguez', '78901234', '5491178901234', 'Calle Córdoba 159', 'Bolivia', 'lucia_r', 'lucia@example.com', 'lucia456', 'vendedor', 'mujer', 'lucia.jpg'),
(8, 'Martín', 'Gómez', '89012345', '5491189012345', 'Calle Chacabuco 357', 'Argentina', 'martin_g', 'martin@example.com', 'martin123', 'admin', 'hombre', 'martin.jpg'),
(9, 'Sofía', 'Álvarez', '90123456', '5491190123456', 'Calle Libertador 753', 'Argentina', 'sofia_a', 'sofia@example.com', 'sofia123', 'comprador', 'mujer', 'sofia.jpg'),
(10, 'Franco', 'Díaz', '12398765', '5491109876543', 'Calle Alberdi 258', 'Brasil', 'franco_d', 'franco@example.com', 'franco789', 'vendedor', 'hombre', 'franco.jpg'),
(11, 'Elena', 'Ruiz', '45632178', '5491112345678', 'Calle Belgrano 951', 'Chile', 'elena_r', 'elena@example.com', 'elena123', 'admin', 'mujer', 'elena.jpg'),
(12, 'Mateo', 'Suárez', '78965412', '5491123456789', 'Calle Alsina 753', 'Argentina', 'mateo_s', 'mateo@example.com', 'mateo567', 'comprador', 'hombre', 'mateo.jpg'),
(13, 'Gabriela', 'Molina', '12365498', '5491134567890', 'Calle Lavalle 852', 'Uruguay', 'gabriela_m', 'gabriela@example.com', 'gabriela123', 'vendedor', 'mujer', 'gabriela.jpg'),
(14, 'Tomás', 'Benítez', '34587654', '5491145678901', 'Calle Moreno 486', 'Paraguay', 'tomas_b', 'tomas@example.com', 'tomas456', 'admin', 'hombre', 'tomas.jpg'),
(15, 'Julieta', 'Vega', '56743289', '5491156789012', 'Calle San Martín 357', 'Argentina', 'julieta_v', 'julieta@example.com', 'julieta123', 'comprador', 'mujer', 'julieta.jpg'),
(16, 'Agustín', 'Silva', '67854321', '5491167890123', 'Calle Rivadavia 753', 'Chile', 'agustin_s', 'agustin@example.com', 'agustin789', 'vendedor', 'hombre', 'agustin.jpg'),
(17, 'Camila', 'Herrera', '89023456', '5491178901234', 'Calle Entre Ríos 159', 'Perú', 'camila_h', 'camila@example.com', 'camila456', 'admin', 'mujer', 'camila.jpg'),
(18, 'Alejandro', 'Medina', '90176543', '5491189012345', 'Calle Mitre 951', 'Argentina', 'alejandro_m', 'alejandro@example.com', 'alejandro123', 'comprador', 'hombre', 'alejandro.jpg'),
(19, 'Valentina', 'Sánchez', '43219876', '5491190123456', 'Calle Uruguay 753', 'Bolivia', 'valentina_s', 'valentina@example.com', 'valentina123', 'vendedor', 'mujer', 'valentina.jpg'),
(20, 'dfgdfg', 'dfgdfg', '43543534', '34535435', 'dfgdfgdf', '', '', '', '$2a$10$cUPMs.5J.ZHurRQNRRV9/elyIbBeqZJ/M9u2coxkVBaIs5EVUyHji', '', '', ''),
(21, 'cvcv345345345345', 'èrez', '34534534', '3453345345453', 'dfg', '', '', 'b@gmail.com', '$2a$10$gWG6trT2JU3KzW4Wt38EQ.Rpcip8NfBapVbmtfxmALoDrrLt6PkUi', '', '', ''),
(22, 'Juan', 'Romario', '11569864', '3805465985', 'juramento 2335', 'France', 'Juanelito', 'juan@gmail.com', '$2a$10$vQAnnmiBSBMlAYTLn9B/PewCNy8Wnyv0myoatPNFLeKuYyBg1Xo36', 'admin', 'no-binario', 'user-7835415b8b63e707.jpeg'),
(23, 'Marcos', 'Flores', '11356982', '234234234234', 'VIRGEN DEL ROSARIO 239', 'United Arab Emirates', 'dffdsvbnvbn', 'marcosfabian@gmail.com', '123456789', 'vendedor', 'hombre', 'default.jpg'),
(24, 'Juan', '', '', '', '', 'Republic of the Congo', 'cach', 'vv@gmail.com', '$2a$10$ektUY9gWTmufV8WLQCjc0.Z.EMPtvSVMpJ251GI0G.w/UIdpzZ67S', 'admin', 'hombre', 'user-5280e34acad79343.jpg'),
(25, 'Marcos Fabian', 'Flores', '43535454', '435435345', 'dfgdf', 'Barbados', 'marcos85', 'gg@gmail.com', '$2a$10$DMsJlVl3wbTc04B1ohW3cuXa7PgTWcOWYUt27nexuMdbUKwRWauJq', 'admin', 'hombre', 'user-8acfab308569f258.jpg');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carritos`
--
ALTER TABLE `carritos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD KEY `id_producto_idx` (`id_producto`),
  ADD KEY `fk_carrito_usuario_idx` (`id_usuario`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categorias_categorias_FK` (`parent_id`);

--
-- Indices de la tabla `marcas`
--
ALTER TABLE `marcas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD KEY `id_talles_idx` (`id_talle`),
  ADD KEY `id_marcas_idx` (`id_marca`),
  ADD KEY `productos_categorias_FK` (`id_categoria`);

--
-- Indices de la tabla `talles`
--
ALTER TABLE `talles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD UNIQUE KEY `email_UNIQUE` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `carritos`
--
ALTER TABLE `carritos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT de la tabla `marcas`
--
ALTER TABLE `marcas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=106;

--
-- AUTO_INCREMENT de la tabla `talles`
--
ALTER TABLE `talles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=117;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carritos`
--
ALTER TABLE `carritos`
  ADD CONSTRAINT `fk_carrito_producto` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`),
  ADD CONSTRAINT `fk_carrito_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `id_marcas` FOREIGN KEY (`id_marca`) REFERENCES `marcas` (`id`),
  ADD CONSTRAINT `id_talles` FOREIGN KEY (`id_talle`) REFERENCES `talles` (`id`),
  ADD CONSTRAINT `productos_categorias_FK` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
