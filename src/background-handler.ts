export interface MessageSender {
  readonly id?: string;
  readonly url?: string;
  readonly tab?: { readonly id?: number };
}
export interface MessageDependencies {
  readonly runtimeId: string;
  readonly activateTab: (id: number) => Promise<unknown>;
}

export function isGameUrl(value: string | undefined): boolean {
  if (!value) return false;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password && !url.port &&
      /^(?:[a-z0-9-]+\.)*ogame\.gameforge\.com$/i.test(url.hostname) && url.pathname.startsWith('/game/');
  } catch { return false; }
}

export function createMessageHandler(dependencies: MessageDependencies) {
  return (request: unknown, sender: MessageSender, reply: (value: string) => void): boolean => {
    if (sender.id !== dependencies.runtimeId || !isGameUrl(sender.url) ||
        typeof request !== 'object' || request === null || !('type' in request)) {
      reply('REJECT');
      return false;
    }
    if (request.type === 'tabClear') {
      // Historical tabClear did not close tabs; preserve that behavior.
      reply('OK');
      return false;
    }
    if (request.type !== 'attackShipInput' || !Number.isSafeInteger(sender.tab?.id) || sender.tab?.id === undefined || sender.tab.id < 0) {
      reply('REJECT');
      return false;
    }
    void dependencies.activateTab(sender.tab.id).then(() => reply('OK'), () => reply('ERROR'));
    return true;
  };
}
