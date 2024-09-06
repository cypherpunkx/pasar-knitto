CREATE TABLE `categories` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `categories_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`category` varchar(255) DEFAULT 'other',
	`price` int unsigned NOT NULL,
	`availability` boolean DEFAULT false,
	`brand` varchar(255) DEFAULT 'other',
	`description` text,
	`image` varchar(255) DEFAULT 'default.jpg',
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `products_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
DROP TABLE `migrations`;--> statement-breakpoint
DROP TABLE `users`;