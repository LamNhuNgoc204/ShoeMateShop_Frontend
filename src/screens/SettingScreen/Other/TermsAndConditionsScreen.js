import React from 'react';
import {Text, StyleSheet, ScrollView} from 'react-native';
import Header from '../../../components/Header';
import {useTranslation} from 'react-i18next';
import {colors} from '../../../constants/colors';

const TermsAndConditionsScreen = ({navigation}) => {
  const {t} = useTranslation();

  return (
    <ScrollView style={styles.container}>
      <Header
        iconLeft={require('../../../assets/icons/back.png')}
        leftOnPress={() => navigation.goBack()}
        name={t('termsandcondition.title')}
      />
      {/* <Text style={styles.title}>Quy luật và điều khoản</Text> */}
      <Text style={styles.content}>
        Khi sử dụng ứng dụng của **Shop Giày ShoeMate**, bạn đồng ý với các quy
        định và điều khoản sau đây.
      </Text>

      <Text style={styles.subtitle}>
        1. Quyền và trách nhiệm của khách hàng
      </Text>
      <Text style={styles.content}>
        - Đảm bảo cung cấp thông tin chính xác khi đăng ký và đặt hàng. {'\n'}-
        Thanh toán đúng hạn theo các phương thức đã chọn. {'\n'}- Không sử dụng
        ứng dụng cho các hành vi gian lận.
      </Text>

      <Text style={styles.subtitle}>
        2. Quyền và trách nhiệm của Shop Giày ShoeMate
      </Text>
      <Text style={styles.content}>
        - Cung cấp sản phẩm chất lượng và đúng mô tả. {'\n'}- Hỗ trợ khách hàng
        nhanh chóng khi có vấn đề phát sinh. {'\n'}- Bảo vệ thông tin cá nhân
        của khách hàng.
      </Text>

      <Text style={styles.subtitle}>3. Chính sách giải quyết tranh chấp</Text>
      <Text style={styles.content}>
        - Mọi tranh chấp phát sinh sẽ được ưu tiên giải quyết qua thương lượng.{' '}
        {'\n'}- Nếu không đạt thỏa thuận, tranh chấp sẽ được giải quyết theo
        pháp luật hiện hành tại Việt Nam.
      </Text>

      <Text style={styles.subtitle}>4. Điều khoản bổ sung</Text>
      <Text style={styles.content}>
        Chúng tôi có quyền chỉnh sửa các điều khoản mà không cần thông báo
        trước. Khách hàng nên kiểm tra định kỳ để cập nhật các thay đổi.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    color: colors.primary,
  },
  content: {fontSize: 16, lineHeight: 24, marginTop: 10, color: 'black'},
});

export default TermsAndConditionsScreen;
