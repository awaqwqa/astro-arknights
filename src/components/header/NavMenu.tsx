import React, {useEffect, useState} from "react"
import {useStore} from "@nanostores/react"
import type {SubNavigationItem} from "../../_types/SubNavigationItem.ts"
import {IconArrow, IconBiliBili, IconGitHub, IconSkland, IconTapTap, IconWechat, IconWeibo} from "../SvgIcons"
import {isNavMenuOpen, viewIndex} from "../store/rootLayoutStore.ts"
import arknightsConfig from "../../../arknights.config.tsx"

export default function NavMenu() {
    const LineClassName: React.ComponentProps<"div">["className"] =
        "w-full h-[2px] bg-white absolute left-1/2 transition duration-300 ease-in-out"
    const $isNavMenuOpen = useStore(isNavMenuOpen)
    return <div className="w-[5.75rem] h-full landscape:hidden portrait:flex"
                onClick={() => isNavMenuOpen.set(!$isNavMenuOpen)}>
        <div className="w-[2.625rem] h-[2.375rem] m-auto relative">
            <div className={LineClassName} style={{
                top: $isNavMenuOpen ? "1.1875rem" : "1px",
                transform: `translate(-50%, -50%) ${$isNavMenuOpen ? "rotate(45deg) scaleX(1.2)" : ""}`,
            }}></div>
            <div className={`${LineClassName} top-1/2 -translate-x-1/2 -translate-y-1/2`} style={{
                opacity: $isNavMenuOpen ? 0 : 1,
                transform: `translateX(${$isNavMenuOpen ? "-100%" : "-50%"}) translateY(-50%)`,
            }}></div>
            <div className={`${LineClassName} bottom-px -translate-x-1/2 translate-y-1/2`} style={{
                bottom: $isNavMenuOpen ? "1.1875rem" : "1px",
                transform: `translate(-50%, 50%) ${$isNavMenuOpen ? "rotate(-45deg) scaleX(1.2)" : ""}`,
            }}></div>
        </div>
    </div>
}

function Navigation({showSubNavigation}: { showSubNavigation: boolean }) {
    const $viewIndex = useStore(viewIndex)
    const $isNavMenuOpen = useStore(isNavMenuOpen)
    const [showItems, setShowItems] = useState(false)

    useEffect(() => {
        setShowItems($isNavMenuOpen && !showSubNavigation)
    }, [$isNavMenuOpen, showSubNavigation])

    let delay = -70
    return <div className="pt-[1.25rem] pr-[2.25rem] pb-0 pl-[3.375rem]">{
        // TODO: 此处可以服务端渲染
        arknightsConfig.navbar.items.map((item, index) => {
            delay += 70
            return <a key={index} target="_self" href={item.href}
                      onClick={_ => isNavMenuOpen.set(!$isNavMenuOpen)}
                      className={"h-[7.5rem] flex items-center justify-between transition ease-in-out duration-200"}
                      aria-label={item.title + " - " + item.subtitle}
                      style={{
                          color: $viewIndex === index ? "#19d1ff" : "inherit",
                          borderBottom: "1px solid hsla(0, 0%, 100%, .3)",
                          transitionDelay: delay + "ms",
                          opacity: showItems ? 1 : 0,
                          transform: `translateX(${showItems ? "0" : "20%"})`,
                      }}>
                <div className={`transition duration-300 text-4xl font-oswaldMedium`}>
                    {item.title}
                </div>
                <div className="h-full text-[1.75rem] relative flex items-center transition duration-300">
                    {item.subtitle}
                    <div className="w-full h-[.375rem] absolute right-0 bottom-[-.1875rem] bg-[currentColor]"/>
                </div>
            </a>
        })
    }</div>
}

function SubNavigation({items, setShowSubNavigation}: {
    items: SubNavigationItem[]
    setShowSubNavigation: React.Dispatch<React.SetStateAction<boolean>>
}) {
    return <div className="text-4xl font-benderBold overflow-y-auto">
        <button className="w-full h-[4.5rem] text-left bg-[#5a5a5a] bg-opacity-80 block pl-[3.375rem]"
                onClick={() => setShowSubNavigation(false)}>
            <IconArrow className="h-[2.25rem] rotate-180 inline-block pl-9"/>
            回到主菜单
        </button>
        <ul className="pt-[1.25rem] pr-[2.25rem] pb-0 pl-[3.375rem]">
            {
                items.map(({title, href}, index) => <li key={index} className="h-[4.5rem]">
                    <a target="_self" {...{href}}>{title}</a>
                </li>)
            }
        </ul>
    </div>
}

function ToolBox() {
    const {Skland, Bilibili, WeChat, Weibo, TapTap, GitHub} = arknightsConfig.navbar.toolbox
    const aClassName: string = "text-inherit flex-none cursor-pointer"
    const iconClassName: string = "h-auto m-auto pointer-events-none"

    return <div className={"mt-auto pr-9 pb-[4.5rem] pl-[3.375rem]"}>
        <div className={"text-[1.5rem] font-benderBold flex items-center"}>
            <div className={"w-full min-w-0 h-px mr-4 bg-white bg-opacity-30 flex-auto"}/>
            TOOLBOX
        </div>
        <div className={"mt-4 flex items-center justify-between"}>
            {
                GitHub && <a target="_blank" href={GitHub} className={aClassName} aria-label="GitHub">
                    <IconGitHub className={"w-[3rem] " + iconClassName}/>
                </a>
            }
            {
                Skland && <a target="_blank" href={Skland} className={aClassName} aria-label="Skland - 森空岛">
                    <IconSkland className={"w-[4.5rem] " + iconClassName}/>
                </a>
            }
            {
                Bilibili && <a target="_blank" href={Bilibili} className={aClassName} aria-label="Bilibili - 哔哩哔哩">
                    <IconBiliBili className={"w-[4.5rem] " + iconClassName}/>
                </a>
            }
            {
                WeChat && <a target="_blank" href={WeChat} className={aClassName} aria-label="WeChat - 微信">
                    <IconWechat className={"w-[3rem] " + iconClassName}/>
                </a>
            }
            {
                Weibo && <a target="_blank" href={Weibo} className={aClassName} aria-label="Weibo - 微博">
                    <IconWeibo className={"w-[3rem] " + iconClassName}/>
                </a>
            }
            {
                TapTap && <a target="_blank" href={TapTap} className={aClassName} aria-label="TapTap">
                    <IconTapTap className={"w-[4.5rem] " + iconClassName}/>
                </a>
            }
        </div>
    </div>
}

export function Menu({subNavigationItems}: { subNavigationItems?: SubNavigationItem[] }) {
    const $isNavMenuOpen = useStore(isNavMenuOpen)
    const [showSubNavigation, setShowSubNavigation] = useState(false)

    useEffect(() => {
        subNavigationItems && subNavigationItems.length > 0 && $isNavMenuOpen && setShowSubNavigation(true)
    }, [$isNavMenuOpen]);

    return <div className={"w-full h-full absolute top-0 left-0 z-[22] overflow-hidden bg-black bg-opacity-90"
        + " transition-[opacity,visibility] ease-in-out duration-[600ms]"}
                style={{opacity: $isNavMenuOpen ? 1 : 0, visibility: $isNavMenuOpen ? "visible" : "hidden"}}>
        <div className="w-full h-px absolute left-0 top-[9.375rem] bg-[#4f4f4f]"/>
        <div className="w-full h-full pt-[9.375rem] pr-[5.75rem] flex flex-col">
            {
                showSubNavigation && subNavigationItems && subNavigationItems.length > 0
                    ? <SubNavigation items={subNavigationItems} {...{setShowSubNavigation}}/>
                    : <Navigation {...{showSubNavigation}}/>
            }
            <ToolBox/>
        </div>
        <div className="w-px h-full absolute top-0 right-[5.75rem] bg-[#4f4f4f]"/>
    </div>
}
