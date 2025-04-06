CREATE TABLE `Users` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`age` integer,
	`is_active` integer DEFAULT 0,
	`profile_data` text,
	`created_at` text NOT NULL,
	`avatar` blob
);
--> statement-breakpoint
CREATE UNIQUE INDEX `Users_email_unique` ON `Users` (`email`);