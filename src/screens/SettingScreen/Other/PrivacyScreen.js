import React from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Header from '../../../components/Header';
import {colors} from '../../../constants/colors';

const PrivacyPolicyScreen = ({navigation}) => {
  const {t} = useTranslation();

  return (
    <ScrollView style={styles.container}>
      <Header
        iconLeft={require('../../../assets/icons/back.png')}
        leftOnPress={() => navigation.goBack()}
        name={t('privacy.title')}
      />

      {/* <Text style={styles.title}>Chính sách bảo mật thông tin</Text> */}
      <Text style={styles.content}>
        **Shop Giày ShoeMate** cam kết bảo mật thông tin cá nhân của khách hàng.
        Dưới đây là những nguyên tắc bảo mật mà chúng tôi tuân thủ để đảm bảo
        quyền lợi của bạn.
      </Text>

      <Text style={styles.subtitle}>1. Thông tin thu thập</Text>
      <Text style={styles.content}>
        Chúng tôi thu thập các thông tin cá nhân sau: {'\n'}- Họ và tên. {'\n'}-
        Địa chỉ email và số điện thoại. {'\n'}- Địa chỉ giao hàng. {'\n'}- Lịch
        sử mua hàng và giao dịch.
      </Text>

      <Text style={styles.subtitle}>2. Mục đích sử dụng thông tin</Text>
      <Text style={styles.content}>
        Thông tin của bạn sẽ được sử dụng để: {'\n'}- Xử lý đơn hàng, giao hàng
        và liên hệ khi cần thiết. {'\n'}- Cung cấp thông tin khuyến mãi, ưu đãi.{' '}
        {'\n'}- Cải thiện dịch vụ khách hàng. {'\n'}- Đảm bảo tính an toàn và
        bảo mật của tài khoản.
      </Text>

      <Text style={styles.subtitle}>3. Bảo mật thông tin</Text>
      <Text style={styles.content}>
        - Tất cả thông tin cá nhân đều được mã hóa và lưu trữ an toàn. {'\n'}-
        Chúng tôi không chia sẻ thông tin của bạn cho bên thứ ba, ngoại trừ các
        đối tác giao hàng cần thiết. {'\n'}- Hệ thống bảo mật được cập nhật liên
        tục để chống lại các mối đe dọa.
      </Text>

      <Text style={styles.subtitle}>4. Quyền của khách hàng</Text>
      <Text style={styles.content}>
        Bạn có quyền: {'\n'}- Yêu cầu xem, chỉnh sửa hoặc xóa thông tin cá nhân.{' '}
        {'\n'}- Từ chối nhận email khuyến mãi bất cứ lúc nào. {'\n'}- Báo cáo
        các hành vi xâm phạm thông tin.
      </Text>

      <Text style={styles.subtitle}>5. Liên hệ</Text>
      <Text style={styles.content}>
        Mọi thắc mắc về bảo mật, vui lòng liên hệ với chúng tôi qua: {'\n'}-
        Email: privacy@shoemate.com {'\n'}- Hotline: 1900 123 456
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
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

export default PrivacyPolicyScreen;
