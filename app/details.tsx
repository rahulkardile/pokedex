import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

const details = () => {

    const params = useLocalSearchParams();

    return (
        <>
            <Stack.Screen options={{ title: params.name }} >
                <ScrollView>
                    <Text>Details</Text>
                </ScrollView>
            </Stack.Screen>
        </>
    )
}

export default details

const styles = StyleSheet.create({}) 