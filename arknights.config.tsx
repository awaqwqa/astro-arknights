import type {ArknightsConfig} from "./src/_types/ArknightsConfig"
import {CopyrightMini, IconArchive, IconGitHub, TitleArknights} from "./src/components/SvgIcons"
import React from "react";

const base = import.meta.env.BASE_URL

export default {
    title: "Arknights",
    description: "",
    language: "zh",
    bgm: {
        autoplay: false,

        // https://web.hycdn.cn/arknights/official/_next/static/media/audio/bgm.ea4286.mp3
        src: base + "audios/bgm.mp3"
    },
    navbar: {
        logo: {
            element: () => <TitleArknights className="w-full h-auto pointer-events-none"/>,
            alt: "Arknights Logo"
        },
        items: [
            {title: "INDEX", subtitle: "首页", href: base + "#index"},
            {title: "POST", subtitle: "文章", href: base + "#information"},
            {title: "OPERATOR", subtitle: "干员", href: base + "#operator"},
            {title: "INFO", subtitle: "个人信息", href: base + "#world"},
            {title: "MEDIA", subtitle: "泰拉万象", href: base + "#media"},
            {title: "MORE", subtitle: "更多内容", href: base + "#more"},
        ],
        // 友情链接
        toolbox: {
            // Skland: "https://www.skland.com/",
            // Bilibili: "https://space.bilibili.com/28606851",
            // WeChat: "https://weixin.qq.com/",
            // Weibo: "https://weibo.com/",
            // TapTap: "https://www.taptap.cn/",
            // GitHub: "https://github.com/Yue-plus/astro-arknights",
        },
        ownerInfo: {
            name: "Elegy",
            slogan: "生命苦涩如歌",
            footerLinks: [
                {label: "GitHub", url: "https://github.com/awaqwqa"},
                // {label: "Bilibili", url: "https://space.bilibili.com/28606851"},
            ]
        }
    },
    pageTracker: {
        microInfo: "ARKNIGHTS",
        labels: ["HOMEPAGE", "POST", "OPERATOR", "WORLD", "ABOUT TERRA", "MORE"],
    },
    rootPage: {
        INDEX: {
            title: "ELEGY'S Blog",
            subtitle: "Grade 23 binary",
            url: "https://github.com/awaqwqa",
            copyright: <CopyrightMini className="pointer-events-none"/>,
            heroActions: [
                // {
                //     icon: <IconArchive className="w-full h-auto pointer-events-none"/>,
                //     label: "文章",
                //     subLabel: "Documentation",
                //     target: "_self",
                //     href: base + "#information",
                //     className: "text-black bg-ark-blue border-[#2bf] hover:border-white font-bold font-benderBold",
                // },
                // {
                //     // TODO: 换个好看的图标
                //     icon: <svg className="w-full h-auto pointer-events-none" fillRule="evenodd" fill="currentColor"
                //                viewBox="0 0 1024 1024">
                //         <path
                //             d="M856.874667 448l51.285333 30.762667a21.333333 21.333333 0 0 1 0 36.608L512 753.066667l-396.16-237.696a21.333333 21.333333 0 0 1 0-36.608l51.285333-30.762667L512 654.933333l344.874667-206.933333z m0 200.533333l51.285333 30.762667a21.333333 21.333333 0 0 1 0 36.608l-374.186667 224.512a42.666667 42.666667 0 0 1-43.946666 0l-374.186667-224.512a21.333333 21.333333 0 0 1 0-36.608l51.285333-30.762667L512 855.466667l344.874667-206.933334zM533.930667 55.850667l374.229333 224.512a21.333333 21.333333 0 0 1 0 36.608L512 554.666667 115.84 316.970667a21.333333 21.333333 0 0 1 0-36.608l374.186667-224.512a42.666667 42.666667 0 0 1 43.946666 0z"/>
                //     </svg>,
                //     label: "老博客 -Old Blog",
                //     // subLabel: "Blog",
                //     target: "_self",
                //     href: "https://awaqwqa.github.io/",
                //     className: "text-black bg-end-yellow border-[#fe2] hover:border-white font-bold font-benderBold",
                // },
                // {
                //     icon: <IconGitHub className="w-full h-auto pointer-events-none"/>,
                //     label: "GitHub",
                //     subLabel: "Repository",
                //     href: "https://github.com/Yue-plus/astro-arknights",
                //     className: "text-white bg-black border-[#333] hover:border-white font-benderBold",
                // },
            ],
        },
        INFORMATION: {
            swiper: {
                autoplay: {delay: 7000},
                // 这里以后改成自动的
                data: [
                    {
                        title: "年度总结",
                        subtitle: "Annual Summary",
                        date: "2024 // 12 / 30",
                        url: "",
                        href: base + "docs/",
                        image: base + "info-swiper/UserDocumentation.jpg",
                    },
                    {
                        title: "二进制面经",
                        subtitle: "Binary",
                        date: "2024 // 08 / 21",
                        url: "",
                        href: base + "docs/",
                        image: base + "info-swiper/DeveloperDocumentation.jpg",
                    },
                    {
                        title: "博客 - Blog",
                        // subtitle: "Blog",
                        date: "2024 // 08 / 21",
                        url: "",
                        href: base + "blog/",
                        image: base + "info-swiper/Blog.jpg",
                    },
                ],
            },
        },
        WORLD: {
            items: [
                // 年纪 + 学习的内容 + 所在实验室
                {title: "基本信息", subTitle: "BASIC INFO", imageUrl: "/images/03-world/originiums.png", description: '23级三叶草实验室二进制选手,主要学习pwn和安卓逆向,茶歇区ak一把手'},
                // 喜欢玩的游戏
                {title: "游戏", subTitle: "GAME", imageUrl: "/images/03-world/originium_arts.png", description: "明日方舟玩了6年还才90级的屑  卡拉比丘忠实赤石玩家  三角洲萌新玩家  鸣潮云玩家"},
                // 年度总结
                {title: "年度总结", subTitle: "ANNUAL SUMMARY", imageUrl: "/images/03-world/reunion.png", description: "博主很懒还没写....."},
                // 喜欢的动漫
                {title: "动漫", subTitle: "ANIME", imageUrl: "/images/03-world/infected.png", description: "最喜欢看的动漫电影是《你的名字》,最喜欢的动漫是《命运石之门》.博主特别喜欢看动漫(大死宅),从小学开始每天一小时左右看看动漫一直到大学.看过的动漫数量就和吃过的面包片一样记不清楚了(bushi)"},
                // 梦想
                {title: "梦想", subTitle: "DREAM", imageUrl: "/images/03-world/nomadic_city.png", description: "我想要画得更好!!!"},
                // 此博客
                {title: "关于博客", subTitle: "BLOG INFO", imageUrl: "/images/03-world/rhodes_island.png", description: "博客是基于Yue-plus大佬的astro-arknights瞎改出来的"},
            ],
        },
    },
} as ArknightsConfig
