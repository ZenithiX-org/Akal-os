import { NextResponse } from 'next/server';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

// POST /api/power?action=shutdown|reboot|suspend
// In the kiosk ISO, the `akal` user is authorized (via polkit / sudoers) to run
// `systemctl poweroff`, `systemctl reboot`, and `systemctl suspend` without a
// password. In dev/web mode these calls no-op gracefully.
export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action') || 'shutdown';

  const allowed = ['shutdown', 'reboot', 'suspend'];
  if (!allowed.includes(action)) {
    return NextResponse.json({ ok: false, error: 'Invalid action' }, { status: 400 });
  }

  // Only attempt real power control when explicitly running in kiosk mode
  if (process.env.AKAL_RUNTIME !== 'kiosk') {
    return NextResponse.json({ ok: true, simulated: true, action, message: `Would ${action} (web mode)` });
  }

  const cmd = action === 'shutdown' ? 'poweroff' : action === 'reboot' ? 'reboot' : 'suspend';
  try {
    // polkit rule on the ISO allows the akal user to run these without auth
    await execFileAsync('systemctl', [cmd]);
    return NextResponse.json({ ok: true, action });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
