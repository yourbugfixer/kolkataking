-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 12, 2021 at 01:06 AM
-- Server version: 10.3.28-MariaDB-log-cll-lve
-- PHP Version: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kolkajhl_kolkataking`
--

-- --------------------------------------------------------

--
-- Table structure for table `ADMIN_TABLE`
--

CREATE TABLE `ADMIN_TABLE` (
  `ADMIN_ID` int(11) NOT NULL,
  `ADMIN_NAME` varchar(50) NOT NULL,
  `ADMIN_EMAIL` varchar(50) NOT NULL,
  `ADMIN_PASSWORD` char(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ADMIN_TABLE`
--

INSERT INTO `ADMIN_TABLE` (`ADMIN_ID`, `ADMIN_NAME`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`) VALUES
(1, 'Kolkataking', 'kolkataking@gmail.com', '$2b$10$gHSTHbF9qI6iOo7JidI.wOqX85WwqWZEzKqneRDEy9sItx1GaaXNq');

-- --------------------------------------------------------

--
-- Table structure for table `RESULT_TABLE`
--

CREATE TABLE `RESULT_TABLE` (
  `RESULT_ID` int(11) NOT NULL,
  `PATTI_NO` int(11) NOT NULL,
  `PATTI_VALUE` int(11) NOT NULL,
  `RESULT_DATE` int(11) NOT NULL,
  `SCHEDULE_ID` int(11) NOT NULL,
  `RESULT_TIMESTAMP` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `RESULT_TABLE`
--

INSERT INTO `RESULT_TABLE` (`RESULT_ID`, `PATTI_NO`, `PATTI_VALUE`, `RESULT_DATE`, `SCHEDULE_ID`, `RESULT_TIMESTAMP`) VALUES
(1, 123, 1, 1624732200, 1, '2021-06-27 11:52:39'),
(2, 321, 2, 1624732200, 2, '2021-06-27 11:53:26'),
(3, 345, 3, 1624732200, 3, '2021-06-27 11:53:37'),
(4, 888, 4, 1624732200, 4, '2021-06-27 11:53:49'),
(5, 333, 5, 1624732200, 5, '2021-06-27 11:54:14'),
(6, 999, 6, 1624732200, 6, '2021-06-27 11:54:24'),
(7, 765, 7, 1624732200, 7, '2021-06-27 11:54:34'),
(8, 888, 0, 1624732200, 8, '2021-07-03 05:48:35'),
(9, 444, 4, 1624645800, 1, '2021-07-03 12:23:03'),
(12, 98, 9, 1624645800, 4, '2021-07-03 12:24:05'),
(13, 222, 2, 1624645800, 5, '2021-07-03 12:24:29'),
(14, 421, 4, 1624645800, 6, '2021-07-03 12:24:52'),
(15, 345, 2, 1625457600, 1, '2021-07-05 07:41:28'),
(16, 578, 0, 1620792000, 4, '2021-07-05 07:42:48'),
(17, 379, 8, 1625630400, 2, '2021-07-07 10:48:10'),
(18, 170, 8, 1625630400, 1, '2021-07-07 10:39:57');

-- --------------------------------------------------------

--
-- Table structure for table `SCHEDULE_TABLE`
--

CREATE TABLE `SCHEDULE_TABLE` (
  `SCHEDULE_ID` int(11) NOT NULL,
  `RESULT_TIME` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `SCHEDULE_TABLE`
--

INSERT INTO `SCHEDULE_TABLE` (`SCHEDULE_ID`, `RESULT_TIME`) VALUES
(1, 1625495400),
(2, 1625500800),
(3, 1625506200),
(4, 1625511600),
(5, 1625517000),
(6, 1625522400),
(7, 1625527800),
(8, 1625533200);

-- --------------------------------------------------------

--
-- Table structure for table `TIPS_TABLE`
--

CREATE TABLE `TIPS_TABLE` (
  `TIP_ID` int(11) NOT NULL,
  `TIP` varchar(10) NOT NULL,
  `TIP_DATE` int(11) NOT NULL,
  `STATUS` varchar(20) NOT NULL,
  `SCHEDULE_ID` int(11) NOT NULL,
  `TIP_TIME` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `TIPS_TABLE`
--

INSERT INTO `TIPS_TABLE` (`TIP_ID`, `TIP`, `TIP_DATE`, `STATUS`, `SCHEDULE_ID`, `TIP_TIME`) VALUES
(1, '2,3,4,5', 1624732200, 'correct', 1, '2021-06-27 11:54:54'),
(2, '6,7,8,9', 1624732200, 'wrong', 2, '2021-06-27 11:55:01'),
(3, '1,4,8,9', 1625457600, 'correct', 3, '2021-07-05 07:40:11'),
(4, '1,4,8,9', 1625630400, 'wrong', 5, '2021-07-07 10:45:45'),
(5, '1,4,8,9', 1625630400, 'correct', 8, '2021-07-07 10:53:01');

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
