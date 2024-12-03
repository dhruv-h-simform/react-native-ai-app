import dayjs from 'dayjs';
import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LoaderKit from 'react-native-loader-kit';
import icons from './assets/icons';
import DynamicText from './DynamicText';
import { askQuestionToGemini } from './utils';
import styles from './AppStyles';

const App = () => {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<
    { id: string; text: string; sender: 'user' | 'bot'; dateTime: string }[]
  >([
    {
      id: dayjs().unix().toString(),
      text: 'Hey! How can I help you today?',
      sender: 'bot',
      dateTime: Date.now().toString(),
    },
  ]);

  const handleSend = async () => {
    if (!question) {
      return Alert.alert('Please provide a question.');
    }
    const userDate = dayjs().unix().toString();
    const userMessage = {
      id: userDate,
      text: question,
      sender: 'user' as 'user' | 'bot',
      dateTime: userDate,
    };
    setMessages(prev => [...prev, userMessage]);

    try {
      const newQuestion = question;
      setQuestion('');

      // Add a placeholder loading message
      const loadingDate = Math.random().toString();
      const loadingMessage = {
        id: loadingDate,
        text: '...',
        sender: 'bot' as 'user' | 'bot',
        dateTime: loadingDate,
      };
      setMessages(prev => [...prev, loadingMessage]);
      const botResponse = await askQuestionToGemini(newQuestion);

      setTimeout(() => {
        const botDate = dayjs().unix().toString();
        setMessages(prev =>
          prev.map(msg =>
            msg.text === '...'
              ? {
                id: botDate,
                text: botResponse,
                sender: 'bot' as 'user' | 'bot',
                dateTime: botDate,
              }
              : msg,
          ),
        );
      }, 1000);
    } catch (error) {
      const errorDate = dayjs().unix().toString();
      const errorMessage = {
        id: errorDate,
        text: 'Error fetching response from OpenAI.',
        sender: 'bot' as 'user' | 'bot',
        dateTime: errorDate,
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerView}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Help 24x7</Text>
        </View>
        <FlatList
          data={[...messages].reverse()}
          keyExtractor={item => item.id}
          renderItem={({ item }) =>
            item.text === '...' ? (
              <LoaderKit
                style={styles.loading}
                name={'BallPulse'}
                color={'#EF5366'}
              />
            ) : (
              <View
                style={
                  item.sender === 'user'
                    ? styles.senderUser
                    : styles.senderBot
                }>
                <DynamicText content={item.text} />
                <Text
                  style={StyleSheet.flatten([styles.dateText, { alignSelf: item.sender === 'user' ? 'flex-end' : 'flex-start' }])}>
                  {dayjs().format('h:mm A')}
                </Text>
              </View>
            )
          }
          showsVerticalScrollIndicator={false}
          inverted
          contentContainerStyle={styles.contentContainerStyle}
        />
        <View style={styles.chatInputContainer}>
          <TextInput
            style={styles.textInputStyle}
            placeholder="Ask a question"
            value={question}
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect={false}
            onSubmitEditing={handleSend}
            placeholderTextColor={'#FFF'}
            onChangeText={setQuestion}
          />
          <TouchableOpacity
            onPress={handleSend}
            style={styles.sendButtonStyle}>
            <Image
              source={icons.sendIcon}
              style={styles.sendIconStyle}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default App;
