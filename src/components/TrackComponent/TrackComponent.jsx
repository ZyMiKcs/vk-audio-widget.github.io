import { IconButton, Image, Popover, SimpleCell, Text } from '@vkontakte/vkui';
import { Icon16MoreVertical } from '@vkontakte/icons';
import { observer } from 'mobx-react-lite';
import trackStore from '../../store/trackStore';
import './TrackComponent.css';

const TrackComponent = observer(({ track }) => {
    const isActive =
        trackStore.currentTrack && trackStore.currentTrack.id === track.id;

    const handleTogglePlayPause = (track) => {
        trackStore.togglePlayPause(track);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = ('0' + Math.floor(time % 60)).slice(-2);
        return `${minutes}:${seconds}`;
    };

    return (
        <SimpleCell
            style={{ maxWidth: 360, width: '100%', padding: 0 }}
            activated={isActive}
            onClick={() => handleTogglePlayPause(track)}
            before={
                <div
                    style={{
                        paddingLeft: '16px',
                        position: 'relative',
                        display: 'inline-block',
                    }}
                >
                    <Image
                        noBorder
                        size={40}
                        src={track.image}
                        style={{ display: 'block', padding: 0 }}
                    >
                        {isActive && (
                            <Image.Overlay
                                visibility="always"
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                    display: 'flex',
                                    justifyContent: 'space-around',
                                }}
                            >
                                <div className="soundwave-container">
                                    {[...Array(5)].map((_, index) => (
                                        <div className="bar" key={index}></div>
                                    ))}
                                </div>
                            </Image.Overlay>
                        )}
                    </Image>
                </div>
            }
            after={
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginRight: '16px',
                    }}
                >
                    <Text style={{ color: '#818C99', fontSize: 13 }}>
                        {isActive
                            ? formatTime(trackStore.currentTime)
                            : track.duration}
                    </Text>
                    <Popover
                        noStyling
                        trigger="click"
                        id="menupopup"
                        role="menu"
                        aria-labelledby="menubutton"
                    >
                        <IconButton
                            id="menubutton"
                            aria-controls="menupopup"
                            aria-haspopup="true"
                            aria-label="Menu"
                            mode="outline"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Icon16MoreVertical />
                        </IconButton>
                    </Popover>
                </div>
            }
            subtitle={
                <Text
                    style={{
                        color: '#818C99',
                        fontSize: 13,
                        letterSpacing: '0.2px',
                    }}
                >
                    {track.artist}
                </Text>
            }
        >
            <Text style={{ fontSize: 16, letterSpacing: '0.15px' }}>
                {track.title}
            </Text>
        </SimpleCell>
    );
});

export default TrackComponent;
