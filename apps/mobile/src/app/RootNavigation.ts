import {
  createNavigationContainerRef,
  CommonActions,
} from '@react-navigation/native';
import { RootStackParamList } from './types/navigation';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigate<T extends keyof RootStackParamList>(
  name: T,
  params?: RootStackParamList[T]
) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params as never);
  }
}

export function replace<T extends keyof RootStackParamList>(
  name: T,
  params?: RootStackParamList[T]
) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name, params }],
      })
    );
  }
}

export function goBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
}

export function reset<T extends keyof RootStackParamList>(
  name: T,
  params?: RootStackParamList[T]
) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name, params }],
      })
    );
  }
}
