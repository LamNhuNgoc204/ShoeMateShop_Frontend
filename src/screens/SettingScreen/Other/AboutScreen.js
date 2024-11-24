import React from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import Header from '../../../components/Header';
import {colors} from '../../../constants/colors';

const AboutScreen = ({navigation}) => {
  const {t} = useTranslation();

  return (
    <ScrollView style={styles.container}>
      <Header
        iconLeft={require('../../../assets/icons/back.png')}
        leftOnPress={() => navigation.goBack()}
        name={t('about.title')}
      />
      {/* <Text style={styles.title}>Giới thiệu về Shop Giày XYZ</Text> */}
      <Image
        source={{
          uri: 'https://i.pinimg.com/736x/d4/0a/ba/d40aba501f1c82edd02b71851eb55450.jpg',
        }}
        style={styles.image}
      />
      <Text style={styles.content}>
        Chào mừng bạn đến với **Shop Giày ShoeMate**, nơi tập trung những mẫu
        giày đẹp nhất, thời thượng nhất và chất lượng nhất dành cho mọi người.
        Thành lập từ năm 2015, Shop Giày XYZ đã và đang là địa chỉ mua sắm đáng
        tin cậy của hàng triệu khách hàng trên toàn quốc.
      </Text>

      <Text style={styles.subtitle}>1. Sứ mệnh của chúng tôi</Text>
      <Text style={styles.content}>
        Chúng tôi cam kết mang lại cho khách hàng không chỉ là sản phẩm giày, mà
        còn là sự tự tin, phong cách và chất lượng sống tốt hơn. Mỗi đôi giày
        đều được tuyển chọn kỹ lưỡng từ những nhà cung cấp hàng đầu.
      </Text>

      <Text style={styles.subtitle}>2. Dịch vụ nổi bật</Text>
      <Text style={styles.content}>
        - **Giao hàng nhanh:** Đảm bảo bạn nhận được sản phẩm chỉ trong vài
        ngày. {'\n'}- **Chăm sóc khách hàng tận tâm:** Hỗ trợ giải đáp và tư vấn
        24/7. {'\n'}- **Chính sách ưu đãi:** Giảm giá, quà tặng đặc biệt vào các
        dịp lễ, sinh nhật khách hàng.
      </Text>

      <Text style={styles.subtitle}>3. Tại sao chọn chúng tôi?</Text>
      <Text style={styles.content}>
        - Sản phẩm chính hãng, bền đẹp. {'\n'}- Chính sách đổi trả linh hoạt.{' '}
        {'\n'}- Đội ngũ hỗ trợ chuyên nghiệp, thân thiện.
      </Text>

      <Text style={styles.subtitle}>4. Thông tin thêm</Text>
      <Text style={styles.content}>
        Chúng tôi không ngừng phát triển và mở rộng để mang đến cho bạn trải
        nghiệm mua sắm tốt nhất. Theo dõi chúng tôi để cập nhật những bộ sưu tập
        mới nhất!
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
  title: {fontSize: 28, fontWeight: 'bold'},
  subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    color: colors.primary,
  },
  content: {fontSize: 16, lineHeight: 24, color: 'black', marginTop: 10},
  image: {width: '100%', height: 200, marginBottom: 20, borderRadius: 10},
});

export default AboutScreen;
