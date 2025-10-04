import {
  createNavigationContainerRef,
  CommonActions,
} from '@react-navigation/native';
import { RootStackParamList } from '~/app/types/navigation';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigate<T extends keyof RootStackParamList>(
  name: T,
  params?: RootStackParamList[T]
) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.navigate({
        name: name as string,
        params: params as object | undefined,
      })
    );
  } else {
    console.warn(
      'navigate called before NavigationContainer is ready; action dropped',
      name
    );
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
  } else {
    console.warn(
      'replace called before NavigationContainer is ready; action dropped',
      name
    );
  }
}

export function goBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  } else {
    console.warn(
      'goBack called before NavigationContainer is ready or cannot go back; action dropped'
    );
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
  } else {
    console.warn(
      'reset called before NavigationContainer is ready; action dropped',
      name
    );
  }
}
