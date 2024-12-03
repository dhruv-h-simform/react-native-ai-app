import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#1E1E1E'},
  containerView: {flex: 1, padding: 16, backgroundColor: '#1E1E1E'},
  linkText: {
    color: '#1E90FF',
    textDecorationLine: 'underline',
  },
  chatText: {
    color: '#FFF',
  },
  loading: {width: 35, height: 35},
  senderUser: {
    backgroundColor: '#EF5366',
    padding: 10,
    marginVertical: 4,
    alignSelf: 'flex-end',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  senderBot: {
    backgroundColor: '#3D3D3D',
    padding: 10,
    marginVertical: 4,
    alignSelf: 'flex-start',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  dateText: {
    fontSize: 10,
    color: '#FFF',
    marginTop: 5,
  },
  contentContainerStyle: {flexGrow: 1, paddingVertical: 10},
  chatInputContainer: {flexDirection: 'row'},
  textInputStyle: {
    borderWidth: 1,
    borderColor: '#EF5366',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    color: '#FFF',
    marginRight: 10,
  },
  sendButtonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EF5366',
    borderRadius: 99,
    padding: 10,
  },
  sendIconStyle: {width: 22, height: 22, tintColor: '#FFF'},
  title: {color: '#FFF', fontSize: 18, fontWeight: '700'},
  titleContainer: {alignItems: 'center'},
});

export default styles;
