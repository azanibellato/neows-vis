
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `neows`
--

-- --------------------------------------------------------

--
-- Table structure for table `neows`
--

CREATE TABLE `neows` (
  `id` int(11) NOT NULL,
  `nasa_id` int(11) NOT NULL,
  `neos_reference_id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `approach_date` date NOT NULL,
  `diameter` double NOT NULL,
  `magnitude` float NOT NULL,
  `distance` double NOT NULL,
  `velocity` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


--
-- Indexes for table `neows`
--
ALTER TABLE `neows`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nasa_id_unique` (`nasa_id`);


--
-- AUTO_INCREMENT for table `neows`
--
ALTER TABLE `neows`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
