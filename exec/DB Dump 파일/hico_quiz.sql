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
-- Table structure for table `quiz`
--

DROP TABLE IF EXISTS `quiz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quiz` (
  `create_time` datetime(6) DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `quiz_level_id` bigint DEFAULT NULL,
  `stage_id` bigint DEFAULT NULL,
  `updated_time` datetime(6) DEFAULT NULL,
  `quiz_answer` varchar(255) DEFAULT NULL,
  `quiz_question` varchar(255) DEFAULT NULL,
  `quiz_type` enum('OX','SHORT_ANSWER') DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKs6f5or2qhw379n7hhp535b2r` (`quiz_level_id`),
  KEY `FKdk767udlg82gf226ixcgp3e7h` (`stage_id`),
  CONSTRAINT `FKdk767udlg82gf226ixcgp3e7h` FOREIGN KEY (`stage_id`) REFERENCES `stage` (`stage_id`),
  CONSTRAINT `FKs6f5or2qhw379n7hhp535b2r` FOREIGN KEY (`quiz_level_id`) REFERENCES `quiz_level` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quiz`
--

LOCK TABLES `quiz` WRITE;
/*!40000 ALTER TABLE `quiz` DISABLE KEYS */;
INSERT INTO `quiz` VALUES (NULL,41,1,1,NULL,'X','루이지애나 구매로 인해 미국은 캐나다까지 영토를 확장했다.','OX'),(NULL,42,1,1,NULL,'O','골드러시 동안 캘리포니아의 인구는 크게 증가했다.','OX'),(NULL,43,1,1,NULL,'X','서부 개척 시대에는 인터넷이 사용되었다.','OX'),(NULL,44,2,1,NULL,'O','대륙횡단철도는 동부와 서부를 연결하는 첫 번째 철도였다.','OX'),(NULL,45,2,1,NULL,'X','인디언 전쟁은 주로 동부에서 발생했다.','OX'),(NULL,46,2,1,NULL,'X','서부의 마을에서는 모두가 금광을 찾기 위해 왔다.','OX'),(NULL,47,1,1,NULL,'캘리포니아','금을 최초로 발견한 지역은 어디인가요?','SHORT_ANSWER'),(NULL,48,2,1,NULL,'서','루이지애나 구매 후 사람들은 주로 _쪽으로 이주하기 시작했다.','SHORT_ANSWER'),(NULL,49,3,1,NULL,'1803','루이지애나 구매가 이루어진 해는 몇 년도인가요?','SHORT_ANSWER'),(NULL,50,3,1,NULL,'1869','대륙횡단철도가 완성된 연도는 몇 년도인가요?','SHORT_ANSWER'),(NULL,51,1,2,NULL,'O','남부는 미국 남북 전쟁 전야에 독립을 선언하며 연방에서 탈퇴했다.','OX'),(NULL,52,1,2,NULL,'X','남북 전쟁 초기, 북부의 정치인들은 남부의 탈퇴에 놀라지 않았다.','OX'),(NULL,53,1,2,NULL,'O','남북 전쟁 동안 정부는 전쟁 자금을 마련하기 위해 대량의 화폐를 인쇄했다.','OX'),(NULL,54,2,2,NULL,'X','남부의 경제는 전쟁으로 인해 황폐화되었으며, 많은 농장과 공장이 파괴되었다.','OX'),(NULL,55,2,2,NULL,'O','북부에서는 전쟁 중에도 물가가 안정적이었다.','OX'),(NULL,56,2,2,NULL,'X','전쟁 후 남부와 북부는 경제적 재건을 위해 즉시 협력하기 시작했다.','OX'),(NULL,57,1,2,NULL,'탈퇴','남부가 연방에서 탈퇴한 것을 공식적으로 선언한 문서는 \"_ _\" 선언문이라고 한다.','SHORT_ANSWER'),(NULL,58,2,2,NULL,'군사','남북 전쟁 초기, 북부 정부가 직면한 주요 경제적 도전은 대규모 \"_ _\" 자금 도달이었다.','SHORT_ANSWER'),(NULL,59,3,2,NULL,'화폐','전쟁 중 남부에서 경험한 경제적 현상으로, 화폐 가치가 급격히 하락한 이유는 대량의 \"_ _\" 발행이다.','SHORT_ANSWER'),(NULL,60,3,2,NULL,'여성','북부 경제에서 전쟁이 가져온 긍정적 변화는 군수품 생산 증가와 \"_ _\" 노동자 증가이다.','SHORT_ANSWER'),(NULL,61,4,6,NULL,'O','메이지 유신은 일본의 근대화를 이끈 중요한 사건이다.','OX'),(NULL,62,4,6,NULL,'O','페리 제독은 1853년에 일본을 개방하도록 요구한 인물이다.','OX'),(NULL,63,4,6,NULL,'O','일본의 메이지 유신 이후, 황실이 중앙에 권력을 회복했다.','OX'),(NULL,64,5,6,NULL,'O','메이지 유신으로 인해 일본은 서양의 영향을 받아 근대화가 이루어졌다.','OX'),(NULL,65,5,6,NULL,'X','에도 시대 말기에는 다이묘와 사무라이들이 주요한 권력을 가졌다.','OX'),(NULL,66,5,6,NULL,'X','메이지 유신은 에도 시기에 일어났다.','OX'),(NULL,67,4,6,NULL,'메이지 유신','일본의 근대화에 큰 영향을 준 것은 무엇인가요?','SHORT_ANSWER'),(NULL,68,5,6,NULL,'황실','메이지 유신 후 일본에서 가장 중요한 권력을 가진 것은 무엇인가요?','SHORT_ANSWER'),(NULL,69,6,6,NULL,'봉건체제','메이지 유신 이후, 일본은 전통적인 ____를 타파하고 중앙집권적 국가로의 전환을 이끌었습니다.','SHORT_ANSWER'),(NULL,70,6,6,NULL,'1853','페리 제독이 처음으로 일본을 개방하도록 요구한 해는 몇 년도인가요?','SHORT_ANSWER'),(NULL,71,10,16,NULL,'X','아편전쟁은 중국의 근대화를 촉진시켰다.','OX'),(NULL,72,10,16,NULL,'O','아편전쟁은 중국이 영국과의 무역에서 불공평한 조건을 받아들이지 않아 발발하였다.','OX'),(NULL,73,10,16,NULL,'O','아편전쟁에는 영국 외에도 프랑스, 미국, 일본 등이 참전하였다.','OX'),(NULL,74,11,16,NULL,'X','제1차 아편전쟁은 1856년부터 1860년까지 진행되었다.','OX'),(NULL,75,11,16,NULL,'X','아편전쟁 중 중국은 세계 강대국인 영국과 단독으로 대립하였다.','OX'),(NULL,76,11,16,NULL,'O','아편전쟁의 결과로 중국은 홍콩을 영국에게 양도하고, 통상조약을 체결하여 외국과의 무역이 활발해졌다.','OX'),(NULL,77,11,16,NULL,'무역','아편전쟁 이후 중국은 외국과 어떤 종류의 조약을 체결하였나요?','SHORT_ANSWER'),(NULL,78,11,16,NULL,'영국','아편전쟁은 __의 무역사에 의해 시작되었다.','SHORT_ANSWER'),(NULL,79,12,16,NULL,'난징','아편전쟁은 __조약을 끝으로 마무리된다.','SHORT_ANSWER'),(NULL,80,12,16,NULL,'홍콩','아편전쟁의 결과로 중국이 영국에게 양도한 지역은 어디인가요?','SHORT_ANSWER');
/*!40000 ALTER TABLE `quiz` ENABLE KEYS */;
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
