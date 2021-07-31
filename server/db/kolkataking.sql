-- phpMyAdmin SQL Dump
-- version 4.9.7deb1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 31, 2021 at 07:54 PM
-- Server version: 8.0.26-0ubuntu0.21.04.3
-- PHP Version: 7.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kolkataking`
--

-- --------------------------------------------------------

--
-- Table structure for table `ADMIN_TABLE`
--

CREATE TABLE `ADMIN_TABLE` (
  `ADMIN_ID` int NOT NULL,
  `ADMIN_NAME` varchar(50) NOT NULL,
  `ADMIN_EMAIL` varchar(50) NOT NULL,
  `ADMIN_PASSWORD` char(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `ADMIN_TABLE`
--

INSERT INTO `ADMIN_TABLE` (`ADMIN_ID`, `ADMIN_NAME`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`) VALUES
(2, 'Kolkataking', 'kolkataking@gmail.com', '$2b$10$6GnIs/7doyhkPLazdA0tlufQdHx3DlsOVUKUuqOyZDqmdAlXgjWfK');

-- --------------------------------------------------------

--
-- Table structure for table `RESULT_TABLE`
--

CREATE TABLE `RESULT_TABLE` (
  `RESULT_ID` int NOT NULL,
  `PATTI_NO` varchar(10) NOT NULL DEFAULT '***',
  `PATTI_VALUE` varchar(10) NOT NULL DEFAULT '-',
  `RESULT_DATE` int NOT NULL,
  `SCHEDULE_ID` int NOT NULL,
  `RESULT_TIMESTAMP` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `SCHEDULE_TABLE`
--

CREATE TABLE `SCHEDULE_TABLE` (
  `SCHEDULE_ID` int NOT NULL,
  `RESULT_TIME` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `SCHEDULE_TABLE`
--

INSERT INTO `SCHEDULE_TABLE` (`SCHEDULE_ID`, `RESULT_TIME`) VALUES
(2, 1626654600);

-- --------------------------------------------------------

--
-- Table structure for table `TIPS_TABLE`
--

CREATE TABLE `TIPS_TABLE` (
  `TIP_ID` int NOT NULL,
  `TIP` varchar(10) NOT NULL,
  `TIP_DATE` int NOT NULL,
  `STATUS` varchar(20) NOT NULL,
  `SCHEDULE_ID` int NOT NULL,
  `TIP_TIME` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ADMIN_TABLE`
--
ALTER TABLE `ADMIN_TABLE`
  ADD PRIMARY KEY (`ADMIN_ID`);

--
-- Indexes for table `RESULT_TABLE`
--
ALTER TABLE `RESULT_TABLE`
  ADD PRIMARY KEY (`RESULT_ID`);

--
-- Indexes for table `SCHEDULE_TABLE`
--
ALTER TABLE `SCHEDULE_TABLE`
  ADD PRIMARY KEY (`SCHEDULE_ID`);

--
-- Indexes for table `TIPS_TABLE`
--
ALTER TABLE `TIPS_TABLE`
  ADD PRIMARY KEY (`TIP_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ADMIN_TABLE`
--
ALTER TABLE `ADMIN_TABLE`
  MODIFY `ADMIN_ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `RESULT_TABLE`
--
ALTER TABLE `RESULT_TABLE`
  MODIFY `RESULT_ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `SCHEDULE_TABLE`
--
ALTER TABLE `SCHEDULE_TABLE`
  MODIFY `SCHEDULE_ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `TIPS_TABLE`
--
ALTER TABLE `TIPS_TABLE`
  MODIFY `TIP_ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
