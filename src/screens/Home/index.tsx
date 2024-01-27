import { Text, TextInput, TouchableOpacity, View, FlatList, Alert } from 'react-native';
import { styles } from './styles';
import Attendee from '../../components/Attendee';
import { useState } from 'react';

export default function Home() {
    const [attendees, setAttendees] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState<string>('');

    const handleAddAttendee = (name: string) => {
        setInputValue('');
        if (attendees.includes(name)) {
            return Alert.alert("Attendee already on the list", "This attendee is already on the list, please add another one.");
        }
        setAttendees(prev => [...prev, name])
        return console.log("Added attendee")
    }

    const handleRemoveAttendee = (name: string) => {
        Alert.alert("Remove attendee", `Are you sure you want to remove ${name} from the list?`, [
            {
                text: "Cancel",
                style: "cancel"
            },
            {
                text: "Remove",
                onPress: () => setAttendees(prev => prev.filter(item => item !== name)),
                style: "destructive"
            }
        ]);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.eventName}>React Native Summit</Text>
            <Text style={styles.eventDate}>27th January 2024</Text>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder='Attendee name'
                    placeholderTextColor='#6b6b6b'
                    value={inputValue}
                    onChange={(e) => setInputValue(e.nativeEvent.text)}
                />
                <TouchableOpacity style={styles.button} onPress={() => handleAddAttendee(inputValue)}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={attendees}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (<Attendee name={item} onRemove={() => handleRemoveAttendee(item)} />)}
                ListEmptyComponent={() => <Text style={styles.empty}>No attendees yet</Text>}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}