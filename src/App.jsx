import { useEffect } from 'react';
import {
    ConfigProvider,
    AdaptivityProvider,
    AppRoot,
    View,
    Panel,
    PanelHeader,
    Group,
    Header,
    Div,
    Image,
} from '@vkontakte/vkui';
import { observer } from 'mobx-react-lite';
import tracks from './data/tracks.json';
import TrackComponent from './components/TrackComponent/TrackComponent';
import trackStore from './store/trackStore';

const App = observer(() => {
    useEffect(() => {
        return () => {
            if (trackStore.audio) {
                trackStore.audio.pause();
                trackStore.audio = null;
            }
        };
    }, []);

    return (
        <ConfigProvider appearance="light">
            <AdaptivityProvider>
                <AppRoot>
                    <View activePanel="main">
                        <Panel id="main">
                            <PanelHeader>VK Музыка</PanelHeader>
                            <Div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <Group
                                    style={{
                                        maxWidth: '360px',
                                        width: '100%',
                                        paddingLeft: '43px',
                                        paddingRight: '42px',
                                    }}
                                    header={
                                        <Header mode="secondary">
                                            Доступные аудиозаписи
                                        </Header>
                                    }
                                >
                                    {tracks.map((track) => (
                                        <TrackComponent
                                            track={track}
                                            key={track.id}
                                        />
                                    ))}
                                </Group>
                            </Div>
                        </Panel>
                    </View>
                </AppRoot>
            </AdaptivityProvider>
        </ConfigProvider>
    );
});

export default App;
