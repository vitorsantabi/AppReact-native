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
            <BarInfo backgroundColor={''} title={'BUTTERFLY'} subtitle={'MARINA dá início a nova era'} />
            <ScrollView
            contentContainerStyle={{
                paddingBottom: 20}}
            >
                <Noticia 
                    imageSource={require('@/assets/news/cover2.webp')} 
                    title={'MARINA dá início a nova era com o lançamento de BUTTERFLY'} 
                    description={'MARINA lançou o seu novo single, BUTTERFLY, primeira amostra da sua nova era, nesta sexta-feira (21). A cantora britânica de origem grega prepara o lançamento do seu sexto disco de estúdio. BUTTERFLY narra a história de uma metamorfose, onde em tom de desabafo, a cantora fala em abrir as suas asas e voar alto. Musicalmente, a faixa demonstra toda a habilidade vocal da cantora.'} 
                />
                
                {/* Vídeo incorporado do YouTube */}
                <YoutubePlayer
                    height={220}
                    width={width}
                    play={playing}
                    videoId="aQMKAZpcynA" // ID do vídeo do YouTube
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
