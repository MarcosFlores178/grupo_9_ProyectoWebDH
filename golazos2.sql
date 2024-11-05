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
(12, 2, 'Indumentaria', 2),
(13, 2, 'Calzado', 2),
(15, 3, 'Indumentaria', 2),
(16, 3, 'Calzado', 2),
(18, 4, 'Equipamiento', 2),
(19, 4, 'Complementos deportivos', 2),
(20, 4, 'Transporte y almacenamiento', 2),
(21, 6, 'Zapatillas', 3),
(22, 6, 'Botines', 3),
(23, 6, 'Ojotas y chinelas', 3),
(24, 5, 'Camisetas', 3),
(25, 5, 'Remeras', 3),
(26, 5, 'Camperas', 3),
(27, 5, 'Buzos', 3),
(28, 5, 'Conjuntos', 3),
(29, 5, 'Shorts', 3),
(30, 13, 'Zapatillas', 3),
(31, 13, 'Botines', 3),
(32, 13, 'Ojotas y chinelas', 3),
(33, 12, 'Camisetas', 3),
(34, 12, 'Remeras', 3),
(35, 12, 'Camperas', 3),
(36, 12, 'Buzos', 3),
(37, 12, 'Conjuntos', 3),
(38, 12, 'Shorts', 3),
(39, 16, 'Zapatillas', 3),
(40, 16, 'Botines', 3),
(41, 16, 'Ojotas y chinelas', 3),
(42, 15, 'Camisetas', 3),
(43, 15, 'Remeras', 3),
(44, 15, 'Camperas', 3),
(45, 15, 'Buzos', 3),
(46, 15, 'Conjuntos', 3),
(47, 15, 'Shorts', 3),
(48, 18, 'Pelotas', 3),
(49, 18, 'Conos', 3),
(50, 18, 'Infladores', 3),
(51, 18, 'Redes', 3),
(52, 18, 'Silbatos', 3),
(53, 19, 'Vendas', 3),
(54, 19, 'Medias', 3),
(55, 19, 'Vinchas', 3),
(56, 19, 'Pecheras', 3),
(57, 20, 'Mochilas', 3),
(58, 20, 'Bolsos', 3),
(59, 20, 'Botineros', 3),
(60, 20, 'Riñoneras', 3),
(61, 5, 'Pantalones', 3),
(62, 12, 'Pantalones', 3),
(63, 15, 'Pantalones', 3);

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
(21, 'Adidas'),
(22, 'Nike'),
(23, 'Puma'),
(24, 'Umbro'),
(25, 'Under Armour'),
(26, 'Kappa'),
(27, 'Joma'),
(28, 'New Balance'),
(29, 'Mizuno'),
(30, 'Diadora'),
(31, 'Hummel'),
(32, 'Lotto'),
(33, 'Erreà'),
(34, 'Reebok'),
(35, 'Kelme'),
(36, 'Sondico'),
(37, 'Le Coq Sportif'),
(38, 'Fila'),
(39, 'Warrior Sports'),
(40, 'Uhlsport'),
(41, 'Ñandu');

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
(64, 'PELOTA', 'erterterterterterter', 'image-e4fc5423790bfca7.jpg', 'Azul', 2536.36, 68, 21, NULL, NULL, NULL),
(82, '', 'red profesional para arcos profesionales', 'default.jpg', 'blanco', 3500.00, 73, 34, NULL, NULL, NULL),
(87, 'werwerw', 'rerererererererererere', 'default.jpg', 'cfdfsdf', 2000.00, 76, 39, NULL, NULL, NULL),
(88, '34534', 'dfggdfgdfgdfgdgdfgdfgdfgdfgdf', 'default.jpg', 'terter', 34343.00, 77, 40, NULL, NULL, NULL),
(89, 'fdgdgdfgd', 'dfgdfgdfgdfgdfgdfgdfgdf', 'default.jpg', 'dfgdf', 454345.00, 75, 39, NULL, NULL, NULL),
(90, 'dfgdfgdf', 'dfgdfgdfgdfgdfgdfgdfg', 'default.jpg', 'dfgdf', 342342.00, 71, 35, NULL, NULL, NULL),
(91, 'sdfsdf', 'sdfsdfsdfsdfsdfsdfsdfsd', 'default.jpg', 'sdfsd', 234234.00, 71, 34, NULL, NULL, NULL),
(92, 'dsadas', 'asdasdasdasdsadsaasdasd', 'default.jpg', 'sdfsd', 4554.00, 75, 38, NULL, NULL, NULL),
(94, 'asdasdas', 'asasasdasdasdasdasdasdas', 'default.jpg', 'asda', 23.00, 71, 38, NULL, NULL, NULL),
(95, 'sgg', 'gggggggggggggggggggggggggggggg', 'default.jpg', 'sdfsdf', 34343.00, 72, 35, NULL, NULL, NULL),
(96, 'sdf', 'sdfsdfsdfsdfsdfsdfsdfsdf', 'default.jpg', 'red', 3435.66, 71, 34, NULL, NULL, NULL),
(97, 'Camiseta Heartstopper', 'Camiseta dryfit con colores vivos', 'default.jpg', 'Blanco', 6559.00, 75, 38, NULL, NULL, NULL),
(98, 'werewrew', 'werwerwerwerwerwerwerwerewr', 'default.jpg', 'azul', 1234.00, 75, 40, NULL, NULL, NULL),
(99, 'dfgdfgd', 'dfgdfgdfgdfgdfgdfgdfgdf', 'default.jpg', 'dfgdfg', 345345.00, 74, 38, NULL, NULL, NULL),
(100, '4rrrrrrrrrrrr', 'rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr', 'default.jpg', 'fgdfg', 45454.00, NULL, 35, 25, NULL, NULL),
(101, 'dsfsdfsd', 'sdddddddddddddddddddddddddddddd', 'default.jpg', 'sdfsd', 2232.00, NULL, 36, 24, NULL, NULL),
(102, 'gfhfg', 'fghfghfghfghfghfghfghfgh', 'default.jpg', 'fghfg', 44.00, 71, 36, 24, NULL, NULL),
(103, 'Calzado de moda', 'dlaskjdlaksldasdasdasa', 'default.jpg', 'blanco y rojo', 2454.00, 71, 35, 30, NULL, NULL),
(104, 'sdfsdfs', 'sdfsdfsdfsdfsdfsdfsdfsdfsd', 'default.jpg', 'fsdfsd', 343434.00, 72, 34, 25, NULL, NULL),
(105, 'Conjunto', 'dfgdfgdfgdfgdfgdfgdfgdf', 'default.jpg', 'Azul y blanco', 25600.00, 77, 38, 28, 1, 35);

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
(59, 'xs'),
(60, 's'),
(61, 'm'),
(62, 'l'),
(63, 'xl'),
(64, 'xxl'),
(65, 'xxxl'),
(66, '10'),
(67, '11'),
(68, '12'),
(69, '13'),
(70, '14'),
(71, '15'),
(72, '16'),
(73, '17'),
(74, '18'),
(75, '19'),
(76, '20'),
(77, '21'),
(78, '22'),
(79, '23'),
(80, '24'),
(81, '25'),
(82, '26'),
(83, '27'),
(84, '28'),
(85, '29'),
(86, '30'),
(87, '31'),
(88, '32'),
(89, '33'),
(90, '34'),
(91, '35'),
(92, '36'),
(93, '37'),
(94, '38'),
(95, '39'),
(96, '40'),
(97, '41'),
(98, '42'),
(99, '43'),
(100, '44'),
(101, '45'),
(102, '46'),
(103, '47'),
(104, '48'),
(105, '49'),
(106, '50'),
(107, '51'),
(108, '52'),
(109, '53'),
(110, '54'),
(111, '55'),
(112, '56'),
(113, '57'),
(114, '58'),
(115, '59'),
(116, '60');

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
(20, 'María', 'González', '87654321', '5491187654321', 'Calle Falsa 123', 'Argentina', 'maria_g', 'maria.g@example.com', 'maria123', 'vendedor', 'mujer', 'maria.jpg'),
(21, 'Carlos', 'López', '23456789', '5491123456789', 'Calle Corrientes 456', 'Uruguay', 'carlos_lopez', 'carlos@example.com', 'carlos456', 'admin', 'hombre', 'carlos.jpg'),
(22, 'Ana', 'Martínez', '34567890', '5491134567890', 'Calle Florida 789', 'Chile', 'ana_martinez', 'ana@example.com', 'ana789', 'comprador', 'mujer', 'ana.jpg'),
(23, 'Pedro', 'Ramírez', '45678901', '5491145678901', 'Calle Santa Fe 321', 'Argentina', 'pedro_r', 'pedro@example.com', 'pedro1234', 'vendedor', 'hombre', 'pedro.jpg'),
(24, 'Laura', 'Fernández', '56789012', '5491156789012', 'Calle San Juan 654', 'Paraguay', 'laura_f', 'laura@example.com', 'laura567', 'admin', 'mujer', 'laura.jpg'),
(25, 'Javier', 'Pérez', '67890123', '5491167890123', 'Calle Mendoza 987', 'Perú', 'javier_perez', 'javier@example.com', 'javier789', 'comprador', 'hombre', 'javier.jpg'),
(26, 'Lucía', 'Rodríguez', '78901234', '5491178901234', 'Calle Córdoba 159', 'Bolivia', 'lucia_r', 'lucia@example.com', 'lucia456', 'vendedor', 'mujer', 'lucia.jpg'),
(27, 'Martín', 'Gómez', '89012345', '5491189012345', 'Calle Chacabuco 357', 'Argentina', 'martin_g', 'martin@example.com', 'martin123', 'admin', 'hombre', 'martin.jpg'),
(28, 'Sofía', 'Álvarez', '90123456', '5491190123456', 'Calle Libertador 753', 'Argentina', 'sofia_a', 'sofia@example.com', 'sofia123', 'comprador', 'mujer', 'sofia.jpg'),
(29, 'Franco', 'Díaz', '12398765', '5491109876543', 'Calle Alberdi 258', 'Brasil', 'franco_d', 'franco@example.com', 'franco789', 'vendedor', 'hombre', 'franco.jpg'),
(30, 'Elena', 'Ruiz', '45632178', '5491112345678', 'Calle Belgrano 951', 'Chile', 'elena_r', 'elena@example.com', 'elena123', 'admin', 'mujer', 'elena.jpg'),
(31, 'Mateo', 'Suárez', '78965412', '5491123456789', 'Calle Alsina 753', 'Argentina', 'mateo_s', 'mateo@example.com', 'mateo567', 'comprador', 'hombre', 'mateo.jpg'),
(32, 'Gabriela', 'Molina', '12365498', '5491134567890', 'Calle Lavalle 852', 'Uruguay', 'gabriela_m', 'gabriela@example.com', 'gabriela123', 'vendedor', 'mujer', 'gabriela.jpg'),
(33, 'Tomás', 'Benítez', '34587654', '5491145678901', 'Calle Moreno 486', 'Paraguay', 'tomas_b', 'tomas@example.com', 'tomas456', 'admin', 'hombre', 'tomas.jpg'),
(34, 'Julieta', 'Vega', '56743289', '5491156789012', 'Calle San Martín 357', 'Argentina', 'julieta_v', 'julieta@example.com', 'julieta123', 'comprador', 'mujer', 'julieta.jpg'),
(35, 'Agustín', 'Silva', '67854321', '5491167890123', 'Calle Rivadavia 753', 'Chile', 'agustin_s', 'agustin@example.com', 'agustin789', 'vendedor', 'hombre', 'agustin.jpg'),
(36, 'Camila', 'Herrera', '89023456', '5491178901234', 'Calle Entre Ríos 159', 'Perú', 'camila_h', 'camila@example.com', 'camila456', 'admin', 'mujer', 'camila.jpg'),
(37, 'Alejandro', 'Medina', '90176543', '5491189012345', 'Calle Mitre 951', 'Argentina', 'alejandro_m', 'alejandro@example.com', 'alejandro123', 'comprador', 'hombre', 'alejandro.jpg'),
(38, 'Valentina', 'Sánchez', '43219876', '5491190123456', 'Calle Uruguay 753', 'Bolivia', 'valentina_s', 'valentina@example.com', 'valentina123', 'vendedor', 'mujer', 'valentina.jpg'),
(39, 'dfgdfg', 'dfgdfg', '43543534', '34535435', 'dfgdfgdf', '', '', '', '$2a$10$cUPMs.5J.ZHurRQNRRV9/elyIbBeqZJ/M9u2coxkVBaIs5EVUyHji', '', '', ''),
(40, 'cvcv345345345345', 'èrez', '34534534', '3453345345453', 'dfg', '', '', 'b@gmail.com', '$2a$10$gWG6trT2JU3KzW4Wt38EQ.Rpcip8NfBapVbmtfxmALoDrrLt6PkUi', '', '', ''),
(41, 'Juan', 'Romario', '11569864', '3805465985', 'juramento 2335', 'France', 'Juanelito', 'juan@gmail.com', '$2a$10$vQAnnmiBSBMlAYTLn9B/PewCNy8Wnyv0myoatPNFLeKuYyBg1Xo36', 'admin', 'no-binario', 'user-7835415b8b63e707.jpeg'),
(42, 'Marcos', 'Flores', '11356982', '234234234234', 'VIRGEN DEL ROSARIO 239', 'United Arab Emirates', 'dffdsvbnvbn', 'marcosfabian@gmail.com', '123456789', 'vendedor', 'hombre', 'default.jpg'),
(43, 'Juan', '', '', '', '', 'Republic of the Congo', 'cach', 'vv@gmail.com', '$2a$10$ektUY9gWTmufV8WLQCjc0.Z.EMPtvSVMpJ251GI0G.w/UIdpzZ67S', 'admin', 'hombre', 'user-5280e34acad79343.jpg'),
(44, 'Marcos Fabian', 'Flores', '43535454', '435435345', 'dfgdf', 'Barbados', 'marcos85', 'gg@gmail.com', '$2a$10$DMsJlVl3wbTc04B1ohW3cuXa7PgTWcOWYUt27nexuMdbUKwRWauJq', 'admin', 'hombre', 'user-8acfab308569f258.jpg');

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
