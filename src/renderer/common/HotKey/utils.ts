export function isCtrlPress(event: DocumentEventMap['keydown']) {
  return event.ctrlKey || event.metaKey;
}

export function isKeyPress(event: DocumentEventMap['keydown'], key: string) {
  if (!key || !event.key) {
    return false;
  }

  const pressKey = event.key.toLowerCase();
  const findKey  = key.toLowerCase();

  return pressKey === findKey;
}
