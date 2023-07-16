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
      return;
    }
    const initResponse = await initPaymentSheet({
      merchantDisplayName: 'Nhat Pham',
      paymentIntentClientSecret: response.data.paymentIntent,
    });
    if (initResponse.error) {
      console.log(initResponse.error);
      Alert.alert('Something went wrong');
      return;
    }

    const paymentResponse = await presentPaymentSheet();

    if (paymentResponse.error) {
      Alert.alert(
        `Error code: ${paymentResponse.error.code}`,
        paymentResponse.error.message,
      );
      return;
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity
        style={{
          padding: 20,
          paddingHorizontal: 20,
          position: 'absolute',
          backgroundColor: 'black',
          bottom: 30,
          width: '90%',
          alignSelf: 'center',
          borderRadius: 100,
          alignItems: 'center',
        }}
        onPress={() => onCheckout()}>
        <Text style={{color: 'white', fontWeight: '500', fontSize: 16}}>
          Check out
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default PaymentScreen;
