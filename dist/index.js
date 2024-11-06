import { defineComponent as f, inject as l, computed as g, h as T, unref as w, markRaw as u, reactive as v, onScopeDispose as y } from "vue";
const c = Symbol("Teleport"), S = f({
  name: "TeleportView",
  inheritAttrs: !1,
  props: {
    name: {
      type: [String, Symbol],
      default: "default"
    }
  },
  compatConfig: { MODE: 3 },
  setup({ name: s }) {
    const o = l(c), t = g(() => {
      var e;
      return [...((e = o == null ? void 0 : o.get(s)) == null ? void 0 : e.values()) ?? []];
    });
    return () => t.value.map((e) => T(e.Comp, {
      ...w(e.props),
      ref: (r) => e.instance = r && u(r),
      onVnodeMounted: () => {
        e.resolveInstance();
      }
    }));
  }
}), h = {
  install(s) {
    s.provide(c, v(/* @__PURE__ */ new Map()));
  }
};
function I(s, o = "default") {
  const t = l(c);
  if (!t)
    throw new Error("没有找到teleportViewsMap，请注册插件TeleportPlugin");
  const e = {
    Comp: u(s),
    resolveInstance: () => {
    }
  }, r = () => {
    var p;
    (p = t == null ? void 0 : t.get(o)) == null || p.delete(e);
  }, a = () => e.instance, i = async (p) => {
    let n = t.get(o);
    if (e.props = p, n != null && n.has(e))
      return a();
    const m = new Promise((d) => {
      e.resolveInstance = () => {
        d(a());
      };
    });
    return n ? n.add(e) : (n = /* @__PURE__ */ new Set(), n.add(e), t.set(o, n)), m;
  };
  return y(r), {
    getTeleportInstance: a,
    mount: i,
    unmount: r
  };
}
export {
  h as TeleportPlugin,
  S as TeleportView,
  I as useTeleport
};
