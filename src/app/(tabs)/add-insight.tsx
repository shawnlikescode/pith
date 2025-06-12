import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AddInsightForm } from "~/features/insights/components/add-insight-form";
import "~/global.css";

export default function AddInsightScreen() {
	return (
		<View className="flex-1 bg-white">
			<AddInsightForm />
		</View>
	);
}
