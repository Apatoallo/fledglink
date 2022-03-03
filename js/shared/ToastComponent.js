import { Toast } from 'native-base';

const ToastComponent = (text, type = 'danger', duration = 5000, position = 'top') => {
    (
        Toast.show({
            text, position, type, duration,
        })
    );
};

export default ToastComponent;
