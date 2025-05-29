import { Text } from "react-native";
import { verifyInstallation } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";
import "~/global.css";

export default function IndexScreen() {
	verifyInstallation();
	return (
		<SafeAreaView className="flex-1 items-center justify-center bg-white">
			<Text className="text-red-500">Hello World</Text>
		</SafeAreaView>
	);
}
