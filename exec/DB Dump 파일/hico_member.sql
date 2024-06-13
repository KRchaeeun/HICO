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
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `birth_date` date DEFAULT NULL,
  `fuel` int DEFAULT '0',
  `is_tutorial` bit(1) DEFAULT b'0',
  `season_num` int DEFAULT NULL,
  `create_time` datetime(6) DEFAULT NULL,
  `member_id` bigint NOT NULL AUTO_INCREMENT,
  `parent_id` bigint DEFAULT NULL,
  `updated_time` datetime(6) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `invitation code` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `refresh_token` varchar(255) DEFAULT NULL,
  `user_key` varchar(255) DEFAULT NULL,
  `gender` enum('MAN','WOMAN') DEFAULT NULL,
  `role` enum('CHILD','PARENT','ADMIN') DEFAULT NULL,
  PRIMARY KEY (`member_id`),
  KEY `FKct2bucy8ij1i2bks9cu1odroq` (`parent_id`),
  CONSTRAINT `FKct2bucy8ij1i2bks9cu1odroq` FOREIGN KEY (`parent_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES ('2024-03-26',0,_binary '\0',NULL,'2024-03-28 15:09:07.636966',1,NULL,'2024-03-28 15:09:07.636966','test@naver.com','6N4fw7','손주현','$2a$10$yJOencF659UZVpZjFm1DwegxZtAcq7pss.E8V6ffIqJ4owkeRIupq','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiZXhwIjoxNzEyNTYzMDU1fQ.xFKPA_GQajMBZjp3vF13CJNcV_bLFBtaIeV-E3ZSk1nQTR40dnzHsYmefW1Qh8IOTIy8L79hFuT-qeLhXFSQ2g','d3dd15de-a310-4597-81ed-95e24c2890ae','WOMAN','PARENT'),('2024-03-13',0,_binary '\0',NULL,'2024-03-28 15:56:55.565115',4,NULL,'2024-03-28 15:56:55.565115','test@gmail2.com','5Dp8F1','손자식','$2a$10$46ORQ3nt4rsvctqKj7PyLOCetdiPtZr9VLXdXVsAHAF7JvnLTTtpm',NULL,'a875eb82-95fa-461d-906d-f0b894c0f55e','WOMAN','PARENT'),('2024-03-26',5,_binary '\0',NULL,'2024-04-01 15:45:55.017287',6,1,'2024-04-01 17:48:34.548968','test@gmail.com',NULL,'손주현','$2a$10$8PUvvRibwjlpMhBL54MiGuwCMnrAjKZ7e0IPecolGkZOueSvzJM9i','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI2IiwiZXhwIjoxNzEyNjQ4NTU4fQ.lm8MeeWs74VDkUri72cKrZH4jiGxrf9HpbG7380bTo3nZieoXcL6n3mcQl1fl5Ejdbpfy6zbQvbrSnDrzBYFng','49350827-f16b-461f-aed8-ac790cdcc3f3','WOMAN','CHILD'),('2024-03-26',0,_binary '\0',NULL,'2024-04-02 15:21:03.150144',7,NULL,'2024-04-02 15:21:03.150144','parent@naver.com','Yzm806','김신일','$2a$10$3u8ceeaLyFElTo5X8OsqR.q40W./J2u/KO5./xFYsnQ7A08vIFXVe',NULL,'d5ba41a8-165f-4d74-8145-76bbaa3d135b','MAN','PARENT'),('2024-03-26',0,_binary '',NULL,'2024-04-02 15:30:41.597429',8,7,'2024-04-02 15:31:22.168830','child@naver.com',NULL,'김하영','$2a$10$sS25fxZb451Af5KwkPWe4.wbiNtyLF.PoqVbH/mw0k4pZeQ1FbyFS','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4IiwiZXhwIjoxNzEyNjQ0MjY3fQ.-GVuIv18mGcnM5tTmrUcCMQD75A0bgQyFak2sZEqPnBo2ChNCI2Rrp7nTb9JMDq9ohSx2LMSTa2la1qaftzrOQ','92ab06c0-f47a-4d44-9eb2-121e29c7cc0e','MAN','CHILD');
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
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
