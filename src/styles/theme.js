export const FONT_URL =
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap";

export const GLOBAL_STYLES = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  :root {
    --bg:      #141414;
    --surface: #1e1e1e;
    --border:  #2e2e2e;
    --text:    #f0f0f0;
    --muted:   #777777;
    --accent:  #3b82f6;
    --success: #22c55e;
    --danger:  #ef4444;
  }
  body { background: var(--bg); color: var(--text); font-family: 'Inter', sans-serif; }
`;
