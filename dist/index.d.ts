import { Component } from 'vue';
import { ComponentOptionsMixin } from 'vue';
import { ComponentProvideOptions } from 'vue';
import { DefineComponent } from 'vue';
import { ExtractPropTypes } from 'vue';
import { ExtractPublicPropTypes } from 'vue';
import { Plugin as Plugin_2 } from 'vue';
import { PropType } from 'vue';
import { PublicProps } from 'vue';
import { Ref } from 'vue';
import { RendererElement } from 'vue';
import { RendererNode } from 'vue';
import { VNode } from 'vue';

declare type TeleportComponentData = {
    Comp: VNode | Component;
    instance?: unknown;
    resolveInstance: () => void;
    props?: Record<string, unknown> | Ref<Record<string, unknown>>;
};

export declare const TeleportPlugin: Plugin_2;

export declare const TeleportView: DefineComponent<ExtractPropTypes<    {
name: {
type: PropType<string | symbol>;
default: string;
};
}>, () => VNode<RendererNode, RendererElement, {
[key: string]: any;
}>[], {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<ExtractPropTypes<    {
name: {
type: PropType<string | symbol>;
default: string;
};
}>> & Readonly<{}>, {
name: string | symbol;
}, {}, {}, {}, string, ComponentProvideOptions, true, {}, any>;

export declare function useTeleport<T extends TeleportComponentData['Comp']>(Comp: T, to?: string | symbol): {
    getTeleportInstance: () => (T extends abstract new (...args: any) => any ? InstanceType<T> : T) | undefined;
    mount: (props?: ExtractPublicPropTypes<(T extends abstract new (...args: any) => any ? InstanceType<T> : T)["$props"]> | Ref<ExtractPublicPropTypes<(T extends abstract new (...args: any) => any ? InstanceType<T> : T)["$props"]>, ExtractPublicPropTypes<(T extends abstract new (...args: any) => any ? InstanceType<T> : T)["$props"]>> | undefined) => Promise<(T extends abstract new (...args: any) => any ? InstanceType<T> : T) | undefined>;
    unmount: () => void;
};

export { }
