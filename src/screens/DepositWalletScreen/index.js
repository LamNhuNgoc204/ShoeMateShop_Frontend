import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';

import appst from '../../constants/AppStyle';
import {CustomedButton} from '../../components';
import styles from './style';

const DepositWalletScreen = () => {
  const [value, setValue] = useState('');

  const handleValuePress = amount => {
    setValue(amount.toString());
  };

  const clearValue = () => {
    setValue('');
  };

  return (
    <View style={styles.container}>
      <View style={appst.rowCenter}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={appst.icon40}
            source={require('../../assets/icons/ic_backwhite.png')}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Deposit</Text>
        <View style={{width: 40}} />
      </View>
      <View style={styles.viewBody}>
        <View style={styles.viewInput}>
          <Text style={styles.label}>Input Top Up Amount</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.dollarSign}>$</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter Amount"
              keyboardType="number-pad"
              value={value}
              onChangeText={setValue}
            />
            <TouchableOpacity onPress={clearValue}>
              <Image
                style={styles.closeIcon}
                source={require('../../assets/icons/closeblack.png')}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.currentBalance}>
            Current wallet balance: $1.390
          </Text>
          <View style={styles.valueButtonsContainer}>
            {['100', '200', '500'].map(amount => (
              <TouchableOpacity
                key={amount}
                style={[
                  styles.valueButton,
                  value === amount && styles.selectedValueButton,
                ]}
                onPress={() => handleValuePress(amount)}>
                <Text style={styles.valueButtonText}>$ {amount}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Image
            style={styles.line}
            source={require('../../assets/icons/linesetting.png')}
          />

          <View style={styles.depositContainer}>
            <TouchableOpacity style={styles.depositButton}>
              <Image source={require('../../assets/images/vcb.png')} />
              <Text style={styles.depositButtonText}>Bank Transfer</Text>
            </TouchableOpacity>
            <Image
              style={styles.rightArrow}
              source={require('../../assets/icons/right-arrow.png')}
            />
          </View>
          <Image
            style={styles.line}
            source={require('../../assets/icons/linesetting.png')}
          />
          <View style={styles.depositContainer}>
            <TouchableOpacity style={styles.depositButton}>
              <Image source={require('../../assets/images/momo.png')} />
              <Text style={styles.depositButtonText}>Momo</Text>
            </TouchableOpacity>
            <Image
              style={styles.rightArrow}
              source={require('../../assets/icons/right-arrow.png')}
            />
          </View>
        </View>
        <View style={styles.summaryContainer}>
          <View style={appst.rowCenter}>
            <Text>To Up Amount</Text>
            <Text>$1500</Text>
          </View>
          <View style={appst.rowCenter}>
            <Text style={styles.totalcheckout}>Top Up Charge</Text>
            <Text style={styles.totalcheckout}>$1500</Text>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.text}>
            By clicking on “Top Up Now”, you agree to the{' '}
            <Text style={styles.TermOfUse}>Term of Use</Text> and{' '}
            <Text style={styles.TermOfUse}>Privacy Policy</Text> of Shop
          </Text>
          <CustomedButton
            title={'To Up Now'}
            titleStyle={styles.textPress}
            onPress={() => console.log('To Up Now')}
            style={styles.press}
          />
        </View>
      </View>
    </View>
  );
};

export default DepositWalletScreen;
