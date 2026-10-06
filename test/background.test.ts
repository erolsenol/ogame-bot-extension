import { describe, expect, it, vi } from 'vitest';
import { createMessageHandler, isGameUrl } from '../src/background-handler';
const sender = { id: 'extension-id', url: 'https://s123-en.ogame.gameforge.com/game/index.php', tab: { id: 3 } };
describe('extension message boundary', () => {
  it.each([undefined, 'not a url', 'http://s123.ogame.gameforge.com/game/', 'https://ogame.gameforge.com.evil.test/game/', 'https://evil.test/?ogame', 'https://user@ogame.gameforge.com/game/', 'https://ogame.gameforge.com/lobby'])('rejects unsafe sender URL %s', (url) => {
    expect(isGameUrl(url)).toBe(false);
  });
  it('focuses only the sending game tab and retains the response channel', async () => {
    const activateTab = vi.fn().mockResolvedValue({}); const reply = vi.fn();
    const handler = createMessageHandler({ runtimeId: sender.id, activateTab });
    expect(handler({ type: 'attackShipInput' }, sender, reply)).toBe(true);
    await Promise.resolve();
    expect(activateTab).toHaveBeenCalledWith(3);
    expect(reply).toHaveBeenCalledWith('OK');
  });
  it('rejects unknown commands, foreign extensions and missing tab IDs', () => {
    const activateTab = vi.fn(); const reply = vi.fn();
    const handler = createMessageHandler({ runtimeId: sender.id, activateTab });
    for (const request of [null, {}, { type: 'unknown' }]) expect(handler(request, sender, reply)).toBe(false);
    expect(handler({ type: 'attackShipInput' }, { ...sender, id: 'foreign' }, reply)).toBe(false);
    expect(handler({ type: 'attackShipInput' }, { ...sender, tab: {} }, reply)).toBe(false);
    expect(activateTab).not.toHaveBeenCalled();
  });
  it('reports tab activation failure and keeps tabClear non-destructive', async () => {
    const activateTab = vi.fn().mockRejectedValue(new Error('Closed tab')); const reply = vi.fn();
    const handler = createMessageHandler({ runtimeId: sender.id, activateTab });
    handler({ type: 'attackShipInput' }, sender, reply); await Promise.resolve();
    expect(reply).toHaveBeenCalledWith('ERROR'); activateTab.mockClear();
    expect(handler({ type: 'tabClear' }, sender, reply)).toBe(false);
    expect(activateTab).not.toHaveBeenCalled();
  });
});
