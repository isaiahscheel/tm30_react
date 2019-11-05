import meSaga from './me';

// A single entry point to start all the sagas at once. Using a generator function.
export default function* rootSaga() {
  yield [
    meSaga(),
  ];
}
