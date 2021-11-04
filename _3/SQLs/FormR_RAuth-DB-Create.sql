DROP DATABASE `rauth` ;
CREATE SCHEMA `rauth` ;
USE `rauth` ;

DROP TABLE IF EXISTS `roles`;

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;

CREATE TABLE `roles`
  ( `id`        int(11)      NOT     NULL AUTO_INCREMENT
  , `name`      varchar(255) DEFAULT NULL
  , `createdAt` timestamp    NOT     NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  , `updatedAt` timestamp    NOT     NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  ,  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `roles` WRITE;

/*!40000 ALTER TABLE `roles` DISABLE KEYS */;

INSERT INTO `roles`
   VALUES ( 1, 'Admin', '2020-10-09 04:00:00','2020-12-01 15:46:42')
        , ( 2, 'Editor','2021-03-10 15:58:48','2021-03-16 23:48:34')
        , ( 3, 'Viewer','2021-04-14 16:22:58','2021-04-14 16:22:58');

/*!40000 ALTER TABLE `roles` ENABLE KEYS */;

UNLOCK TABLES;

DROP TABLE IF EXISTS `users`;

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;

CREATE TABLE `users`
  ( `id`           int(11)      NOT     NULL AUTO_INCREMENT
  , `username`     varchar(255) DEFAULT NULL
  , `email`        varchar(255) DEFAULT NULL
  , `password`     varchar(255) DEFAULT NULL
  , `active`       varchar(  3) DEFAULT NULL
  , `group`        varchar(100) DEFAULT NULL
  , `role`         varchar( 45) DEFAULT NULL
  , `passworddate` date         DEFAULT NULL
  , `createdAt`    timestamp    NOT     NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  , `updatedAt`    timestamp    NOT     NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  ,  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=utf8mb4;

/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;

/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users`
   VALUES (1, 'admin',  'admin@auth.com', '$2a$08$1s2JA/PRafGhln4pPnmpfeP4wBamZrBZsiFH3CsDFP.0nifzh/KiO','yes',NULL,'admin', '2021-07-18','2021-04-19 14:32:16','2021-04-19 14:32:16')
        , (2, 'editor', 'editor@auth.com','$2a$08$1s2JA/PRafGhln4pPnmpfeP4wBamZrBZsiFH3CsDFP.0nifzh/KiO','yes',NULL,'editor','2021-07-18','2021-04-19 14:33:33','2021-09-03 18:05:21')
        , (3, 'viewer', 'viewer@auth.com','$2a$08$1s2JA/PRafGhln4pPnmpfeP4wBamZrBZsiFH3CsDFP.0nifzh/KiO','yes',NULL,'viewer','2021-07-18','2021-09-02 14:43:29','2021-09-02 14:43:29');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;

UNLOCK TABLES;



