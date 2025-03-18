import Gallery from 'react-native-awesome-gallery';
import { Image,StyleSheet, View } from 'react-native';
import BarInfo from '@/components/barinfo';

export const data = [
  { id: 1, source: require('@/assets/Eras/1/1.webp') },
  { id: 2, source: require('@/assets/Eras/1/2.webp') },
  { id: 3, source: require('@/assets/Eras/1/3.webp') },
  { id: 4, source: require('@/assets/Eras/1/4.webp') },
  { id: 5, source: require('@/assets/Eras/1/5.webp') },
  { id: 6, source: require('@/assets/Eras/1/6.webp') },
  { id: 7, source: require('@/assets/Eras/1/7.webp') },
];

export default function PageGaleria() {
  return (
    <View style={{ flex: 1 , backgroundColor: '#000' }}>
      <View style={{ marginTop: "10%" }}>
    <BarInfo backgroundColor={''} title={'Galeria'} subtitle={'Confira as imagens do album'} />
    </View>
    <Gallery
      style={{ flex: 1 }}
      data={data}
      initialIndex={0}
      renderItem={({ item }) => (
        <Image 
          key={item.id} 
          source={item.source} 
          style={styles.imagens} 
        />
      )}
    />
    </View>
    
  );
}
const styles = StyleSheet.create({
  imagens: {
    width: '99%',
    height: '70%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: 10,
  },
})