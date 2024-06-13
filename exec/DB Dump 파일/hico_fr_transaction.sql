-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: hico
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `fr_transaction`
--

DROP TABLE IF EXISTS `fr_transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fr_transaction` (
  `balance` decimal(38,2) DEFAULT NULL,
  `fr_balance` decimal(38,2) DEFAULT NULL,
  `is_transacted` bit(1) DEFAULT NULL,
  `country_id` bigint DEFAULT NULL,
  `create_time` datetime(6) DEFAULT NULL,
  `fr_wallet_id` bigint DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `updated_time` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKtforshe1xmyrou1mj19rj1v7v` (`country_id`),
  KEY `FK6ud2iosy4e80op8l0mo65wa0` (`fr_wallet_id`),
  CONSTRAINT `FK6ud2iosy4e80op8l0mo65wa0` FOREIGN KEY (`fr_wallet_id`) REFERENCES `fr_wallet` (`fr_wallet_id`),
  CONSTRAINT `FKtforshe1xmyrou1mj19rj1v7v` FOREIGN KEY (`country_id`) REFERENCES `country` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fr_transaction`
--

LOCK TABLES `fr_transaction` WRITE;
/*!40000 ALTER TABLE `fr_transaction` DISABLE KEYS */;
INSERT INTO `fr_transaction` VALUES (30976.00,23.00,_binary '',1,'2024-04-01 15:51:25.664783',4,2,'2024-04-01 15:51:25.664783');
/*!40000 ALTER TABLE `fr_transaction` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-02 17:46:00
