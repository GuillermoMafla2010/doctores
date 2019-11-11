-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-11-2019 a las 23:48:30
-- Versión del servidor: 10.4.6-MariaDB
-- Versión de PHP: 7.1.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `hospital`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `citas`
--

CREATE TABLE `citas` (
  `id` int(11) NOT NULL,
  `sintomas` varchar(255) NOT NULL,
  `fecha` date NOT NULL,
  `solucion` varchar(255) NOT NULL,
  `hora_id` int(11) NOT NULL,
  `medico_id` int(11) NOT NULL,
  `especialidad_id` int(11) NOT NULL,
  `paciente_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `citas`
--

INSERT INTO `citas` (`id`, `sintomas`, `fecha`, `solucion`, `hora_id`, `medico_id`, `especialidad_id`, `paciente_id`) VALUES
(1, 'dolor', '2019-10-14', '', 1, 1, 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `diagnosticos`
--

CREATE TABLE `diagnosticos` (
  `id` int(11) NOT NULL,
  `diagnostico` varchar(255) NOT NULL,
  `cita_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `especialidades`
--

CREATE TABLE `especialidades` (
  `id` int(11) NOT NULL,
  `nombre_especialidad` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `especialidades`
--

INSERT INTO `especialidades` (`id`, `nombre_especialidad`) VALUES
(1, 'General'),
(2, 'Pediatria'),
(3, 'Oftanmologia'),
(4, '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horas`
--

CREATE TABLE `horas` (
  `id` int(11) NOT NULL,
  `horas_laborables` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `horas`
--

INSERT INTO `horas` (`id`, `horas_laborables`) VALUES
(1, '09:00-10:00'),
(2, '10:00-11:00'),
(3, '11:00-12:00'),
(4, '12:00-13:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medicos`
--

CREATE TABLE `medicos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `celular` varchar(20) NOT NULL,
  `email` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `medicos`
--

INSERT INTO `medicos` (`id`, `nombre`, `apellido`, `celular`, `email`) VALUES
(1, 'Marco ', 'Armijos', '98239231213', 'marco@hotmail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medicos_especialidades`
--

CREATE TABLE `medicos_especialidades` (
  `id` int(11) NOT NULL,
  `medico_id` int(11) NOT NULL,
  `especialidad_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `medicos_especialidades`
--

INSERT INTO `medicos_especialidades` (`id`, `medico_id`, `especialidad_id`) VALUES
(1, 1, 1),
(2, 1, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pacientes`
--

CREATE TABLE `pacientes` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `celular` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `pacientes`
--

INSERT INTO `pacientes` (`id`, `nombre`, `apellido`, `email`, `celular`) VALUES
(1, 'cris', 'fernandez', 'cfernean@gmail.com', '0983195553'),
(2, 'Diana', 'Mafla', 'diana@hotmail.com', '0983698412'),
(3, 'Carlos ', 'Guzman', 'cguzman@gmail.com', '0983195552'),
(4, 'Carlos ', 'Guzman', 'cguzman@gmail.com', '0983195552'),
(5, 'Luis', 'Gomez', 'lgomez@hotmail.com', '098319553'),
(6, 'Luis', 'Gomez', 'lgomez@hotmail.com', '098319553');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `citas`
--
ALTER TABLE `citas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `hora_id` (`hora_id`),
  ADD KEY `medico_id` (`medico_id`,`especialidad_id`),
  ADD KEY `especialidad_id` (`especialidad_id`),
  ADD KEY `paciente_id` (`paciente_id`);

--
-- Indices de la tabla `especialidades`
--
ALTER TABLE `especialidades`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `horas`
--
ALTER TABLE `horas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `medicos`
--
ALTER TABLE `medicos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `medicos_especialidades`
--
ALTER TABLE `medicos_especialidades`
  ADD PRIMARY KEY (`id`),
  ADD KEY `medico_id` (`medico_id`),
  ADD KEY `especialidad_id` (`especialidad_id`);

--
-- Indices de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  ADD PRIMARY KEY (`id`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `citas`
--
ALTER TABLE `citas`
  ADD CONSTRAINT `citas_ibfk_1` FOREIGN KEY (`medico_id`) REFERENCES `medicos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `citas_ibfk_2` FOREIGN KEY (`especialidad_id`) REFERENCES `especialidades` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `citas_ibfk_3` FOREIGN KEY (`hora_id`) REFERENCES `horas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `citas_ibfk_4` FOREIGN KEY (`paciente_id`) REFERENCES `pacientes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `medicos_especialidades`
--
ALTER TABLE `medicos_especialidades`
  ADD CONSTRAINT `medicos_especialidades_ibfk_1` FOREIGN KEY (`medico_id`) REFERENCES `medicos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `medicos_especialidades_ibfk_2` FOREIGN KEY (`especialidad_id`) REFERENCES `especialidades` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
