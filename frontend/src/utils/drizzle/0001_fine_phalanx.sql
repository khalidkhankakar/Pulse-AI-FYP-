CREATE TABLE "prediction_history" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"disease_type" text NOT NULL,
	"inputs" jsonb NOT NULL,
	"prediction" text NOT NULL,
	"prediction_label" text NOT NULL,
	"probability" double precision,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "prediction_history" ADD CONSTRAINT "prediction_history_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "prediction_history_userId_idx" ON "prediction_history" USING btree ("user_id");