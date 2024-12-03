import React, { Linking, Text } from 'react-native';
import styles from './AppStyles';

interface DynamicTextProps {
  content: string;
}

/**
 * Component to render dynamic text with links and phone numbers
 */
const DynamicText = ({ content }: DynamicTextProps) => {
  const findAndWrapLinkOrPhone = (text: string) => {
    // Regular expressions to match URLs and phone numbers
    const combinedRegex =
      /(maps:\/\/\?q=.*?&ll=\d+\.\d+,\d+\.\d+|geo:\d+\.\d+,\d+\.\d+\?q=\d+\.\d+,\d+\.\d+\(.*?\)|\+?\d{1,3}-\d{3}-\d{4}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|hospitalwebsite\.com\/(appointments|cancel))/g;
    const parts = text.split(combinedRegex);

    return parts.map((part, index) => {
      if (/^maps:\/\/|^geo:/.test(part)) {
        // Handle map links
        return (
          <Text
            key={index}
            style={styles.linkText}
            onPress={() => handleOpenLink(part)}>
            Tap to open map
          </Text>
        );
      } else if (/^\+?\d{1,3}-\d{3}-\d{4}\.?$/.test(part)) {
        // Handle phone numbers
        return (
          <Text
            key={index}
            style={styles.linkText}
            onPress={() => handleOpenLink(`tel:${part.replace(/-/g, '')}`)}>
            {part}
          </Text>
        );
      } else if (
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(part)
      ) {
        // Handle email addresses
        return (
          <Text
            key={index}
            style={styles.linkText}
            onPress={() => handleOpenLink(`mailto:${part}`)}>
            {part}
          </Text>
        );
      } else if (/hospitalwebsite\.com\/(appointments|cancel)/.test(part)) {
        // Handle hospital website links
        return (
          <Text
            key={index}
            style={styles.linkText}
            onPress={() => handleOpenLink(`https://${part}`)}>
            Request Appointment Page
          </Text>
        );
      }
      // Render normal text
      return (
        <Text
          key={index}
          style={styles.chatText}>
          {part}
        </Text>
      );
    });
  };

  const handleOpenLink = (url: string) => {
    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          console.error('Unable to open URL:', url);
        }
      })
      .catch(err => console.error('Error opening URL:', err));
  };

  return (
    <Text
      style={styles.chatText}>
      {findAndWrapLinkOrPhone(content)}
    </Text>
  );
};

export default DynamicText;
