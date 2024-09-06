CREATE TABLE `categories` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `categories_id` PRIMARY KEY(`id`),
	CONSTRAINT `name_idx` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`category_id` int unsigned,
	`price` int unsigned NOT NULL,
	`availability` boolean DEFAULT false,
	`brand` varchar(255) DEFAULT 'other',
	`description` text,
	`image` varchar(255) DEFAULT 'default.jpg',
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `products_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `products` ADD CONSTRAINT `products_category_id_categories_id_fk` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `name_idx` ON `products` (`name`);--> statement-breakpoint
CREATE INDEX `price_idx` ON `products` (`price`);--> statement-breakpoint
CREATE INDEX `brand_idx` ON `products` (`brand`);