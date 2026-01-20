import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const vw = (percent: number) => (width * percent) / 100;
export const vh = (percent: number) => (height * percent) / 100;

export const FONT_SIZE = {
    FONT_12:vw(12*100/width),
    FONT_14:vw(14*100/width),
    FONT_16:vw(16*100/width),
    FONT_18:vw(18*100/width),
    FONT_20:vw(20*100/width),
    FONT_24:vw(24*100/width),
    FONT_28:vw(28*100/width),
    FONT_30:vw(30*100/width),
}
