import React from "react";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { CongratulationScreen, HomeScreen, LoginScreen, OTPScreen, PlayGameScreen, RulesScreen, ScanBillScreen, SignupScreen, TutorialScreen } from "./src/screens";

const Stack = createNativeStackNavigator();

function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{ headerShown: false }}
				initialRouteName='Home'>
				<Stack.Screen name="Login" component={LoginScreen} />
				<Stack.Screen name="Signup" component={SignupScreen} />
				<Stack.Screen name="Rules" component={RulesScreen} />
				<Stack.Screen name="OTP" component={OTPScreen} />
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen name="Tutorial" component={TutorialScreen} />
				<Stack.Screen name="PlayGame" component={PlayGameScreen} />
				<Stack.Screen name="Congratulation" component={CongratulationScreen} />
				<Stack.Screen name="ScanBill" component={ScanBillScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default App;