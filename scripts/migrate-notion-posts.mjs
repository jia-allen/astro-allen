import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import { visit } from 'unist-util-visit';

const projectRoot = process.cwd();
const exportRoot = path.join(projectRoot, 'notion-blog-export/allen(爱伦)知行录');

const posts = [
  {
    source: 'Hermes Agent ：真正能动手的长期 AI 助手 3c0c0c7fbcef807b9d7ae580bccf01d8.md',
    target: 'src/content/blog/technology/hermes-agent.md',
    title: 'Hermes Agent：真正能动手的长期 AI 助手',
    link: 'agent-hermes',
    date: '2026-07-12 00:00:00',
    description:
      'Hermes Agent 更像一个可以长期协作的数字同事：它不只生成文字，还能读取文件、修改代码、执行命令、查询网页、管理 GitHub，并在完成任务后运行测试验证结果。我更愿意把它理解成：大模型负责思考，Hermes 负责记忆、工具调用和实际执行。',
    category: '技术分享',
    tags: ['Agent', '推荐', '未来', '职业规划'],
    sticky: true,
  },
  {
    source: 'Agent = LLM + 上下文 + 工具 3bbc0c7fbcef80ac8159e05f40ae48e1.md',
    target: 'src/content/blog/technology/agent-llm-context-tools.md',
    title: 'Agent = LLM + 上下文 + 工具',
    link: 'agent-llm-context-tools',
    date: '2026-04-26 00:00:00',
    description: '现代 Agent 的最小工程实现可以用一个简洁的公式来表达：Agent = LLM（大语言模型）+ 上下文 + 工具。',
    category: '技术分享',
    tags: ['Agent', '推荐', '未来', '职业规划'],
  },
  {
    source: '宏大叙事与具体的人 3c0c0c7fbcef801bbd2ffcc19ba62a62.md',
    target: 'src/content/blog/reflections/grand-narratives-and-real-people.md',
    title: '宏大叙事与具体的人',
    link: 'grand-narratives-and-real-people',
    date: '2026-03-22 00:00:00',
    description: '宏大叙事能让说话的人显得不再自私，让受苦的人暂时忘记自己正在被使用，也让获利的人不必把账单写得太明白。',
    category: '知行合一',
    tags: ['思考', '推荐', '未来', '随笔'],
  },
  {
    source: '从微观的角度思考，才会看到具象化可执行的指标 3c0c0c7fbcef80999d96d049c5eadae8.md',
    target: 'src/content/blog/reflections/think-from-micro-perspective.md',
    title: '从微观的角度思考，才会看到具象化可执行的指标',
    link: 'think-from-micro-perspective',
    date: '2026-02-16 00:00:00',
    description:
      '大佬谈宏观是因为拥有稳定基本盘，我们普通人不要沉迷趋势空谈，优先建立微观视角，把目标拆解成可落地的小事，生存技能才是一切分析的底座。',
    category: '知行合一',
    tags: ['思考', '推荐', '未来', '随笔'],
  },
  {
    source: '注册公司要避开的5个大坑：创业避雷指南 8d3c0c7fbcef836e8e888115c420380d.md',
    target: 'src/content/blog/life/company-registration-pitfalls.md',
    title: '注册公司要避开的5个大坑：创业避雷指南',
    link: 'company-registration-pitfalls',
    date: '2026-01-12 00:00:00',
    description:
      '注册公司避坑指南，说明何时才需要注册公司、是否担任法人、如何处理手机号和注册地址、为什么慎用免费地址，以及不要为了虚名认证增加经营负担。',
    category: '生活经验',
    tags: ['创业', '推荐', '未来', '生活'],
  },
  {
    source: '生活用品选购指南 82cc0c7fbcef82e9991c816a13d23d38.md',
    target: 'src/content/blog/life/daily-necessities-buying-guide.md',
    title: '生活用品选购指南',
    link: 'daily-necessities-buying-guide',
    date: '2025-09-23 00:00:00',
    description:
      '生活日用品选购笔记，重点整理牙膏、洗面奶、护肤品等洗漱护理产品的成分判断、适用人群、常见误区和参考视频，帮助按需求选择而不是只看价格与宣传。',
    category: '生活经验',
    tags: ['指南', '生活'],
    imageDir: 'life-essentials',
    imageExtensions: ['webp', 'webp', 'webp', 'jpg', 'jpg', 'jpg'],
    imageAlt: '生活用品选购示意图',
    replacements: [
      ['建议选0.14%以上', '建议选 0.14% 以上'],
      ['1~2个小时', '1-2 个小时'],
    ],
  },
  {
    source: '实用生活指南：必备经验与高效技巧分享 3bac0c7fbcef80bf97dfe07b7ec61476.md',
    target: 'src/content/blog/life/practical-life-guide.md',
    title: '实用生活指南：必备经验与高效技巧分享',
    link: 'practical-life-guide',
    date: '2025-08-11 00:00:00',
    description:
      '一份生活百科式经验清单，围绕食材选购与保存、家务清洁、驱蚊除味、租房维权、保险理赔话术、低门槛副业和日常省钱方法展开。',
    category: '生活经验',
    tags: ['指南', '生活'],
  },
  {
    source: '超短线核心交易体系 - 终极版 77cc0c7fbcef8231ac9d015af1e65fcc.md',
    target: 'src/content/blog/finance/short-term-trading-system.md',
    title: '超短线核心交易体系 - 终极版',
    link: 'short-term-trading-system',
    date: '2025-10-23 00:00:00',
    description: '围绕“要信早信、聚焦核心”整理超短线交易中的核心股识别、主升与低吸买点、仓位管理、卖出信号和风险纪律。',
    category: '股市心法',
    tags: ['交易', '投资'],
    imageDir: 'short-term-trading-system',
    imageExtensions: Array(11).fill('png'),
    imageAlt: '交易体系图表',
  },
];

function extractBody(raw) {
  const lines = raw.replaceAll('\r\n', '\n').split('\n');
  const lastMetadataLine = lines.reduce((last, line, index) => (/^(?:CAN_COPY|category):/.test(line) ? index : last), -1);
  if (lastMetadataLine < 0) throw new Error('Could not locate the Notion metadata block');
  const firstBodyLine = lines.findIndex((line, index) => index > lastMetadataLine && line.trim() !== '');
  if (firstBodyLine < 0) throw new Error('Could not locate the article body');
  return lines.slice(firstBodyLine).join('\n').trim();
}

function nodeText(node) {
  let value = '';
  visit(node, 'text', (child) => {
    value += child.value;
  });
  return value.trim();
}

function normalizeImageKey(url) {
  return url.startsWith('https://cdn.jsdelivr.net/') ? url.split('?')[0] : url;
}

function buildFrontmatter(post) {
  const keywords = [...new Set([...post.tags, post.category])];
  const lines = [
    '---',
    `title: ${JSON.stringify(post.title)}`,
    `link: ${post.link}`,
    'catalog: true',
    `date: ${post.date}`,
    `description: ${JSON.stringify(post.description)}`,
    'tags:',
    ...post.tags.map((tag) => `  - ${tag}`),
    'categories:',
    `  - ${post.category}`,
  ];
  if (post.sticky) lines.push('sticky: true');
  lines.push('keywords:', ...keywords.map((keyword) => `  - ${keyword}`), '---');
  return lines.join('\n');
}

for (const post of posts) {
  const sourcePath = path.join(exportRoot, post.source);
  const targetPath = path.join(projectRoot, post.target);
  const processor = remark().use(remarkGfm);
  let body = extractBody(fs.readFileSync(sourcePath, 'utf8'));
  for (const [source, replacement] of post.replacements ?? []) body = body.replaceAll(source, replacement);
  const tree = processor.parse(body);

  const firstNode = tree.children[0];
  if (firstNode?.type === 'heading' && nodeText(firstNode) === post.title) tree.children.shift();

  visit(tree, 'heading', (node) => {
    node.depth = Math.min(6, node.depth + 1);
  });

  if (post.imageDir) {
    const imageIndexes = new Map();
    visit(tree, 'image', (node) => {
      if (!node.url.startsWith('http')) return;
      const key = normalizeImageKey(node.url);
      if (!imageIndexes.has(key)) imageIndexes.set(key, imageIndexes.size + 1);
      const index = imageIndexes.get(key);
      const extension = post.imageExtensions[index - 1];
      if (!extension) throw new Error(`Missing image extension for ${post.title} image ${index}`);
      node.url = `/img/posts/${post.imageDir}/${String(index).padStart(2, '0')}.${extension}`;
      node.alt = `${post.imageAlt} ${index}`;
    });
    if (imageIndexes.size !== post.imageExtensions.length) {
      throw new Error(`${post.title}: expected ${post.imageExtensions.length} images, found ${imageIndexes.size}`);
    }
  }

  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  const output = processor.stringify(tree).trim();
  fs.writeFileSync(targetPath, `${buildFrontmatter(post)}\n\n${output}\n`, 'utf8');
}

execFileSync(path.join(projectRoot, 'node_modules/.bin/lint-md'), [...posts.map((post) => post.target), '--fix'], {
  cwd: projectRoot,
  stdio: 'inherit',
});

const oldHermesPath = path.join(projectRoot, 'src/content/blog/weekly/hermes-agent.md');
if (fs.existsSync(oldHermesPath)) fs.unlinkSync(oldHermesPath);

console.log(`Migrated ${posts.length} published Notion posts.`);
