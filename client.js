/**
 * NASA-Punk theme for the dsh web client.
 *
 * Two layers:
 *   1. alias-token override — colours, radii, shadows, focus; follows the
 *      user's light/dark/system preference, never takes over the preference.
 *   2. a small structural stylesheet — paper fibre, tabular readouts, DIN
 *      headings. Purely decorative additions were tried and removed as noise.
 */
window.__ModuleLoader__.load({
  id: 'dsh-nasapunk-theme',
  factory(require) {
    var TOKENS = {
      /* ── surfaces: paper in light, instrument graphite in dark ── */
      '--dsw-alias-bg-base': { light: '#EAE8E2', dark: '#0B0E10' },
      '--dsw-alias-bg-layer-1': { light: '#FAF8F4', dark: '#111417' },
      '--dsw-alias-bg-layer-2': { light: '#EAE8E2', dark: '#111417' },
      '--dsw-alias-bg-layer-3': { light: '#F3F1EC', dark: '#181D21' },
      '--dsw-alias-bg-overlay': { light: '#FFFFFF', dark: '#070A0B' },
      '--dsw-specific-sidebar-fill': { light: '#E1DFD9', dark: '#070A0B' },

      /* ── structure: 统一发丝线（l1/l2/l3 同值，消除不一致） ── */
      '--dsw-alias-border-l1': { light: 'rgba(34,32,28,0.16)', dark: 'rgba(233,229,218,0.10)' },
      '--dsw-alias-border-l2': { light: 'rgba(34,32,28,0.16)', dark: 'rgba(233,229,218,0.10)' },
      '--dsw-alias-border-l3': { light: 'rgba(34,32,28,0.16)', dark: 'rgba(233,229,218,0.10)' },
      '--dsw-alias-border-l4': { light: 'rgba(34,32,28,0.24)', dark: 'rgba(233,229,218,0.16)' },
      '--dsw-alias-border-selected': { light: '#C4756B', dark: '#86CFE0' },
      '--dsw-elevation-stroke-color': { light: 'rgba(34,32,28,0.16)', dark: 'rgba(233,229,218,0.10)' },

      /* ── ink ── */
      '--dsw-alias-label-primary': { light: '#3A3732', dark: '#E9E5DA' },
      '--dsw-alias-label-secondary': { light: '#66625A', dark: '#A7A399' },
      '--dsw-alias-label-tertiary': { light: '#8A8478', dark: '#6E6B63' },
      '--dsw-alias-label-quaternary': { light: '#A9A398', dark: '#55534D' },
      '--dsw-alias-label-caption': { light: '#4A463E', dark: '#A7A399' },
      /* 预览版徽标文字：基础值 --dsw-static-blue-900，全站只此一处 */
      '--dsw-alias-label-primary-bluish': { light: '#B3352A', dark: '#86CFE0' },
      '--dsw-alias-label-on-color': { light: '#FFF8F2', dark: '#17120A' },

      /* ── signal: colour means state, never decoration ── */
      '--dsw-alias-brand-primary': { light: '#B3352A', dark: '#86CFE0' },
      '--dsw-alias-link': { light: '#B3352A', dark: '#86CFE0' },
      '--dsw-alias-state-error-primary': { light: '#B3352A', dark: '#D2603C' },
      '--dsw-alias-state-warn-primary': { light: '#9A6B0C', dark: '#D9B23C' },
      '--dsw-alias-state-success-primary': { light: '#4F6B32', dark: '#8FA36A' },
      '--dsw-alias-state-idle-primary': { light: '#8A8478', dark: '#6E6B63' },
      '--dsw-alias-state-business-primary': { light: '#B3352A', dark: '#86CFE0' },
      /* 预览版徽标底（state-business-tertiary） */
      '--dsw-alias-state-business-tertiary': { light: '#F0DCD8', dark: '#17313A' },
      /* 轨迹条：一条规则走 brand-primary-new 蓝，一条走 trajectory-accent 色混 */
      '--dsw-alias-brand-primary-new-colorprimary-new-color': { light: '#B3352A', dark: '#86CFE0' },
      '--dsw-alias-trajectory-accent': { light: '#B3352A', dark: '#86CFE0' },
      '--dsw-focus-ring-color': { light: '#B3352A', dark: '#86CFE0' },

      /* ── 主操作按钮：info 链默认解析到 static deepseek 蓝 ── */
      '--dsw-alias-button-info-fill': { light: '#B3352A', dark: '#86CFE0' },
      '--dsw-alias-button-info-hover': { light: '#9C2D24', dark: '#B0E3F0' },
      /* 次级/浮起按钮（导入对话那个方钮走这条） */
      '--dsw-alias-button-elevated-fill': { light: '#E5E2DA', dark: '#14181C' },

      /* ── machined corners: the whole six-step scale, panel included ── */
      '--dsw-radius-xs': { light: '1px', dark: '1px' },
      '--dsw-radius-sm': { light: '2px', dark: '2px' },
      '--dsw-radius-md': { light: '3px', dark: '3px' },
      '--dsw-radius-lg': { light: '4px', dark: '4px' },
      '--dsw-radius-xl': { light: '6px', dark: '6px' },
      '--dsw-radius-panel': { light: '3px', dark: '3px' },

      /* ── interaction fills: ink washes, not grey gradients ── */
      '--dsw-alias-interactive-bg-hover': { light: 'rgba(34,32,28,0.06)', dark: 'rgba(233,229,218,0.06)' },
      '--dsw-alias-interactive-bg-hover-solid': { light: 'rgba(34,32,28,0.09)', dark: 'rgba(233,229,218,0.09)' },
      '--dsw-alias-interactive-bg-hover-danger': { light: 'rgba(179,53,42,0.09)', dark: 'rgba(210,96,60,0.14)' },
      '--dsw-alias-fill-tsp-secondary': { light: 'rgba(34,32,28,0.05)', dark: 'rgba(233,229,218,0.05)' },

      /* ── cards read as sheets laid on the page ── */
      '--dsw-alias-card-fill': { light: '#F3F1EC', dark: '#111417' },
      '--dsw-alias-card-fill-hover': { light: '#F8F6F2', dark: '#151A1E' },
      '--dsw-alias-card-tile-fill': { light: '#ECE9E3', dark: '#171C20' },

      /* 插件图标底 / 分段控件底（基础值是偏蓝灰的模块底） */
      '--dsw-alias-bg-module-platform': { light: '#FFFFFF', dark: '#171C20' },
      '--dsw-alias-interactive-bg-active': { light: '#F3F1EC', dark: '#181D21' },
      '--dsw-alias-settings-card-fill': { light: '#F3F1EC', dark: '#171C20' },
      '--dsw-alias-settings-card-stroke': { light: 'rgba(34,32,28,0.16)', dark: 'rgba(233,229,218,0.10)' },
      '--dsw-specific-sidebar-nav-item-active': { light: 'rgba(34,32,28,0.06)', dark: 'rgba(233,229,218,0.06)' },
      /* 「推荐」这类强调徽标底色，基础值是偏蓝的强调色 */
      '--dsw-specific-sidebar-nav-item-active-accent': { light: 'rgba(179,53,42,0.12)', dark: 'rgba(134,207,224,0.16)' },

      /* ── code blocks sit one step below the sheet ── */
      '--dsw-alias-markdown-code-block': { light: '#F4F1EA', dark: '#060809' },

      /* ── 字体：拉丁走 DIN Next LT Pro，中文落思源宋体 ── */
      '--dsw-font-family': { light: '"DIN Next LT Pro","Noto Serif SC","Microsoft YaHei",sans-serif', dark: '"DIN Next LT Pro","Noto Serif SC","Microsoft YaHei",sans-serif' },
      '--ds-font-family-code': { light: '"Consolas","DIN Next LT Pro",monospace', dark: '"Consolas","DIN Next LT Pro",monospace' },

      /* ── composer：压深一档的纸，内嵌感 ── */
      '--dsw-specific-input-major': { light: '#E5E2DA', dark: '#14181C' },
      '--dsw-specific-selector': { light: '#E5E2DA', dark: '#14181C' },

      /* ── 用户气泡：去掉牛皮纸黄，改成比页面深一档的中性纸 ── */
      '--dsw-specific-bubble': { light: '#DEDAD1', dark: '#181D22' },
      '--dsw-specific-bubble-highlight': { light: '#C9C3B6', dark: '#2C333B' },

      /* ── 菜单/浮层：去玻璃、纸化；hovercard 浅底深字 ── */
      '--dsw-menu-backdrop-filter': { light: 'none', dark: 'none' },
      '--dsw-menu-surface-fill': { light: '#F7F4EE', dark: '#171C20' },
      '--dsw-specific-menu': { light: '#F7F4EE', dark: '#171C20' },
      '--dsw-alias-menu-group-header-fill': { light: '#EFEBE2', dark: '#111417' },
      '--dsw-alias-hovercard-bg': { light: '#FAF8F4', dark: '#161B1F' },
      '--dsw-alias-hovercard-label-primary': { light: '#22201C', dark: '#E9E5DA' },
      '--dsw-alias-hovercard-label-secondary': { light: '#5C574E', dark: '#A7A399' },
      '--dsw-alias-hovercard-label-tertiary': { light: '#8A8478', dark: '#6E6B63' },
      '--dsw-alias-hovercard-state-done': { light: '#4F6B32', dark: '#8FA36A' },
      '--dsw-alias-hovercard-state-error': { light: '#B3352A', dark: '#D2603C' },

      /* ── scrollbars, selection, keycaps, switch ── */
      '--dsw-alias-scrollbar-bg-l2': { light: 'rgba(34,32,28,0.16)', dark: 'rgba(233,229,218,0.16)' },
      '--dsw-alias-scrollbar-hover-l2': { light: 'rgba(34,32,28,0.30)', dark: 'rgba(233,229,218,0.30)' },
      '--dsw-alias-bg-document-selection': { light: 'rgba(46,111,142,0.20)', dark: 'rgba(127,178,201,0.22)' },
      '--dsw-alias-tooltip-key-bg': { light: 'rgba(34,32,28,0.10)', dark: 'rgba(233,229,218,0.10)' },
      '--dsw-alias-switch-thumb': { light: '#FFFFFF', dark: '#C9C5BB' },

      /* ── shadows: flattened to a 1px offset on paper ── */
      '--dsw-shadow-lv1': { light: '0 1px 0 rgba(34,32,28,0.07)', dark: '0 1px 2px rgba(0,0,0,0.45)' },
      '--dsw-shadow-lv2': { light: '0 1px 0 rgba(34,32,28,0.10)', dark: '0 2px 8px rgba(0,0,0,0.50)' },
      '--dsw-shadow-lv3': { light: '0 2px 0 rgba(34,32,28,0.12)', dark: '0 6px 20px rgba(0,0,0,0.55)' },
    };

    /* 纸纤维：feTurbulence 噪点，运行时再编码，避免手写 %23 */
    var FIBRE_SVG = "<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'>"
      + "<filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='3' stitchTiles='stitch'/></filter>"
      + "<rect width='140' height='140' filter='url(#n)' opacity='0.62'/></svg>";
    var FIBRE = 'url("data:image/svg+xml;utf8,' + encodeURIComponent(FIBRE_SVG) + '")';

    var CSS = [
      /* 纸纤维纹理 */
      'body::after{content:"";position:fixed;inset:0;pointer-events:none;z-index:2147483000;opacity:.035;mix-blend-mode:multiply;background-image:' + FIBRE + ';background-size:140px 140px}',
      'body[data-ds-dark-theme]::after{opacity:.055;mix-blend-mode:screen}',

      /* 窗口直角：centerCol 的 16px 左上圆角由这个变量控制，压掉它 */
      'html[data-windows-titlebar] *{--dsh-windows-content-radius:0px !important}',

      /* 标题栏下沿红线：独立节点，画到系统控件左沿为止（原生控件层盖不住也压不上） */
      'html[data-windows-titlebar] #dsh-nasapunk-stripe{position:fixed;top:var(--dsh-windows-titlebar-height,40px);left:env(titlebar-area-x,0px);right:calc(100vw - env(titlebar-area-width,100vw));height:2px;pointer-events:none;z-index:2147483647;background:#B3352A}',
      'html:has(body[data-ds-dark-theme]) #dsh-nasapunk-stripe{background:#86CFE0}',

      /* 等宽读数 */
      'pre,code,kbd,samp,[class*="reasoning"],[class*="ioCard"],[class*="Tool"],[class*="tool"]{font-variant-numeric:tabular-nums}',

      /* 行内代码：淡红底 + 红字（代码块用下面的高权重规则豁免） */
      'code{background:rgba(179,53,42,.10) !important;color:#B3352A !important;border:1px solid rgba(179,53,42,.24) !important;border-radius:2px;padding:1px 4px}',
      'body[data-ds-dark-theme] code{background:rgba(134,207,224,.15) !important;color:#B0E3F0 !important;border-color:rgba(134,207,224,.32) !important}',
      'pre code:not(#dsh-noop){background:transparent !important;color:inherit !important;border:0 !important;padding:0 !important;border-radius:0}',

      /* 标题用 DIN 血统的 Bahnschrift，正文不动 */
      'h1,h2,h3,h4{font-family:"DIN Next LT Pro","Bahnschrift","Noto Serif SC","Microsoft YaHei",serif;letter-spacing:.005em}',

      /* 2. shiki 语法色：低彩度墨色系 */
      ':root{--shiki-token-constant:#2E6F8E;--shiki-token-string:#5B7A3B;--shiki-token-comment:#9A9488;--shiki-token-keyword:#A03327;--shiki-token-parameter:#9A6B0C;--shiki-token-function:#4A4E8C;--shiki-token-string-expression:#4F6B32;--shiki-token-punctuation:#6E6B63;--shiki-token-link:#2E6F8E}',
      'body[data-ds-dark-theme]{--shiki-token-constant:#7FB2C9;--shiki-token-string:#8FA36A;--shiki-token-comment:#6E6B63;--shiki-token-keyword:#E0876F;--shiki-token-parameter:#D9B23C;--shiki-token-function:#A7B3D8;--shiki-token-string-expression:#8FA36A;--shiki-token-punctuation:#A7A399;--shiki-token-link:#7FB2C9}',

      /* 6. 滚动条加宽成带轨滑块 */
      '::-webkit-scrollbar{width:10px;height:10px}',
      '::-webkit-scrollbar-thumb{border-radius:2px;border:2px solid transparent;background-clip:padding-box;background:rgba(34,32,28,.22)}',
      '::-webkit-scrollbar-thumb:hover{background:rgba(34,32,28,.38)}',
      'body[data-ds-dark-theme] ::-webkit-scrollbar-thumb{background:rgba(233,229,218,.16)}',
      'body[data-ds-dark-theme] ::-webkit-scrollbar-thumb:hover{background:rgba(233,229,218,.30)}',

      /* 品牌：字标换 DIN（下划线已移除） */
      '[class*="brandName"],[class*="fallbackBrandName"]{font-family:"DIN Next LT Pro","Bahnschrift","Noto Serif SC","Microsoft YaHei",serif;letter-spacing:.01em}',

      /* 左上角徽标：鲸鱼回到与字标同色（墨色），不再染红 */
      '[class*="railMark"] svg,[class*="brandMark"] svg{color:var(--dsw-alias-label-primary) !important}',
      /* HARNESS 字标外层那个圆角方块（svg 里的 rect）改成品牌红 */
      '[class*="brandName"] svg rect{fill:#B3352A !important}',
      'body[data-ds-dark-theme] [class*="brandName"] svg rect{fill:#86CFE0 !important}',

      /* 左下角账号区：红色竖条包边 */
      '[class*="footArea"]{position:relative}',
      '[class*="footArea"]::before{content:"";position:absolute;left:0;top:8px;bottom:8px;width:3px;pointer-events:none;background:linear-gradient(180deg,#B3352A 0 80%,rgba(179,53,42,0) 100%)}',
      'body[data-ds-dark-theme] [class*="footArea"]::before{background:linear-gradient(180deg,#86CFE0 0 80%,rgba(134,207,224,0) 100%)}',

      /* 运行时：红线变呼吸灯 + 中心扫光 */
      'html[data-windows-titlebar]:has([class*="_running"]) #dsh-nasapunk-stripe{background:linear-gradient(90deg,#B3352A 0,#F0897A 50%,#B3352A 100%);background-size:220% 100%;box-shadow:0 0 10px rgba(179,53,42,.55);animation:np-scan 1.1s linear infinite,np-breathe 1.1s ease-in-out infinite}',
      'html[data-windows-titlebar]:has([class*="_running"]):has(body[data-ds-dark-theme]) #dsh-nasapunk-stripe{background:linear-gradient(90deg,#86CFE0 0,#D2F0F8 50%,#86CFE0 100%)}',
      '@keyframes np-scan{from{background-position:200% 0}to{background-position:-200% 0}}',
      '@keyframes np-breathe{0%,100%{opacity:.45}50%{opacity:1}}',

      /* 左栏：当前选中的对话行用主题色淡底（悬停仍是墨wash，两者可区分） */
      '[class*="_sessionRow"][class*="_selected"]{background-color:rgba(179,53,42,0.11) !important}',
      'body[data-ds-dark-theme] [class*="_sessionRow"][class*="_selected"]{background-color:rgba(134,207,224,0.14) !important}',

      /* 侧栏与主列：加一条分割线，左右分开 */
      '[class*="wtg9ga_root"]{border-right:1px solid rgba(34,32,28,.16)}',
      'body[data-ds-dark-theme] [class*="wtg9ga_root"]{border-right-color:rgba(233,229,218,.10)}',

      /* 新建会话 / 导入：标签改窄体大写，快捷键灰墨；按钮本体与输入框同色 */
      '[class*="newSessionLabel"]{font-family:"DIN Next LT Pro","Bahnschrift","Noto Serif SC","Microsoft YaHei",serif;letter-spacing:.08em;text-transform:uppercase}',
      '[class*="newSessionShortcut"]{color:#8A8478}',
      '[class*="newSession"]:not([class*="Row"]):not([class*="Content"]):not([class*="Label"]):not([class*="Shortcut"]):not([class*="Mask"]){background:#E5E2DA;border:1px solid rgba(34,32,28,.16);border-radius:3px}',
      'body[data-ds-dark-theme] [class*="newSession"]:not([class*="Row"]):not([class*="Content"]):not([class*="Label"]):not([class*="Shortcut"]):not([class*="Mask"]){background:#1F242A;border-color:rgba(233,229,218,.10)}',

      /* 当前会话：选中底色压浅 */
      '[class*="panelEntryActive"]{background:rgba(34,32,28,.045)}',
      'body[data-ds-dark-theme] [class*="panelEntryActive"]{background:rgba(233,229,218,.05)}',

      /* 品牌：字标墨色（鲸鱼标志不动） */
      '[class*="brandName"]{color:#3A3732}',
      'body[data-ds-dark-theme] [class*="brandName"]{color:#E9E5DA}',

      /* 输入框加号：图标色对齐麦克风（label-secondary） */
      '[class*="GRgSLq_add"]{color:#66625A}',
      'body[data-ds-dark-theme] [class*="GRgSLq_add"]{color:#A7A399}',

      /* 工作区文件夹 → 红 */
      '[class*="_folder"],[class*="_folder"] svg{color:#B3352A}',
      'body[data-ds-dark-theme] [class*="_folder"],body[data-ds-dark-theme] [class*="_folder"] svg{color:#86CFE0}',

      /* 分段控件（已安装 / 发现）：加发丝边，读出“控件” */
      '[class*="_switcher"]{border:1px solid rgba(34,32,28,.16)}',
      'body[data-ds-dark-theme] [class*="_switcher"]{border-color:rgba(233,229,218,.10)}',

      /* 对话轮次导航轨：刻度线画在 ::before 上，不是元素本身 */
      '[class*="_markActive"]::before{background:#B3352A !important}',
      'body[data-ds-dark-theme] [class*="_markActive"]::before{background:#86CFE0 !important}',
      '[class*="_markPreview"]::before{background:#C4756B !important}',

      /* 任务清单勾选：accent-color 会被「禁用态」的灰色吃掉，直接重绘 checkbox */
      'input[type="checkbox"]{appearance:none;-webkit-appearance:none;width:14px;height:14px;margin:0 7px 0 0;border:1.5px solid rgba(34,32,28,.38);border-radius:3px;background:#FFFDF8;position:relative;flex:none;vertical-align:middle;transform:translateY(-1px);opacity:1 !important}',
      'input[type="checkbox"]:checked{background:#B3352A;border-color:#B3352A}',
      'input[type="checkbox"]:checked::after{content:"";position:absolute;left:50%;top:47%;width:4px;height:8px;border:solid #FFF;border-width:0 2px 2px 0;transform:translate(-50%,-50%) rotate(45deg)}',
      'input[type="checkbox"]:disabled{opacity:1 !important;cursor:default}',
      'body[data-ds-dark-theme] input[type="checkbox"]{border-color:rgba(233,229,218,.38);background:#14181C}',
      'body[data-ds-dark-theme] input[type="checkbox"]:checked{background:#86CFE0;border-color:#86CFE0}',
      /* 文本高光：引用块红色调（12% 红晕，能一眼看出） */
      'blockquote{border-left:3px solid #B3352A !important;background:rgba(179,53,42,.12) !important;border-radius:2px;margin-left:0;padding:4px 14px}',
      'body[data-ds-dark-theme] blockquote{border-left-color:#86CFE0 !important;background:rgba(134,207,224,.14) !important}',
      /* 欢迎页 hero 标题 */
      /* 欢迎页 hero 标题：入场淡入上浮 */
      '[class*="_composerHero"] [class*="_headline"]{font-family:"DIN Next LT Pro","Bahnschrift","Noto Serif SC","Microsoft YaHei",serif;font-size:32px;font-weight:500;letter-spacing:.02em;line-height:1.3;animation:np-rise .22s ease-out both}',
      '@keyframes np-rise{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}',
      /* 欢迎页（无会话时 hero 在场）让红线缓慢呼吸 */
      'html[data-windows-titlebar]:has([class*="_composerHero"]) #dsh-nasapunk-stripe{animation:np-breathe 2.6s ease-in-out infinite}',
      /* 提问卡：底色只画在内层 button 上，避免行容器的 padding 被一起涂红 */
      '[class*="_optionRow"]:hover > button{background:rgba(179,53,42,.06) !important}',
      '[class*="_optionSelected"]{background:transparent !important;border-color:transparent !important}',
      '[class*="_optionSelected"] > button{background:rgba(179,53,42,.10) !important;box-shadow:inset 0 0 0 1px rgba(179,53,42,.26) !important;border-radius:3px}',
      '[class*="_optionSelected"] [class*="_optionLabel"]{color:#B3352A !important}',
      /* 「推荐」徽标：保留方框；padding-top 让两个字在盒内略微下沉 */
      '[class*="_optionLine"] [class*="_badge"],[class*="_optionCopy"] [class*="_badge"]{background:rgba(179,53,42,.10) !important;border:0 !important;box-shadow:inset 0 0 0 1px rgba(179,53,42,.30) !important;color:#B3352A !important;white-space:nowrap !important;flex:none !important;align-self:center !important;display:inline-flex !important;align-items:center !important;height:17px !important;line-height:17px !important;padding:1px 5px 0 !important;box-sizing:border-box !important;transform:translateY(-1px)}',
      'body[data-ds-dark-theme] [class*="_optionRow"]:hover > button{background:rgba(134,207,224,.09) !important}',
      'body[data-ds-dark-theme] [class*="_optionSelected"] > button{background:rgba(134,207,224,.15) !important;box-shadow:inset 0 0 0 1px rgba(134,207,224,.30) !important}',
      'body[data-ds-dark-theme] [class*="_optionSelected"] [class*="_optionLabel"]{color:#B0E3F0 !important}',
      'body[data-ds-dark-theme] [class*="_optionLine"] [class*="_badge"],body[data-ds-dark-theme] [class*="_optionCopy"] [class*="_badge"]{background:rgba(134,207,224,.15) !important;box-shadow:inset 0 0 0 1px rgba(134,207,224,.34) !important;color:#B0E3F0 !important;height:17px !important;line-height:17px !important;padding:1px 5px 0 !important}',
      /* 会话头部的预设胶囊（standard / PTC…）：去掉底色 */
      /* 会话头部的预设胶囊：去掉底色，与周围同色（两种可能的类名都覆盖） */
      '[class*="_seat"]:not([class*="_seatLabel"]):not([class*="_seatIcon"]):not([class*="_chevron"]),[class*="dscfja_label"]{background:transparent !important;border:0 !important;box-shadow:none !important}',
      /* 预设名显示的是原始 id（standard），这里换成中文 */
      '[class*="_seatLabel"]{font-size:0 !important}',
      '[class*="_seatLabel"]::after{content:"标准模式";font-size:11.5px;letter-spacing:.02em}',
      /* 分段控件（已安装 / 发现）：去掉描边，只用底色区分 */
      '[class*="_tabs_"]{background:#EAE8E2 !important;border:0 !important;border-radius:3px !important}',
      '[class*="_indicator_"]{background:#F7F5F0 !important;border:0 !important;border-radius:2px !important;box-shadow:none !important}',
      '[class*="_tab_"]:not([class*="_indicator_"]){color:#66625A !important}',
      '[class*="_tab_"][aria-selected="true"]{color:#3A3732 !important;font-weight:600 !important}',
      'body[data-ds-dark-theme] [class*="_tabs_"]{background:#0B0E10 !important}',
      'body[data-ds-dark-theme] [class*="_indicator_"]{background:#181D21 !important}',
      'body[data-ds-dark-theme] [class*="_tab_"]:not([class*="_indicator_"]){color:#A7A399 !important}',
      'body[data-ds-dark-theme] [class*="_tab_"][aria-selected="true"]{color:#E9E5DA !important}',
    ].join('\n');

    var SOURCE = 'dsh-nasapunk-theme';

    return {
      inject: ['theme'],
      apply(ctx) {
        ctx.effect(
          () => ctx.theme.overrideTokens(SOURCE, TOKENS),
          'nasapunk: alias token layer',
        );
        ctx.effect(() => {
          var style = document.createElement('style');
          style.id = SOURCE;
          style.textContent = CSS;
          document.head.appendChild(style);
          return () => { style.remove() };
        }, 'nasapunk: structural styles');
        ctx.effect(() => {
          var stripe = document.createElement('div');
          stripe.id = 'dsh-nasapunk-stripe';
          stripe.setAttribute('aria-hidden', 'true');
          document.documentElement.appendChild(stripe);
          return () => { stripe.remove() };
        }, 'nasapunk: top stripe');
      },
    };
  },
});
