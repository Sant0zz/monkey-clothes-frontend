import { HeaderShownContext } from "@react-navigation/elements";
import { Stack } from "expo-router";

export default function layout() {
    return (
        <Stack screenOptions={{headerShown:false}}>
            <Stack.Screen name="(login)"/>
            <Stack.Screen name="cliente"/>
            <Stack.Screen name="usuario"/>
            <Stack.Screen name="config"/>
        </Stack>
    )
}