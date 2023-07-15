import {CardField, useStripe} from '@stripe/stripe-react-native';
import {
  View,
  Text,
  Button,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useCreatePaymentIntentMutation} from './store/apiSlice';

const PaymentScreen = () => {
  const [createPaymentIntent] = useCreatePaymentIntentMutation();

  const {initPaymentSheet, presentPaymentSheet} = useStripe();

  const onCheckout = async () => {
    const response: any = await createPaymentIntent({
      amount: Math.floor(10 * 770),
    });
    console.log(response);
    if (response.error) {
      Alert.alert('Something went wrong');
    }
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Nhat</Text>
      <TouchableOpacity
        style={{backgroundColor: 'red', padding: 20}}
        onPress={() => onCheckout()}>
        <Text>Click</Text>
      </TouchableOpacity>
    </View>
  );
};
export default PaymentScreen;
