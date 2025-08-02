import * as Speech from 'expo-speech';

let currentCallback: (() => void) | null = null;

export const speakText = (text: string, onDone: () => void) => {
  Speech.stop();
  currentCallback = onDone;

  Speech.speak(text, {
    language: 'hi-IN', // Use 'hi-IN' for Hindi
    onDone: () => {
      currentCallback?.();
      currentCallback = null;
    },
    onStopped: () => {
      currentCallback?.();
      currentCallback = null;
    },
  });
};

export const stopSpeaking = () => {
  Speech.stop();
  if (currentCallback) {
    currentCallback();
    currentCallback = null;
  }
};
