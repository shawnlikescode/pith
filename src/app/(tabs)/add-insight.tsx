import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AddInsightForm from "~/features/insights/components/add-insight-form";
import "~/global.css";

export default function AddEntryScreen() {
	return (
		<SafeAreaView className="flex-1 bg-white">
			<AddInsightForm />
		</SafeAreaView>
	);
}
