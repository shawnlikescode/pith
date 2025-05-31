import * as Slot from "@rn-primitives/slot";
import * as React from "react";
import { Text as RNText } from "react-native";
import { cn } from "~/lib/utils";

const TextClassContext = React.createContext<string | undefined>(undefined);

interface TextProps extends React.ComponentProps<typeof RNText> {
	ref?: React.RefObject<RNText>;
	asChild?: boolean;
}

function Text({ className, asChild = false, ...props }: TextProps) {
	const textClass = React.useContext(TextClassContext);
	const Component = asChild ? Slot.Text : RNText;
	return (
		<Component
			className={cn(
				"text-base text-foreground web:select-text",
				textClass,
				className
			)}
			{...props}
		/>
	);
}

export { Text, TextClassContext };
