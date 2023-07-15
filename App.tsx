import {StripeProvider} from '@stripe/stripe-react-native';
import React from 'react';
import PaymentScreen from './src/paymentScreen';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import {apiSlice, useCreatePaymentIntentMutation} from './src/store/apiSlice';
const store = configureStore({
  reducer: {
    api: apiSlice.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

const STRIPE_KEY =
  'pk_test_51MtoKWLGvwsG3PGDS7wfphAiHs1NqvvBkQB8ZSVGgOW1cuSWh4JrOe01gfgwWnYBf5csNLVCgtroZcVBbDOEHthV00cTOAIxpx';

const App = () => {
  return (
    <Provider store={store}>
      <StripeProvider publishableKey={STRIPE_KEY}>
        <PaymentScreen />
      </StripeProvider>
    </Provider>
  );
};

export default App;
