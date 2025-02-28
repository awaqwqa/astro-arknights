import React, {useEffect, useState, useRef} from "react";
import {useStore} from "@nanostores/react"
import type {HeroActionButtonProps} from "../../_types/RootPageViews.ts"
import {viewIndex} from "../../components/store/rootLayoutStore.ts"
import {directions} from "../../components/store/lineDecoratorStore"
import arknightsConfig from "../../../arknights.config.tsx";
import PortraitBottomGradientMask from "../../components/PortraitBottomGradientMask";
import {readyToTouch} from "../../components/store/rootLayoutStore.ts"
import Hls from 'hls.js';

function HeroActionButton({icon, label, subLabel, target, href, className}: HeroActionButtonProps) {
    return <a target={target ?? "_blank"} href={href}
              className={`w-[10.5rem] portrait:w-[15.125rem] h-[3rem] portrait:h-[4.5rem] no-underline border-[1px] border-solid rounded pl-4 flex items-center transition-[border-color] duration-300 ${className ?? ""}`.trim()}>
        <div className="w-[1.5rem] portrait:w-[3rem] flex-none mr-3">{icon}</div>
        <div className="whitespace-nowrap leading-[1.4]">
            <div className="text-[.875rem] portrait:text-[1.25rem]">{label}</div>
            <div className="text-[.75rem] portrait:text-[1rem]">{subLabel}</div>
        </div>
    </a>
}

export default function Index() {
    const {title, subtitle, url, copyright} = arknightsConfig.rootPage.INDEX
    const $viewIndex = useStore(viewIndex)
    const $readyToTouch = useStore(readyToTouch)
    const [active, setActive] = useState($viewIndex === 0)
    const [videoLoaded, setVideoLoaded] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [hls, setHls] = useState<Hls | null>(null);

    useEffect(() => {
        if (videoRef.current) {
            if (Hls.isSupported()) {
                const newHls = new Hls();
                newHls.loadSource('/videos/PV04_landscape/PV04_landscape.m3u8');
                newHls.attachMedia(videoRef.current);
                newHls.on(Hls.Events.MANIFEST_PARSED, () => {
                    setVideoLoaded(true);
                    if ($viewIndex === 0 && $readyToTouch) {
                        videoRef.current?.play();
                    }
                });
                setHls(newHls);
            } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
                videoRef.current.src = '/videos/PV04_landscape/PV04_landscape.m3u8';
                videoRef.current.addEventListener('loadedmetadata', () => {
                    setVideoLoaded(true);
                    if ($viewIndex === 0 && $readyToTouch) {
                        videoRef.current?.play();
                    }
                });
            }
        }

        return () => {
            if (hls) {
                hls.destroy();
            }
        };
    }, []);

    useEffect(() => {
        const isActive = $viewIndex === 0 && $readyToTouch
        if (isActive) {
            directions.set({top: false, right: true, bottom: true, left: false})
            videoRef.current?.play();
        } else {
            videoRef.current?.pause();
        }
        setActive(isActive)
    }, [$viewIndex, $readyToTouch])
    // TODO: 使用m3u8
    return <div className={"w-[100vw] max-w-[180rem] h-full absolute top-0 right-0 bottom-0 left-0 z-[2]"
        + " transition-opacity duration-100"}>
        <div className={"w-full h-full absolute top-0 left-0 bg-index bg-center bg-cover bg-no-repeat"
            + " transition-opacity duration-1000"}/>
        <video
            ref={videoRef}
            className={`absolute top-0 left-0 w-full object-cover transition-opacity duration-1000 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
            style={{ 
                height: 'calc(100vh + (100vh * 2.35 / 16 * 9 - 100vh) * 1.2)', // 官网使用的缩放比会更大一些 所以在计算基础上继续增加了1.2倍的缩放
                objectPosition: '50% 0%',
                transform: 'translateY(calc((100vh * 2.35 / 16 * 9 - 100vh) * 1.2 / -2))'
            }}
            loop 
            muted 
            playsInline
        />
        {/* TODO: <canvas> */}
        {/* <div className={"w-[52.5rem] portrait:w-[18.75rem] h-[60.75rem] portrait:h-[12rem] absolute left-0 bottom-0 bg-mask-block portrait:bg-mask-block-m bg-[auto_110%] portrait:bg-[auto_100%] bg-[100%_0] transition-opacity duration-[.6s] ease-linear "
            + (active ? "delay-[2s] opacity-[.78]" : "opacity-0")}/> */}
        {/* <div className={"w-[52.5rem] portrait:w-[5.75rem] h-[60.75rem] portrait:h-[12rem] absolute left-full bottom-0 bg-mask-block portrait:bg-mask-block-m bg-[auto_110%] portrait:bg-[auto_100%] bg-no-repeat translate-x-[-14.75rem] portrait:translate-x-[-3.75rem] transition-opacity duration-[.6s] ease-linear "
            + (active ? "delay-[2.3s] opacity-25" : "opacity-0")}/> */}
        <PortraitBottomGradientMask/>
        <div className={"absolute left-[4.5rem] portrait:left-[2rem] bottom-[2.75rem] portrait:bottom-[3rem]"
            + " transition-transform duration-1000"}/>
        <div className={"absolute left-[4.5rem] portrait:left-[2rem] bottom-[2.75rem] portrait:bottom-[3rem] transition-transform duration-1000 "
            + (active ? "translate-y-0" : "translate-y-[11.5rem]")}>
            <div className={"flex"}>
                <div className={"leading-[.75] text-[5.5rem] portrait:text-[2.375rem] font-n15eUltraBold"
                    + " mr-[2rem] portrait:mr-[1rem]"}>{title ?? ""}</div>
                <div className={"flex flex-col font-n15eMedium"}>
                    <div className={"text-[1.125rem] portrait:text-[.5rem]"}>{subtitle ?? ""}</div>
                    <div className={"text-[.875rem] portrait:text-[.375rem]"}>{url ?? ""}</div>
                    <div className={"w-[6rem] h-px bg-white mt-auto"}/>
                </div>
            </div>
            <div className="w-[7.875rem] portrait:w-[7.25rem] mt-[2.5rem] portrait:mt-[9.375rem]">{copyright}</div>
        </div>
        <div
            className="absolute right-[3rem] portrait:left-[2rem] bottom-[12.75rem] portrait:bottom-[19.5rem] space-y-3 portrait:space-y-5">{
            arknightsConfig?.rootPage?.INDEX?.heroActions.map((props, index) =>
                <HeroActionButton key={index} {...props} />)
        }</div>
        <div className={"w-[10.5rem] portrait:w-[5.75rem] absolute"
            + " portrait:top-[9.25rem] right-[3rem] portrait:right-0 bottom-[5.625rem] portrait:bottom-auto"
            + " flex items-center justify-between portrait:justify-center"}>
            {/* TODO: 扫码下载、适龄提示 */}
        </div>
    </div>
}
