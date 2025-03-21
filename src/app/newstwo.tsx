import BarInfo from '@/components/barinfo';
import Noticia from '@/components/noticia';
import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

const { width, height } = Dimensions.get('window');

const NewsOneScreen = () => {
    const [playing, setPlaying] = useState(false);

    const onStateChange = useCallback((state: string) => {
        if (state === "ended") {
            setPlaying(false);
        }
    }, []);

    return (
        <View style={[styles.container, { width, height }]}>
            <BarInfo backgroundColor={''} title={"CUPID'S GIRL"} subtitle={"MARINA lança o novo single, CUPID'S GIRL."} />
            <ScrollView
            contentContainerStyle={{
                paddingBottom: 20}}
            >
                <Noticia 
  imageSource={require('@/assets/news/cover-cupid.jpg')} 
  title="MARINA lança nova música do seu próximo álbum" 
  description={`Nesta sexta-feira (21), MARINA divulgou sua mais recente faixa, "CUPID'S GIRL", que deve integrar seu sexto álbum de estúdio.

A canção foi produzida pela própria artista em parceria com Cj Baran, conhecido por trabalhos com Melanie Martinez, Panic! At The Disco e Carly Rae Jepsen. Baran é o colaborador musical de MARINA neste novo projeto, que ainda não tem data de lançamento confirmada.

"CUPID'S GIRL" traz a identidade do synth pop e destaca a versatilidade vocal da cantora. A letra faz referência ao personagem da mitologia greco-romana Cupido, o Deus do amor erótico.`} 
/>

                
                {/* Vídeo incorporado do YouTube */}
                <YoutubePlayer
                    height={220}
                    width={width}
                    play={playing}
                    videoId="xZHTxr24sBY" // ID do vídeo do YouTube
                    onChangeState={onStateChange}
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginTop: 10,
    },
});

export default NewsOneScreen;
