import React from "react";
import { View } from "react-native";
import { Text } from "~/components/ui/text";
import { BookOpen } from "~/lib/icons/icons";
import { ICON_SIZES } from "~/lib/constants";
import { Button } from "./ui/button";
import { Link } from "expo-router";

interface AppHeaderProps {
	subtitle?: string;
}

/**
 * Shared app header component used across the application
 */
export const AppHeader = ({ subtitle }: AppHeaderProps) => {
	return (
		<View>
			<View className="flex-row items-center justify-between">
				<View className="flex-row items-center gap-2">
					<View className="bg-black p-1 rounded-md">
						<BookOpen size={ICON_SIZES.MEDIUM} className="text-white" />
					</View>
					<View>
						<Text className="text-3xl font-bold text-gray-800">Pith</Text>
						{subtitle && (
							<Text className="text-gray-600 text-sm">{subtitle}</Text>
						)}
					</View>
					{/* <View className="bg-black p-1 rounded-md">
						<Link href="/dedug" asChild>
							<Button>
								<Text className="text-white">Debug</Text>
							</Button>
						</Link>
					</View> */}
				</View>
			</View>
		</View>
	);
};
