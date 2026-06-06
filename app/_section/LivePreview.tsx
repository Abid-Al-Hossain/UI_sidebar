"use client";

import type { CSSProperties } from "react";
import type { SidebarState } from "../types";

function box(state: SidebarState): CSSProperties {
  const collapsed = state.collapsed || state.previewState === "collapsed";
  return {
    width: collapsed ? state.railWidth : state.width,
    minHeight: state.height,
    padding: collapsed ? Math.max(10, Math.round(state.padding * 0.55)) : state.padding,
    margin: state.margin,
    gap: state.gap,
    borderRadius: state.radius,
    border: `${state.borderWidth}px solid ${state.border}`,
    boxShadow: `0 ${Math.round(state.shadow / 3)}px ${state.shadow}px rgba(0,0,0,.28)`,
    background: state.background,
    color: state.foreground,
    fontFamily: state.fontFamily,
    marginLeft: state.side === "right" ? "auto" : state.margin,
    transition: state.motion ? "all 180ms ease" : undefined,
  };
}

export default function LivePreview({ state }: { state: SidebarState }) {
  const collapsed = state.collapsed || state.previewState === "collapsed";
  const groupCount = Math.max(1, state.nestedGroups);
  const items = Array.from({ length: state.itemCount }, (_, index) => `Item ${index + 1}`);
  const groups = Array.from({ length: groupCount }, (_, index) => ({
    title: `Group ${index + 1}`,
    items: items.filter((_, itemIndex) => itemIndex % groupCount === index),
  }));
  const style = box(state);

  return (
    <aside id={state.id} aria-label={state.landmarkLabel} tabIndex={state.tabIndex} style={style}>
      <div className="flex items-center justify-between" style={{ gap: state.gap }}>
        <a href="#" className="font-semibold" style={{ color: state.foreground, fontSize: collapsed ? state.bodySize : state.titleSize, fontWeight: state.fontWeight }}>
          {collapsed ? state.title.slice(0, 1) : state.title}
        </a>
        <button type="button" aria-expanded={!collapsed} className="rounded-full border px-2 py-1 text-xs" style={{ borderColor: state.border, color: state.muted }}>
          {collapsed ? "Open" : "Collapse"}
        </button>
      </div>
      {!collapsed && <p style={{ color: state.muted, fontSize: state.bodySize, marginTop: Math.max(8, state.gap / 2) }}>{state.description}</p>}
      <nav aria-label={`${state.landmarkLabel} groups`} className="grid" style={{ gap: state.gap, marginTop: state.gap }}>
        {groups.map((group, groupIndex) => (
          <section key={group.title} aria-labelledby={`${state.id}-group-${groupIndex}`} className="grid" style={{ gap: Math.max(6, state.gap / 2) }}>
            <button
              id={`${state.id}-group-${groupIndex}`}
              type="button"
              aria-expanded={groupIndex === 0 || state.previewState !== "overflow"}
              className="rounded-xl px-3 py-2 text-left text-xs font-semibold uppercase tracking-[0.16em]"
              style={{ color: state.muted, background: "rgba(255,255,255,.04)" }}
            >
              {collapsed ? groupIndex + 1 : group.title}
            </button>
            {(groupIndex === 0 || state.previewState !== "overflow") && group.items.map((item, itemIndex) => {
              const active = groupIndex === 0 && itemIndex === 0;
              return (
                <a
                  key={item}
                  href="#"
                  aria-current={active ? "page" : undefined}
                  className="rounded-xl px-3 py-2 text-sm font-medium"
                  style={{
                    color: active || state.previewState === "hover" ? state.foreground : state.muted,
                    background: active ? state.accent : state.previewState === "hover" && itemIndex === 0 ? "rgba(255,255,255,.12)" : "transparent",
                    outline: state.previewState === "focus" && active ? `2px solid ${state.accent}` : undefined,
                    outlineOffset: 3,
                    textAlign: collapsed ? "center" : "left",
                  }}
                >
                  {collapsed ? item.replace("Item ", "") : item}
                </a>
              );
            })}
          </section>
        ))}
      </nav>
    </aside>
  );
}
