import React from "react";
import { View } from "react-native";
import "~/global.css";
import { AppHeader } from "~/components/app-header";
import { InsightList } from "~/features/insights/components/insight-list";

export default function IndexScreen() {
	return (
		<View className="flex-1 bg-background">
			<AppHeader
				title="Pith"
				subtitle="Knowledge Companion"
				showSearch={true}
			/>
			<View className="flex-1 px-4">
				<InsightList />
			</View>
		</View>
	);
}
