"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import ColorControl from "@/components/shared/color/ColorControl";
import type { SidebarState } from "../types";

type Props = { state: SidebarState; update: <K extends keyof SidebarState>(key: K, value: SidebarState[K]) => void };

export default function ColorsSection({ state, update }: Props) {
  return (
    <div className="space-y-4">
      <SectionCard title="Colors" subtitle="Colors controls for native layout/page-structure generation.">
        <ColorControl label="Accent" value={state.accent} onChange={(value) => update("accent", value)} />
        <ColorControl label="Background" value={state.background} onChange={(value) => update("background", value)} />
        <ColorControl label="Foreground" value={state.foreground} onChange={(value) => update("foreground", value)} />
        <ColorControl label="Muted text" value={state.muted} onChange={(value) => update("muted", value)} />
      </SectionCard>
      <SectionCard title="Nav Item States" subtitle="Active and hover colors for sidebar items.">
        <ColorControl label="Active background" value={state.activeItemBg} onChange={(value) => update("activeItemBg", value)} />
        <ColorControl label="Active text" value={state.activeItemText} onChange={(value) => update("activeItemText", value)} />
        <ColorControl label="Active border" value={state.activeItemBorder} onChange={(value) => update("activeItemBorder", value)} />
        <ColorControl label="Hover background" value={state.hoverItemBg} onChange={(value) => update("hoverItemBg", value)} />
        <ColorControl label="Hover text" value={state.hoverItemText} onChange={(value) => update("hoverItemText", value)} />
      </SectionCard>
      <SectionCard title="Structure" subtitle="Collapse icon, group headers, and dividers.">
        <ColorControl label="Collapse icon" value={state.collapseIconColor} onChange={(value) => update("collapseIconColor", value)} />
        <ColorControl label="Group header text" value={state.groupHeaderColor} onChange={(value) => update("groupHeaderColor", value)} />
        <ColorControl label="Group divider" value={state.groupDividerColor} onChange={(value) => update("groupDividerColor", value)} />
      </SectionCard>
      <SectionCard title="Badge & Scrollbar" subtitle="Notification count badge and custom scrollbar.">
        <ColorControl label="Badge background" value={state.badgeCountBg} onChange={(value) => update("badgeCountBg", value)} />
        <ColorControl label="Badge text" value={state.badgeCountText} onChange={(value) => update("badgeCountText", value)} />
        <ColorControl label="Scrollbar track" value={state.scrollbarBg} onChange={(value) => update("scrollbarBg", value)} />
        <ColorControl label="Scrollbar thumb" value={state.scrollbarThumb} onChange={(value) => update("scrollbarThumb", value)} />
      </SectionCard>
    </div>
  );
}
