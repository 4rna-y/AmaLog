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
      content: `# Markdownの見出し

この記事では、Markdownの全機能をテストします。

## 見出しレベル2
### 見出しレベル3
#### 見出しレベル4
##### 見出しレベル5
###### 見出しレベル6

---

## テキスト装飾

**太字のテキスト**

*斜体のテキスト*

***太字かつ斜体***

~~取り消し線~~

\`インラインコード\`

---

## リスト

### 順序なしリスト

- アイテム1
- アイテム2
  - ネストされたアイテム2-1
  - ネストされたアイテム2-2
- アイテム3

### 順序付きリスト

1. 最初のアイテム
2. 2番目のアイテム
3. 3番目のアイテム
   1. ネストされたアイテム3-1
   2. ネストされたアイテム3-2

---

## チェックボックス

- [x] 完了したタスク
- [ ] 未完了のタスク
- [ ] 別の未完了タスク

---

## リンク

[通常のリンク](https://example.com)

[タイトル付きリンク](https://example.com "リンクのタイトル")

URL: https://example.com

---

## 引用

> これは引用ブロックです。
> 複数行にわたって書くこともできます。
>
> > ネストされた引用もサポートしています。

---

## コードブロック

### JavaScriptのコード

\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
  return name.toUpperCase();
}

greet("World");
\`\`\`

### TypeScriptのコード

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
}

const user: User = {
  id: 1,
  name: "John Doe",
  email: "john@example.com"
};
\`\`\`

### Pythonのコード

\`\`\`python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))
\`\`\`

---

## テーブル

| 項目 | 説明 | 価格 |
|------|------|------:|
| リンゴ | 赤くて美味しい果物 | ¥100 |
| バナナ | 黄色い果物 | ¥80 |
| オレンジ | オレンジ色の柑橘類 | ¥120 |

### 配置を変えたテーブル

| 左寄せ | 中央寄せ | 右寄せ |
|:-------|:-------:|-------:|
| Left | Center | Right |
| A | B | C |

---

![サンプル画像のキャプション](test-0.png)

---

## まとめ

これでMarkdownの主要な機能をすべて確認できました。

- 見出し
- テキスト装飾
- リスト
- チェックボックス
- リンク
- 引用
- コードブロック
- テーブル
- 画像

すべて正しく表示されていれば成功です！`,
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
        content: `# Test article ${i}

This is test sample article

## Section 1

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

## Section 2

**Bold text** and *italic text* example.`,
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
