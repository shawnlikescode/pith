import React from "react";
import type { ErrorInfo, ReactNode } from "react";
import { View } from "react-native";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";

interface ErrorBoundaryState {
	readonly hasError: boolean;
	readonly error: Error | null;
}

interface ErrorBoundaryProps {
	readonly children: ReactNode;
	readonly fallback?: (error: Error, resetError: () => void) => ReactNode;
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
		this.state = { hasError: false, error: null };
	}

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		console.error("Error Boundary caught an error:", error, errorInfo);
	}

	resetError = (): void => {
		this.setState({ hasError: false, error: null });
	};

	render(): ReactNode {
		if (this.state.hasError && this.state.error) {
			if (this.props.fallback) {
				return this.props.fallback(this.state.error, this.resetError);
			}

			return (
				<View className="flex-1 justify-center items-center p-6 bg-white">
					<Text className="text-xl font-semibold text-red-600 mb-4 text-center">
						Something went wrong
					</Text>
					<Text className="text-gray-600 text-center mb-6 leading-6">
						An unexpected error occurred. You can try restarting the app or
						contact support if this continues to happen.
					</Text>
					<Button onPress={this.resetError} className="min-w-32">
						<Text>Try Again</Text>
					</Button>
					{__DEV__ && (
						<View className="mt-8 p-4 bg-gray-100 rounded-lg max-w-full">
							<Text className="text-xs text-gray-700 font-mono">
								{this.state.error.message}
							</Text>
						</View>
					)}
				</View>
			);
		}

		return this.props.children;
	}
}
