import React from 'react';
import {Text, StyleSheet, ScrollView} from 'react-native';
import Header from '../../../components/Header';
import {useTranslation} from 'react-i18next';
import {colors} from '../../../constants/colors';

const CommunityStandardsScreen = ({navigation}) => {
  const {t} = useTranslation();

  return (
    <ScrollView style={styles.container}>
      <Header
        iconLeft={require('../../../assets/icons/back.png')}
        leftOnPress={() => navigation.goBack()}
        name={t('community.title')}
      />

      {/* <Text style={styles.title}>Tiêu chuẩn cộng đồng</Text> */}
      <Text style={styles.content}>
        Để xây dựng một cộng đồng mua sắm văn minh và đáng tin cậy, **Shop Giày
        ShoeMate** mong muốn khách hàng tuân thủ các tiêu chuẩn dưới đây.
      </Text>

      <Text style={styles.subtitle}>1. Hành vi mua sắm</Text>
      <Text style={styles.content}>
        - Hãy luôn sử dụng thông tin cá nhân chính xác khi đặt hàng. {'\n'}-
        Không spam, gửi các yêu cầu giả mạo hoặc lạm dụng chức năng của ứng
        dụng. {'\n'}- Tôn trọng chính sách của shop về thời gian giao hàng và
        đổi trả.
      </Text>

      <Text style={styles.subtitle}>2. Đánh giá và bình luận</Text>
      <Text style={styles.content}>
        - Đánh giá sản phẩm một cách trung thực và khách quan. {'\n'}- Không sử
        dụng ngôn ngữ thô tục, xúc phạm người khác. {'\n'}- Tránh đăng các nội
        dung không liên quan đến sản phẩm.
      </Text>

      <Text style={styles.subtitle}>3. Quy định về tài khoản</Text>
      <Text style={styles.content}>
        - Mỗi người chỉ nên sử dụng một tài khoản duy nhất. {'\n'}- Không chia
        sẻ thông tin đăng nhập với người khác. {'\n'}- Báo cáo ngay lập tức khi
        phát hiện hành vi sử dụng trái phép.
      </Text>

      <Text style={styles.subtitle}>4. Hành động nếu vi phạm</Text>
      <Text style={styles.content}>
        - Shop có quyền tạm khóa hoặc xóa tài khoản vi phạm tiêu chuẩn cộng
        đồng. {'\n'}- Các đơn hàng gian lận sẽ bị hủy mà không cần thông báo
        trước.
      </Text>

      <Text style={styles.subtitle}>5. Đóng góp ý kiến</Text>
      <Text style={styles.content}>
        Chúng tôi luôn lắng nghe ý kiến đóng góp của bạn để hoàn thiện hơn. Hãy
        liên hệ qua email support@shoemate.com để chia sẻ suy nghĩ của bạn.
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

export default CommunityStandardsScreen;
