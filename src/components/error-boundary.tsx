import React, { ErrorInfo, ReactNode } from "react";
import { View } from "react-native";
import { Text } from "./ui/text";
import { Button } from "./ui/button";

interface ErrorBoundaryState {
	readonly hasError: boolean;
	readonly error?: Error;
}

interface ErrorBoundaryProps {
	readonly children: ReactNode;
}

/**
 * Error Boundary component to catch and handle React errors gracefully
 */
export class ErrorBoundary extends React.Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error("Error caught by boundary:", error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			// Safely convert error to string
			const errorString = this.state.error
				? typeof this.state.error === "string"
					? this.state.error
					: Array.isArray(this.state.error)
					? this.state.error.join(", ")
					: this.state.error.toString()
				: "Unknown error";

			return (
				<View className="flex-1 justify-center items-center p-6">
					<Text className="text-xl font-semibold text-red-600 mb-4 text-center">
						Oops! Something went wrong
					</Text>
					<Text className="text-gray-600 text-center mb-6 leading-6">
						We encountered an unexpected error. Please try refreshing the app.
					</Text>
					<Button
						onPress={() => this.setState({ hasError: false })}
						className="mb-4"
					>
						<Text className="text-primary-foreground">Try Again</Text>
					</Button>
					<View className="mt-8 p-4 bg-gray-100 rounded-lg max-w-full">
						<Text className="text-xs text-gray-700 font-mono">
							{errorString}
						</Text>
					</View>
				</View>
			);
		}

		return this.props.children;
	}
}
