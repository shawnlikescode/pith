import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { cn } from "~/lib/utils";
import type { LucideIcon } from "~/lib/icons/icons";

const categoryButtonVariants = cva(
	"flex-1 flex-row items-center justify-center rounded-lg border gap-2 pt-3 pb-3",
	{
		variants: {
			variant: {
				default: "border-0 bg-white",
				selected: "border-blue-500 bg-blue-100",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	}
);

const categoryIconVariants = cva("flex-shrink-0", {
	variants: {
		variant: {
			default: "text-gray-500",
			selected: "text-blue-700",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

const categoryTextVariants = cva("text-base font-medium leading-none", {
	variants: {
		variant: {
			default: "text-gray-700",
			selected: "text-blue-700",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

interface CategoryButtonProps
	extends Omit<React.ComponentProps<typeof Button>, "children"> {
	label: string;
	Icon: LucideIcon;
	isSelected: boolean;
}

export function CategoryButton({
	label,
	Icon,
	isSelected,
	className,
	...props
}: CategoryButtonProps) {
	const variant = isSelected ? "selected" : "default";

	return (
		<Button
			className={cn(categoryButtonVariants({ variant }), className)}
			{...props}
		>
			<Icon size={16} className={categoryIconVariants({ variant })} />
			<Text className={categoryTextVariants({ variant })}>{label}</Text>
		</Button>
	);
}
