import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { X } from "~/lib/icons/icons";
import { cn } from "~/lib/utils";

const tagChipVariants = cva(
	"flex-row items-center rounded-md pt-1 pb-1 border",
	{
		variants: {
			variant: {
				available: "bg-white border-gray-300 pl-3 pr-3",
				selected: "bg-blue-100 border-blue-400 pl-3 pr-3",
				removable: "bg-blue-100 border-blue-400 pl-3 pr-2",
			},
		},
		defaultVariants: {
			variant: "available",
		},
	}
);

const tagTextVariants = cva("text-sm", {
	variants: {
		variant: {
			available: "text-gray-700",
			selected: "text-blue-700",
			removable: "text-blue-700 mr-2",
		},
	},
	defaultVariants: {
		variant: "available",
	},
});

interface TagChipProps
	extends Omit<React.ComponentProps<typeof Button>, "children" | "variant"> {
	label: string;
	variant?: "available" | "selected" | "removable";
}

export function TagChip({
	label,
	variant = "available",
	className,
	...props
}: TagChipProps) {
	return (
		<Button className={cn(tagChipVariants({ variant }), className)} {...props}>
			<Text className={tagTextVariants({ variant })} style={{ lineHeight: 14 }}>
				{label}
			</Text>
			{variant === "removable" && <X className="text-blue-700" size={14} />}
		</Button>
	);
}
