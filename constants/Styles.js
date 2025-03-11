import Colors from './Colors';
import FontSize from './FontSize';
import Spacing from './Spacing';
import Font from './Font';
import { StyleSheet , Dimensions} from 'react-native';
const { width, height } = Dimensions.get('window');
export const defaultStyles = StyleSheet.create({
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        height: height,
        zIndex: 1000,
    }
});