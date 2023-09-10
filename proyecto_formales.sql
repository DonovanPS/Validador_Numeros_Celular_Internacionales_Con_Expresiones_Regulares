-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-09-2023 a las 18:20:57
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proyecto_formales`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `country`
--

CREATE TABLE `country` (
  `CountryID` int(11) NOT NULL,
  `CountryName` varchar(255) NOT NULL,
  `CountryCode` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `country`
--

INSERT INTO `country` (`CountryID`, `CountryName`, `CountryCode`) VALUES
(1, 'Afganistán', '93'),
(2, 'Kuwait', '965'),
(3, 'Albania', '355'),
(4, 'Lesoto', '266'),
(5, 'Alemania', '49'),
(6, 'Letonia', '371'),
(7, 'Andorra', '376'),
(8, 'Líbano', '961'),
(9, 'Angola', '244'),
(10, 'Liberia', '231'),
(11, 'Anguila', '1264'),
(12, 'Libia', '218'),
(13, 'Antártida', '672'),
(14, 'Liechtenstein', '41'),
(15, 'Antigua y Barbuda', '1268'),
(16, 'Lituania', '370'),
(17, 'Antillas Holandesas', '599'),
(18, 'Luxemburgo', '352'),
(19, 'Arabia Saudí', '966'),
(20, 'Macao', '853'),
(21, 'Argelia', '213'),
(22, 'Macedonia', '389'),
(23, 'Argentina', '54'),
(24, 'Madagascar', '261'),
(25, 'Armenia', '374'),
(26, 'Malasia', '60'),
(27, 'Aruba', '297'),
(28, 'Malawi', '265'),
(29, 'Ascensión', '247'),
(30, 'Maldivas', '960'),
(31, 'Australia', '61'),
(32, 'Mali', '223'),
(33, 'Austria', '43'),
(34, 'Malta', '356'),
(35, 'Azerbaiyán', '994'),
(36, 'Marruecos', '212'),
(37, 'Bahamas', '1242'),
(38, 'Martinica', '596'),
(39, 'Bahréin', '973'),
(40, 'Mauricio', '230'),
(41, 'Bangladesh', '880'),
(42, 'Mauritania', '222'),
(43, 'Barbados', '1246'),
(44, 'Mayotte', '269'),
(45, 'Bielorrusia', '375'),
(46, 'México', '52'),
(47, 'Bélgica', '32'),
(48, 'Myanmar', '95'),
(49, 'Belice', '501'),
(50, 'Moldavia', '373'),
(51, 'Benin', '229'),
(52, 'Mónaco', '377'),
(53, 'Bermuda', '1441'),
(54, 'Mongolia', '976'),
(55, 'Bután', '975'),
(56, 'Montserrat', '1664'),
(57, 'Bolivia', '591'),
(58, 'Mozambique', '258'),
(59, 'Bosnia y Herzegovina', '387'),
(60, 'Namibia', '264'),
(61, 'Botswana', '267'),
(62, 'Nauru', '674'),
(63, 'Brasil', '55'),
(64, 'Nepal', '977'),
(65, 'Brunei Darussalam', '673'),
(66, 'Nicaragua', '505'),
(67, 'Bulgaria', '359'),
(68, 'Níger', '227'),
(69, 'Burkina Faso', '226'),
(70, 'Nigeria', '234'),
(71, 'Burundi', '257'),
(72, 'Niue', '683'),
(73, 'Cabo Verde', '238'),
(74, 'Noruega', '47'),
(75, 'Camboya', '855'),
(76, 'Nueva Caledonia', '687'),
(77, 'Camerún', '237'),
(78, 'Nueva Zelanda', '64'),
(79, 'Canadá', '1'),
(80, 'Omán', '968'),
(81, 'Chad', '235'),
(82, 'Países Bajos', '31'),
(83, 'Chequia', '420'),
(84, 'Pakistán', '92'),
(85, 'Chile', '56'),
(86, 'Palaos', '680'),
(87, 'China', '86'),
(88, 'Palestina', '970'),
(89, 'Chipre', '357'),
(90, 'Panamá', '507'),
(91, 'Colombia', '57'),
(92, 'Papúa Nueva Guinea', '675'),
(93, 'Comoras', '269'),
(94, 'Paraguay', '595'),
(95, 'Costa de Marfil', '225'),
(96, 'Perú', '51'),
(97, 'Costa Rica', '506'),
(98, 'Pitcairn', '872'),
(99, 'Croacia', '385'),
(100, 'Polinesia Francesa', '689'),
(101, 'Cuba', '53'),
(102, 'Polonia', '48'),
(103, 'Dinamarca', '45'),
(104, 'Portugal', '351'),
(105, 'Yibuti', '253'),
(106, 'Puerto Rico', '1'),
(107, 'Dominica', '1767'),
(108, 'Catar', '974'),
(109, 'Ecuador', '593'),
(110, 'Reino Unido', '44'),
(111, 'Egipto', '20'),
(112, 'República Centroafricana', '236'),
(113, 'El Salvador', '503'),
(114, 'Corea del Sur', '82'),
(115, 'Emiratos Árabes Unidos', '971'),
(116, 'Irlanda', '353'),
(117, 'Eritrea', '291'),
(118, 'República del Congo', '242'),
(119, 'Eslovaquia', '421'),
(120, 'República Democrática del Congo', '243'),
(121, 'Eslovenia', '386'),
(122, 'Corea del Norte', '850'),
(123, 'España', '34'),
(124, 'Laos', '856'),
(125, 'Micronesia', '691'),
(126, 'República Dominicana', '1809'),
(127, 'Estados Unidos', '1'),
(128, 'Reunión', '262'),
(129, 'Estonia', '372'),
(130, 'Ruanda', '250'),
(131, 'Islas Svalbard y Jan Mayen', '79'),
(132, 'Rumania', '40'),
(133, 'Etiopía', '251'),
(134, 'Rusia', '7'),
(135, 'Fiyi', '679'),
(136, 'Sahara Occidental', '212'),
(137, 'Filipinas', '63'),
(138, 'Samoa', '685'),
(139, 'Finlandia', '358'),
(140, 'Samoa Americana', '684'),
(141, 'Francia', '33'),
(142, 'San Marino', '378'),
(143, 'Gabón', '241'),
(144, 'San Pedro y Miquelón', '508'),
(145, 'Gambia', '220'),
(146, 'San Vicente y las Granadinas', '1784'),
(147, 'Georgia', '995'),
(148, 'Santa Elena', '290'),
(149, 'Ghana', '233'),
(150, 'San Cristóbal y Nieves', '1869'),
(151, 'Gibraltar', '350'),
(152, 'Santa Lucía', '1758'),
(153, 'Granada', '1473'),
(154, 'Santo Tomé y Príncipe', '239'),
(155, 'Grecia', '30'),
(156, 'Senegal', '221'),
(157, 'Groenlandia', '299'),
(158, 'Serbia', '381'),
(159, 'Guadalupe', '590'),
(160, 'Seychelles', '248'),
(161, 'Guam', '1671'),
(162, 'Sierra Leona', '232'),
(163, 'Guatemala', '502'),
(164, 'Somalia', '252'),
(165, 'Guernsey', '44'),
(166, 'Siria', '963'),
(167, 'Guinea', '224'),
(168, 'Sudáfrica', '27'),
(169, 'Guinea Ecuatorial', '240'),
(170, 'Suazilandia', '268'),
(171, 'Guinea-Bissau', '245'),
(172, 'Sudán', '249'),
(173, 'Haití', '509'),
(174, 'Suecia', '46'),
(175, 'Honduras', '504'),
(176, 'Suiza', '41'),
(177, 'Hong Kong', '852'),
(178, 'Surinam', '597'),
(179, 'Hungría', '36'),
(180, 'Tailandia', '66'),
(181, 'India', '91'),
(182, 'Taiwán', '886'),
(183, 'Indonesia', '62'),
(184, 'Tayikistán', '992'),
(185, 'Irak', '964'),
(186, 'Tanzania', '255'),
(187, 'Irán', '98'),
(188, 'Territorio Británico del Océano Índico', '246'),
(189, 'Isla de Navidad', '61'),
(190, 'Timor Oriental', '670'),
(191, 'Islandia', '354'),
(192, 'Togo', '228'),
(193, 'Islas Caimán', '1345'),
(194, 'Tonga', '676'),
(195, 'Islas Cook', '682'),
(196, 'Tokelau', '690'),
(197, 'Islas Marianas del Norte', '1670'),
(198, 'Tongo', '676'),
(199, 'Islas Feroe', '298'),
(200, 'Trinidad y Tobago', '1868'),
(201, 'Islas Malvinas', '500'),
(202, 'Túnez', '216'),
(203, 'Islas Marshall', '692'),
(204, 'Turkmenistán', '993'),
(205, 'Islas Norfolk', '672'),
(206, 'Turquía', '90'),
(207, 'Islas Salomón', '677'),
(208, 'Tuvalu', '688'),
(209, 'Islas Turcas y Caicos', '1649'),
(210, 'Ucrania', '380'),
(211, 'Islas Ultramarinas de Estados Unidos', '808'),
(212, 'Uganda', '256'),
(213, 'Islas Vírgenes Británicas', '1284'),
(214, 'Unión Soviética', '7'),
(215, 'Islas Vírgenes de Estados Unidos', '1340'),
(216, 'Uruguay', '598'),
(217, 'Isla de Man', '44'),
(218, 'Uzbekistán', '998'),
(219, 'Israel', '972'),
(220, 'Vanuatu', '678'),
(221, 'Italia', '39'),
(222, 'Ciudad del Vaticano', '379'),
(223, 'Jamaica', '1876'),
(224, 'Venezuela', '58'),
(225, 'Japón', '81'),
(226, 'Vietnam', '84'),
(227, 'Jersey', '44'),
(228, 'Wallis y Futuna', '681'),
(229, 'Jordania', '962'),
(230, 'Yemen', '967'),
(231, 'Kazajstán', '7'),
(232, 'Zaire', '243'),
(233, 'Kirguistán', '996'),
(234, 'Zambia', '260'),
(235, 'Kiribati', '686'),
(236, 'Zimbabue', '263');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `phonenumber`
--

CREATE TABLE `phonenumber` (
  `PhoneNumberID` int(11) NOT NULL,
  `PhoneNumber` varchar(20) NOT NULL,
  `CountryID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `regexpattern`
--

CREATE TABLE `regexpattern` (
  `PatternID` int(11) NOT NULL,
  `CountryID` int(11) DEFAULT NULL,
  `RegexPattern` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `regexpattern`
--

INSERT INTO `regexpattern` (`PatternID`, `CountryID`, `RegexPattern`) VALUES
(1, 1, '^\\+93[7][0-9]{1}\\d{7}$'),
(2, 2, '^\\+965\\d{7,8}$'),
(3, 3, '^\\+355\\d{8}$'),
(4, 4, '^\\+266[56]\\d{7}$');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `country`
--
ALTER TABLE `country`
  ADD PRIMARY KEY (`CountryID`);

--
-- Indices de la tabla `phonenumber`
--
ALTER TABLE `phonenumber`
  ADD PRIMARY KEY (`PhoneNumberID`),
  ADD KEY `CountryID` (`CountryID`);

--
-- Indices de la tabla `regexpattern`
--
ALTER TABLE `regexpattern`
  ADD PRIMARY KEY (`PatternID`),
  ADD KEY `CountryID` (`CountryID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `country`
--
ALTER TABLE `country`
  MODIFY `CountryID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=237;

--
-- AUTO_INCREMENT de la tabla `phonenumber`
--
ALTER TABLE `phonenumber`
  MODIFY `PhoneNumberID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `regexpattern`
--
ALTER TABLE `regexpattern`
  MODIFY `PatternID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `phonenumber`
--
ALTER TABLE `phonenumber`
  ADD CONSTRAINT `phonenumber_ibfk_1` FOREIGN KEY (`CountryID`) REFERENCES `country` (`CountryID`);

--
-- Filtros para la tabla `regexpattern`
--
ALTER TABLE `regexpattern`
  ADD CONSTRAINT `regexpattern_ibfk_1` FOREIGN KEY (`CountryID`) REFERENCES `country` (`CountryID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
