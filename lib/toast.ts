import Toast from 'react-native-toast-message';
import type { ToastShowParams } from 'react-native-toast-message';

export const toast = {
  show: (params: ToastShowParams) => Toast.show(params),
  success: (text1: string, text2?: string, options?: Partial<ToastShowParams>) =>
    Toast.show({ type: 'success', text1, text2, ...options }),
  error: (text1: string, text2?: string, options?: Partial<ToastShowParams>) =>
    Toast.show({ type: 'error', text1, text2, ...options }),
  info: (text1: string, text2?: string, options?: Partial<ToastShowParams>) =>
    Toast.show({ type: 'info', text1, text2, ...options }),
  hide: () => Toast.hide(),
};

export { Toast };
