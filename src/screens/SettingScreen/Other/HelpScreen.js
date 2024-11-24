import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Header from '../../../components/Header';
import {useTranslation} from 'react-i18next';
import {colors} from '../../../constants/colors';

const HelpScreen = ({navigation}) => {
  const {t} = useTranslation();

  return (
    <ScrollView style={styles.container}>
      <Header
        iconLeft={require('../../../assets/icons/back.png')}
        leftOnPress={() => navigation.goBack()}
        name={t('help.title')}
      />
      {/* <Text style={styles.title}>Trợ giúp</Text> */}
      <Text style={styles.content}>
        **ShoeMate** sẵn sàng hỗ trợ bạn trong mọi bước của quá trình mua sắm.
        Dưới đây là một số hướng dẫn và thông tin cơ bản để giúp bạn sử dụng ứng
        dụng của chúng tôi dễ dàng hơn.
      </Text>

      <Text style={styles.subtitle}>1. Hướng dẫn mua hàng</Text>
      <Text style={styles.content}>
        - **Tìm kiếm sản phẩm:** Bạn có thể duyệt qua danh mục hoặc tìm kiếm từ
        khóa ở thanh tìm kiếm. Mỗi sản phẩm đều có hình ảnh, mô tả chi tiết, và
        các tùy chọn size. {'\n'}- **Thêm vào giỏ hàng:** Chọn size và nhấn
        "Thêm vào giỏ hàng". Bạn có thể chỉnh sửa số lượng và xóa sản phẩm trong
        giỏ hàng. {'\n'}- **Thanh toán:** Sau khi hoàn tất chọn sản phẩm, hãy
        nhập địa chỉ giao hàng và lựa chọn phương thức thanh toán (COD hoặc
        chuyển khoản).
      </Text>

      <Text style={styles.subtitle}>2. Thông tin vận chuyển</Text>
      <Text style={styles.content}>
        - Đơn hàng sẽ được xử lý trong vòng 24h kể từ khi đặt. {'\n'}- Thời gian
        giao hàng dự kiến: 2-4 ngày làm việc cho khu vực nội thành và 4-7 ngày
        cho khu vực tỉnh lẻ. {'\n'}- Miễn phí vận chuyển cho đơn hàng từ
        1.000.000đ trở lên.
      </Text>

      <Text style={styles.subtitle}>3. Chính sách đổi trả</Text>
      <Text style={styles.content}>
        - Đổi trả sản phẩm trong vòng 7 ngày nếu sản phẩm bị lỗi từ nhà sản xuất
        hoặc không đúng size bạn đặt. {'\n'}- Phí đổi trả: Miễn phí cho lỗi của
        chúng tôi, và 30.000đ nếu đổi do yêu cầu cá nhân. {'\n'}- Quy trình:
        Liên hệ qua hotline, gửi hình ảnh sản phẩm, và chúng tôi sẽ hướng dẫn
        bạn hoàn tất việc đổi trả.
      </Text>

      <Text style={styles.subtitle}>4. Câu hỏi thường gặp</Text>
      <Text style={styles.content}>
        - **Tôi có thể hủy đơn hàng không?**: Có, bạn có thể hủy trước khi đơn
        hàng được vận chuyển. {'\n'}- **Làm thế nào để chọn đúng size giày?**:
        Hãy tham khảo bảng hướng dẫn size của chúng tôi trong từng sản phẩm. Nếu
        không chắc chắn, liên hệ hỗ trợ.
      </Text>

      <Text style={styles.subtitle}>5. Liên hệ</Text>
      <Text style={styles.content}>
        - **Hotline:** 1900 123 456 {'\n'}- **Email:** support@shoemate.com{' '}
        {'\n'}- **Fanpage:** Facebook.com/ShoeMate {'\n'}- **Địa chỉ:** 123
        Đường ABC, Quận 1, TP.HCM
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    paddingBottom: 20,
    marginBottom: 20,
  },
  title: {fontSize: 28, fontWeight: 'bold', marginBottom: 20},
  subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    color: colors.primary,
  },
  content: {fontSize: 16, lineHeight: 24, marginTop: 10, color: 'black'},
});

export default HelpScreen;
