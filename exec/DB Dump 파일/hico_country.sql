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
-- Table structure for table `country`
--

DROP TABLE IF EXISTS `country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `country` (
  `create_time` datetime(6) DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `updated_time` datetime(6) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `country_name` varchar(255) DEFAULT NULL,
  `fr_type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `country`
--

LOCK TABLES `country` WRITE;
/*!40000 ALTER TABLE `country` DISABLE KEYS */;
INSERT INTO `country` VALUES (NULL,1,NULL,'USD','미국','미국 달러'),(NULL,2,NULL,'JPY','일본','일본 옌'),(NULL,3,NULL,'EUR','이탈리아','유로'),(NULL,4,NULL,'CNH','중국','위안화'),(NULL,5,NULL,'AED','아랍에미리트','아랍에미리트 디르함'),(NULL,6,NULL,'AUD','호주','호주 달러'),(NULL,7,NULL,'BHD','바레인','바레인 디나르'),(NULL,8,NULL,'BND','브루나이','브루나이 달러'),(NULL,9,NULL,'CAD','캐나다','캐나다 달러'),(NULL,10,NULL,'CHF','스위스','스위스 프랑'),(NULL,11,NULL,'DKK','덴마크','덴마크 크로네'),(NULL,12,NULL,'GBP','영국','영국 파운드'),(NULL,13,NULL,'HKD','홍콩','홍콩 달러'),(NULL,14,NULL,'IDR','인도네시아','인도네시아 루피아'),(NULL,15,NULL,'KRW','한국','한국 원'),(NULL,16,NULL,'KWD','쿠웨이트','쿠웨이트 디나르'),(NULL,17,NULL,'MYR','말레이시아','말레이시아 링기트'),(NULL,18,NULL,'NOK','노르웨이','노르웨이 크로네'),(NULL,19,NULL,'NZD','뉴질랜드','뉴질랜드 달러'),(NULL,20,NULL,'SAR','사우디아라비아','사우디아라비아 리얄'),(NULL,21,NULL,'SEK','스웨덴','스웨덴 크로나'),(NULL,22,NULL,'SGD','싱가포르','싱가포르 달러'),(NULL,23,NULL,'THB','태국','태국 바트');
/*!40000 ALTER TABLE `country` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-02 17:46:01
