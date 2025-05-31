import * as React from "react";
import { Text, type TextProps, View, type ViewProps } from "react-native";
import { cn } from "~/lib/utils";
import { TextClassContext } from "~/components/ui/text";

interface CardProps extends ViewProps {
	ref?: React.RefObject<View>;
}

interface CardHeaderProps extends ViewProps {
	ref?: React.RefObject<View>;
}

interface CardTitleProps extends TextProps {
	ref?: React.RefObject<Text>;
}

interface CardDescriptionProps extends TextProps {
	ref?: React.RefObject<Text>;
}

interface CardContentProps extends ViewProps {
	ref?: React.RefObject<View>;
}

interface CardFooterProps extends ViewProps {
	ref?: React.RefObject<View>;
}

function Card({ className, ...props }: CardProps) {
	return (
		<View
			className={cn(
				"rounded-lg border border-border bg-card shadow-sm shadow-foreground/10",
				className
			)}
			{...props}
		/>
	);
}

function CardHeader({ className, ...props }: CardHeaderProps) {
	return (
		<View
			className={cn("flex flex-col space-y-1.5 p-6", className)}
			{...props}
		/>
	);
}

function CardTitle({ className, ...props }: CardTitleProps) {
	return (
		<Text
			role="heading"
			aria-level={3}
			className={cn(
				"text-2xl text-card-foreground font-semibold leading-none tracking-tight",
				className
			)}
			{...props}
		/>
	);
}

function CardDescription({ className, ...props }: CardDescriptionProps) {
	return (
		<Text
			className={cn("text-sm text-muted-foreground", className)}
			{...props}
		/>
	);
}

function CardContent({ className, ...props }: CardContentProps) {
	return (
		<TextClassContext.Provider value="text-card-foreground">
			<View className={cn("p-6 pt-0", className)} {...props} />
		</TextClassContext.Provider>
	);
}

function CardFooter({ className, ...props }: CardFooterProps) {
	return (
		<View
			className={cn("flex flex-row items-center p-6 pt-0", className)}
			{...props}
		/>
	);
}

export {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
};
