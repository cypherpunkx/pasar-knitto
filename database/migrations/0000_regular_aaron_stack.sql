-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `migrations` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`hash` text NOT NULL,
	`created_at` bigint,
	CONSTRAINT `migrations_id` PRIMARY KEY(`id`),
	CONSTRAINT `id` UNIQUE(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`username` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`status` tinyint DEFAULT 0,
	`ip_address` varchar(255),
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);

*/