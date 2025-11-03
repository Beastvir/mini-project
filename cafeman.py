"""Compatibility shim for the legacy CLI entry point.

The interactive console version of the cafe manager now lives in
``backend/legacy_cli.py``. This wrapper keeps existing scripts working while
nudging contributors toward the new location.
"""

from backend.legacy_cli import main


if __name__ == "__main__":
    print("The CLI has moved to backend/legacy_cli.py. Launching it now...")
    main()
