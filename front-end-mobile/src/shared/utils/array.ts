export function findNextIndex<T> (array: Array<T>, currentPredicate: (value: T, index: number, obj: T[]) => unknown) {
  const currentIndex = array.findIndex(currentPredicate);
  if (currentIndex == -1) {
    return -1;
  }

  const nextIndex = currentIndex + 1;
  if (nextIndex >= array.length) {
    return -1;
  }

  return nextIndex;
}

export function contain<T> (array: Array<T>, predicate: (value: T, index: number, obj: T[]) => unknown) {
  return array.findIndex(predicate) != -1;
}

export function clean<T> (array: Array<T>) {
  array.splice(0, array.length);
}