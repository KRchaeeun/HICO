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
-- Table structure for table `stage`
--

DROP TABLE IF EXISTS `stage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stage` (
  `increase` double NOT NULL,
  `stage_num` int NOT NULL,
  `country_id` bigint DEFAULT NULL,
  `create_time` datetime(6) DEFAULT NULL,
  `season_id` bigint DEFAULT NULL,
  `stage_id` bigint NOT NULL AUTO_INCREMENT,
  `updated_time` datetime(6) DEFAULT NULL,
  `stage_title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`stage_id`),
  KEY `FKm83g07iksv0t0mcapovcuwoo4` (`country_id`),
  KEY `FKkgaopsm6aqh984gomnh2ri4kw` (`season_id`),
  CONSTRAINT `FKkgaopsm6aqh984gomnh2ri4kw` FOREIGN KEY (`season_id`) REFERENCES `season` (`season_id`),
  CONSTRAINT `FKm83g07iksv0t0mcapovcuwoo4` FOREIGN KEY (`country_id`) REFERENCES `country` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stage`
--

LOCK TABLES `stage` WRITE;
/*!40000 ALTER TABLE `stage` DISABLE KEYS */;
INSERT INTO `stage` VALUES (0.5,1,1,NULL,NULL,1,NULL,'서부개척시대 - 미국의 확장 (1803-1848년)'),(-0.5,2,1,NULL,NULL,2,NULL,'남북 전쟁 - 내전 시작 (1861-1865년)'),(0,3,1,NULL,NULL,3,NULL,'세계 경제 대공황 - 세계적 위기의 영향 (1900-1920년)'),(0,4,1,NULL,NULL,4,NULL,''),(0,5,1,NULL,NULL,5,NULL,''),(0,1,2,NULL,NULL,6,NULL,'메이지 유신 (1868년)'),(0,2,2,NULL,NULL,7,NULL,'폐쇄정책의 시행과 종료 (1639년-1853년)'),(0,3,2,NULL,NULL,8,NULL,'중일 전쟁 (1894-1895년)'),(0,4,2,NULL,NULL,9,NULL,'러일 전쟁 (1904-1905년)'),(0,5,2,NULL,NULL,10,NULL,''),(0,1,3,NULL,NULL,11,NULL,'나폴레옹 전쟁 기간 - 이탈리아 캠페인 (1796-1815년)'),(0,2,3,NULL,NULL,12,NULL,'이탈리아 통일 운동 - 리소르지멘토 (1815-1871년)'),(0,3,3,NULL,NULL,13,NULL,'로마의 교황령 점령 (1870년)'),(0,4,3,NULL,NULL,14,NULL,'에티오피아와의 전쟁 (1887-1896년)'),(0,5,3,NULL,NULL,15,NULL,'트리플 알리안스 가입 (1882년)'),(0,1,4,NULL,NULL,16,NULL,'아편전쟁 (제1차: 1839-1842년, 제2차: 1856-1860년)'),(0,2,4,NULL,NULL,17,NULL,'청나라의 확장 (1700년대)'),(0,3,4,NULL,NULL,18,NULL,'태평천국의 난 (1850-1864년)'),(0,4,4,NULL,NULL,19,NULL,'중일전쟁 (1894-1895년)'),(0,5,4,NULL,NULL,20,NULL,'신해혁명 (1911년)');
/*!40000 ALTER TABLE `stage` ENABLE KEYS */;
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
