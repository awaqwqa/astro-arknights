import { getCollection } from "astro:content";
export interface PostNode {
  // 节点名字
  NodeName: string;
  // 全路径
  FullPath: string;
  // 子ChildPost
  ChildPost: PostNode[];
  Parent: PostNode | null;
  PostInfo: any;
  Depth : Number;
}

interface Files {
  id: string;
  slug: string;
  body: string;
  collection: string;
  data: any;
}
const rootName = "posts";
// 获取Files
export function BuildTree(items: Files[]): PostNode {
  var PostTree: PostNode = {
    NodeName: rootName,
    FullPath: "",
    ChildPost: [],
    Parent: null,
    PostInfo: null,
    Depth:0,
  };

  items.forEach((item, index) => {
    let { id, slug, body, collection, data } = item;
    const parts = slug.split("/").filter(Boolean);
    let now: PostNode = PostTree;
    parts.forEach((part, index) => {
      const isLast = index === parts.length - 1;
      const formattedPart = part.includes("_")
        ? part.split("_").slice(1).join("_")
        : part;
      // 如果是最后一个直接now上添加
      if (isLast) {
        now.ChildPost.push({
          NodeName: formattedPart,
          FullPath: parts.slice(0, index + 1).join("/"),
          ChildPost: [],
          Parent: now,
          PostInfo: item,
          Depth:index
        });
        return null;
      }
      // 就是无论怎样肯定是要添加node的 只是是否是最后一个
      for (let node of PostTree.ChildPost) {
        if (node.NodeName == formattedPart) {
          // 如果匹配上了则直接下一个
          now = node;
          return null;
        }
      }
      let temp = {
        NodeName: formattedPart,
        FullPath: parts.slice(0, index + 1).join("/"),
        ChildPost: [],
        Parent: now,
        PostInfo: null,
        Depth:index,
      };
      now.ChildPost.push(temp);
      now = temp;
    });
  });
  return PostTree;
}
// 显示
export function ViewTree(node: PostNode): JSX.Element {
  if (node.ChildPost.length >= 1) {
    return (
      <ul>
        <li>{node.NodeName}</li>
        {node.ChildPost.map((child, index) => ViewTree(child))}
      </ul>
    );
  }
  return <h2>{node.NodeName}</h2>;
}
