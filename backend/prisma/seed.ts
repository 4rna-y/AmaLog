import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  await prisma.blog.deleteMany({});

  await prisma.blog.create({
    data: {
      id: 'test-0',
      category: 'Tutorial',
      tag: ['Markdown', 'Test', 'Documentation'],
      coverImgId: 'test-0.png',
      status: 'PUBLISHED',
      title: 'Markdown機能テスト - 全機能一覧',
      content: [
        'md(# Markdownの見出し\n\nこの記事では、Markdownの全機能をテストします。)',

        'md(## 見出しレベル2\n### 見出しレベル3\n#### 見出しレベル4\n##### 見出しレベル5\n###### 見出しレベル6)',

        'md(---)',

        'md(## テキスト装飾\n\n**太字のテキスト**\n\n*斜体のテキスト*\n\n***太字かつ斜体***\n\n~~取り消し線~~\n\n`インラインコード`)',

        'md(---)',

        'md(## リスト\n\n### 順序なしリスト\n\n- アイテム1\n- アイテム2\n  - ネストされたアイテム2-1\n  - ネストされたアイテム2-2\n- アイテム3\n\n### 順序付きリスト\n\n1. 最初のアイテム\n2. 2番目のアイテム\n3. 3番目のアイテム\n   1. ネストされたアイテム3-1\n   2. ネストされたアイテム3-2)',

        'md(---)',

        'md(## チェックボックス\n\n- [x] 完了したタスク\n- [ ] 未完了のタスク\n- [ ] 別の未完了タスク)',

        'md(---)',

        'md(## リンク\n\n[通常のリンク](https://example.com)\n\n[タイトル付きリンク](https://example.com "リンクのタイトル")\n\nURL: https://example.com)',

        'md(---)',

        'md(## 引用\n\n> これは引用ブロックです。\n> 複数行にわたって書くこともできます。\n>\n> > ネストされた引用もサポートしています。)',

        'md(---)',

        'md(## コードブロック\n\n### JavaScriptのコード\n\n```javascript\nfunction greet(name) {\n  console.log(`Hello, ${name}!`);\n  return name.toUpperCase();\n}\n\ngreet("World");\n```\n\n### TypeScriptのコード\n\n```typescript\ninterface User {\n  id: number;\n  name: string;\n  email: string;\n}\n\nconst user: User = {\n  id: 1,\n  name: "John Doe",\n  email: "john@example.com"\n};\n```\n\n### Pythonのコード\n\n```python\ndef fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n-1) + fibonacci(n-2)\n\nprint(fibonacci(10))\n```)',

        'md(---)',

        'md(## テーブル\n\n| 項目 | 説明 | 価格 |\n|------|------|------:|\n| リンゴ | 赤くて美味しい果物 | ¥100 |\n| バナナ | 黄色い果物 | ¥80 |\n| オレンジ | オレンジ色の柑橘類 | ¥120 |\n\n### 配置を変えたテーブル\n\n| 左寄せ | 中央寄せ | 右寄せ |\n|:-------|:-------:|-------:|\n| Left | Center | Right |\n| A | B | C |)',

        'md(---)',

        'img(test-0.png,サンプル画像のキャプション)',

        'md(---)',

        'md(## まとめ\n\nこれでMarkdownの主要な機能をすべて確認できました。\n\n- 見出し\n- テキスト装飾\n- リスト\n- チェックボックス\n- リンク\n- 引用\n- コードブロック\n- テーブル\n- 画像\n\nすべて正しく表示されていれば成功です！)'
      ],
      likes: 999,
      views: 9999
    }
  });

  for (let i = 1; i < 10; i++) {
    await prisma.blog.create({
      data: {
        id: `test-${i}`,
        category: 'Test',
        tag: ['Test', 'Sample', 'Dev'],
        coverImgId:  `test-${i}.png`,
        status: 'PUBLISHED',
        title:  `Test Article ${i}`,
        content: [
          `md(# Test article ${i})`,
          'md(This is test sample article)',
          'md(## Section 1\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit.)',
          'md(## Section 2\n\n**Bold text** and *italic text* example.)',
        ],
        likes: Math.trunc(Math.random() * 1000),
        views: Math.trunc(Math.random() * 1000)
      }
    });
  }

  console.log("created");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
