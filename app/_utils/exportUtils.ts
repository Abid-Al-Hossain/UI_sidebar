import type { SidebarState } from "../types";

export type ExportPayload = { fileName: string; mimeType: "text/plain;charset=utf-8"; content: string };

export function buildExportPayload(state: SidebarState, fileName = "sidebar") : ExportPayload {
  return { fileName: `${fileName || "sidebar"}.jsx`, mimeType: "text/plain;charset=utf-8", content: buildReactCode(state) };
}

export function buildReactCode(state: SidebarState) {
  return [
    "import * as React from \"react\";",
    "",
    "const state = " + JSON.stringify(state, null, 2) + ";",
    "",
    "export default function SidebarComponent() {",
    "  const collapsed = state.collapsed || state.previewState === \"collapsed\";",
    "  const groupCount = Math.max(1, state.nestedGroups);",
    "  const items = Array.from({ length: state.itemCount }, (_, index) => `Item ${index + 1}`);",
    "  const groups = Array.from({ length: groupCount }, (_, index) => ({",
    "    title: `Group ${index + 1}`,",
    "    items: items.filter((_, itemIndex) => itemIndex % groupCount === index),",
    "  }));",
    "  const style = {",
    "    width: collapsed ? state.railWidth : state.width,",
    "    minHeight: state.height,",
    "    padding: collapsed ? Math.max(10, Math.round(state.padding * 0.55)) : state.padding,",
    "    margin: state.margin,",
    "    gap: state.gap,",
    "    borderRadius: state.radius,",
    "    border: `${state.borderWidth}px solid ${state.border}`,",
    "    boxShadow: `0 ${Math.round(state.shadow / 3)}px ${state.shadow}px rgba(0,0,0,.28)`,",
    "    background: state.background,",
    "    color: state.foreground,",
    "    fontFamily: state.fontFamily,",
    "    marginLeft: state.side === \"right\" ? \"auto\" : state.margin,",
    "    transition: state.motion ? \"all 180ms ease\" : undefined,",
    "  };",
    "",
    "  return (",
    "    <aside id={state.id} aria-label={state.landmarkLabel} tabIndex={state.tabIndex} style={style}>",
    "      <div style={{ display: \"flex\", alignItems: \"center\", justifyContent: \"space-between\", gap: state.gap }}>",
    "        <a href=\"#\" style={{ color: state.foreground, fontSize: collapsed ? state.bodySize : state.titleSize, fontWeight: state.fontWeight, textDecoration: \"none\" }}>{collapsed ? state.title.slice(0, 1) : state.title}</a>",
    "        <button type=\"button\" aria-expanded={!collapsed} style={{ border: `1px solid ${state.border}`, borderRadius: 999, padding: \"4px 8px\", color: state.muted, background: \"transparent\" }}>{collapsed ? \"Open\" : \"Collapse\"}</button>",
    "      </div>",
    "      {!collapsed && <p style={{ color: state.muted, fontSize: state.bodySize, marginTop: Math.max(8, state.gap / 2) }}>{state.description}</p>}",
    "      <nav aria-label={`${state.landmarkLabel} groups`} style={{ display: \"grid\", gap: state.gap, marginTop: state.gap }}>",
    "        {groups.map((group, groupIndex) => (",
    "          <section key={group.title} aria-labelledby={`${state.id}-group-${groupIndex}`} style={{ display: \"grid\", gap: Math.max(6, state.gap / 2) }}>",
    "            <button id={`${state.id}-group-${groupIndex}`} type=\"button\" aria-expanded={groupIndex === 0 || state.previewState !== \"overflow\"} style={{ border: 0, borderRadius: 12, padding: \"8px 12px\", textAlign: \"left\", color: state.muted, background: \"rgba(255,255,255,.04)\", textTransform: \"uppercase\", letterSpacing: \".16em\", fontSize: 12, fontWeight: 700 }}>{collapsed ? groupIndex + 1 : group.title}</button>",
    "            {(groupIndex === 0 || state.previewState !== \"overflow\") && group.items.map((item, itemIndex) => {",
    "              const active = groupIndex === 0 && itemIndex === 0;",
    "              return <a key={item} href=\"#\" aria-current={active ? \"page\" : undefined} style={{ borderRadius: 12, padding: \"8px 12px\", color: active || state.previewState === \"hover\" ? state.foreground : state.muted, background: active ? state.accent : state.previewState === \"hover\" && itemIndex === 0 ? \"rgba(255,255,255,.12)\" : \"transparent\", outline: state.previewState === \"focus\" && active ? `2px solid ${state.accent}` : undefined, outlineOffset: 3, textAlign: collapsed ? \"center\" : \"left\", textDecoration: \"none\" }}>{collapsed ? item.replace(\"Item \", \"\") : item}</a>;",
    "            })}",
    "          </section>",
    "        ))}",
    "      </nav>",
    "    </aside>",
    "  );",
    "}",
    "",
  ].join("\n");
}
